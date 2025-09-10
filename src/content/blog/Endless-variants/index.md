---
title: "Generating a million model variations with Three.js"
description: ""
date: "Aug 28 2025"
---

## Generating a million model variations with Three.js

**the problem**


  <iframe 
      src="http://localhost:5173/embed/fish-showcase" 
      width="100%" 
      height="500" 
      frameborder="0"
      title="Fish Game Showcase"
      allowTransparency="true"
  ></iframe>

**the steps**
- 3d model, glb/gltf format
- base white model
  - If we want to apply separate colors/textures to a specific part of our model, we select those model faces and assign them a different material
    - For example - my fish model has separate eye material, fin material, upper & lower body materials which allow me to control the color/texture of each piece separately.
- create a black & white pattern/texture map
  - This map will overlay or wrap your model
  - We will apply a shader to the model which will allow us to apply color to the whites of our texture map, while hiding or applying a separate color to the blacks
  - We can apply a base color to the model material itself, then another color to the wrapping texture - if we want a blue fish with orange polkadots we could apply a blue color to the model, and then apply an orange filter to the whites of our texture map
    - Because we assigned different materials to our model when we were creating it, we can apply shaders to each different material belonging to our mesh (model) with Three.js
    - 


Loading a model with Three.js
```typescript
    const { scene, nodes } = useGLTF(`/models/fish/${fish.physicalAttributes.model}.glb`);
```

Creating the patterned material for the upper body of my fish example
```typescript
    const fishUpperBodyMaterial = await createTextureMaterial(fish);
```

We will need to load our texture image files 

```typescript
export async function createBodyMaterial(
  baseColorHex: string, patternColorHex: string
) {

  const [textureImage, 
  // maskTexture - I dont think this is actually needed
  ] = await Promise.all([
    loadTexture(`/textures/patterns/polkadot-pattern.png`),
    // loadTexture('/textures/mask.png')
  ]);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      primaryColor: { value: new THREE.Color(baseColorHex) },
      patternColor: { value: new THREE.Color(patternCOlorHex) },
      patternTexture: { value: textureImage },
      // maskTexture: { value: maskTexture },
    } as {baseColorHex: string, patternColorHex: string, textureImage: THREE.Texture},
    vertexShader: `
      #include <common>
      #include <skinning_pars_vertex>
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        
        #include <skinbase_vertex>
        #include <begin_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
        
        vPosition = transformed;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 primaryColor;
      uniform vec3 patternColor;
      uniform sampler2D patternTexture;
      uniform sampler2D maskTexture; // maybe I do need this idk

      varying vec2 vUv;
      varying vec3 vPosition;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
      }
      
      // Function to convert RGB to HSL
      vec3 rgb2hsl(vec3 color) {
        float maxColor = max(max(color.r, color.g), color.b);
        float minColor = min(min(color.r, color.g), color.b);
        float delta = maxColor - minColor;
        
        float h = 0.0;
        float s = 0.0;
        float l = (maxColor + minColor) / 2.0;
        
        if (delta > 0.0) {
          s = l < 0.5 ? delta / (maxColor + minColor) : delta / (2.0 - maxColor - minColor);
          
          if (color.r == maxColor) {
            h = (color.g - color.b) / delta + (color.g < color.b ? 6.0 : 0.0);
          } else if (color.g == maxColor) {
            h = (color.b - color.r) / delta + 2.0;
          } else {
            h = (color.r - color.g) / delta + 4.0;
          }
          h /= 6.0;
        }
        
        return vec3(h, s, l);
      }
      
      // Function to convert HSL to RGB
      float hue2rgb(float p, float q, float t) {
        if (t < 0.0) t += 1.0;
        if (t > 1.0) t -= 1.0;
        if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
        if (t < 1.0/2.0) return q;
        if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
        return p;
      }
      
      vec3 hsl2rgb(vec3 hsl) {
        float h = hsl.x;
        float s = hsl.y;
        float l = hsl.z;
        
        if (s == 0.0) {
          return vec3(l, l, l);
        }
        
        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
        float p = 2.0 * l - q;
        
        return vec3(
          hue2rgb(p, q, h + 1.0/3.0),
          hue2rgb(p, q, h),
          hue2rgb(p, q, h - 1.0/3.0)
        );
      }
      
      void main() {
        // Sample the pattern texture
        vec4 pattern = texture2D(patternTexture, modifiedUV);
        
        // Apply the mask for the fish shape
        vec4 mask = texture2D(maskTexture, vUv);
  
        // Mix the base color and pattern color based on the pattern value
        vec3 finalColor = mix(primaryColor, patternColor, patternValue * mask.r);
        
        gl_FragColor = vec4(finalColor, 1); // vec3, opacity
      }
    `,
    side: THREE.DoubleSide,
  });

  return material;
}
```



Because I am using solid colors for the remaining parts of my fish, I use a basic shader material for these which is created through a separate function. 


Once we've created all the materials we need, we can traverse through our model's scene and replace the base materials on our model with our shader materials.

```typescript
      scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
              const meshName = child.name;
              if (blackOut) {
                  child.material = eyeMaterial;
              }
              else if (meshName === 'Fish_Base') {
                  child.material = baseMaterial;
              } else if (meshName === 'Fish_Accent') {
                  child.material = accentMaterial;
              } else if (meshName === 'Fish_Black') {
                  child.material = eyeMaterial;
              }
              else if (meshName === 'Fish_Upper') {
                  child.material = bodyMaterial;
              }
          }
    });  
```
