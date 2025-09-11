---
title: "Generating a Million Model Variations with Three.js"
description: ""
date: "Aug 28 2025"
---

<iframe 
    src="https://webfinz.icdtea.com/embed/fish-showcase" 
    width="100%" 
    height="400px" 
    frameborder="0"
    border-radius="12px"
    title="Fish Game Showcase"
    allowtransparency="true"
></iframe>

## Working with the Model

To get started, you'll need a 3D model in GLB/GLTF format. I recommend using a base white model, as this provides the most flexibility for applying colors and textures dynamically.

  <!-- <iframe 
      src="http://localhost:5173/embed/
  fish-showcase?mode=white" 
      width="100%" 
      height="400px" 
      frameborder="0"
      title="Fish Game Showcase - 
  White"
      allowtransparency="true"
  ></iframe> -->

If you want to apply separate colors or textures to specific parts of your model, you can select those model faces and assign them different materials. For example, my fish model has separate materials for:
- Eyes
- Fins  
- Upper body
- Lower body

This separation allows me to control the color and texture of each piece independently.

### Loading a Model with Three.js

```typescript
const { scene, nodes } = useGLTF(`/models/fish/${fish.physicalAttributes.model}.glb`);
```

## Texture Mapping

  <!-- <iframe 
      src="http://localhost:5173/embed/
  fish-showcase?mode=pattern-mask" 
      width="100%" 
      height="400px" 
      frameborder="0"
      title="Fish Game Showcase - 
  Pattern Mask"
      allowtransparency="true"
  ></iframe> -->

Texture mapping is the technique we use to apply patterns or details to our model. Here's how it works:

- The texture map overlays or wraps around your model with the pattern you want to use
- We apply a shader to the model that allows us to apply color to the white areas of our texture map while hiding or applying a separate color to the black areas

<img src="https://github.com/cyrusmcc/icdtea-imgs/blob/main/cyrusmcc/blogs/texturemap.png?raw=true" />

*Example texture maps: Black and white patterns to wrap our model. White areas will receive your pattern color while black areas will show the base color.*

### Creating the Patterned Material

Here's how to create the patterned material for the upper body of my fish example:

```typescript
const fishUpperBodyMaterial = await createTextureMaterial(fish);
```

We'll need to load our texture image files and create a shader material:

```typescript
export async function createBodyMaterial(
  baseColorHex: string, 
  patternColorHex: string
) {
  const textureImage = await loadTexture(`/textures/patterns/polkadot-pattern.png`);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      primaryColor: { value: new THREE.Color(baseColorHex) },
      patternColor: { value: new THREE.Color(patternColorHex) }, 
      patternTexture: { value: textureImage },
    },
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
        vec4 pattern = texture2D(patternTexture, vUv); // Fixed: was modifiedUV
        
        // Use the pattern's red channel as the blend factor
        float patternValue = pattern.r; // Fixed: was undefined
        
        // Mix the base color and pattern color based on the pattern value
        vec3 finalColor = mix(primaryColor, patternColor, patternValue);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });

  return material;
}
```

## Working with Shaders

We utilize a fragment shader to apply separate colors to the contrasting areas in our texture map. Since our texture map is black and white, we can use a mix function to transform these color values into any other colors we desire.

The process works like this:
- Apply a base color to the model material itself
- Apply another color to the texture that wraps around it
- For example, if you want a blue fish with orange polka dots, you would apply blue as the base color and orange to the white areas of your texture map

Because we assigned different materials to our model during creation, we can apply shaders to each material belonging to our mesh (model) independently with Three.js.

For the remaining parts of my fish that use solid colors, I use a basic shader material created through a separate function.

## Applying the Materials

Once we've created all the materials we need, we can traverse through our model's scene and replace the base materials with our custom shader materials:

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

This approach allows us to generate countless variations of our model by simply changing the color values and texture patterns, creating a virtually infinite number of unique appearances from a single base model.