<template>
    <div id="canvasContainer"></div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { onMounted, onUnmounted } from "vue";
import { getImageUrl } from "../utils/globalFunctions";

/* Types */
type SpriteProp = {
    sprite: PIXI.Sprite;
    direction: number;
    speed: number;
    offset: number;
    turningSpeed: number;
}

/* Emits/props */
const emit = defineEmits<{
    (e: 'selectStar', textureUrl: string, colorTintIndex: number): void
}>()

const props = defineProps({
    starCount: {
        type: Number,
        default: 0,
    },
})

/* Data */
const colors: number[] = [0xFDF5EF, 0x83CDC5, 0x47A3C6, 0x17C778, 0xFF91BD, 0xF8B948, 0xFD5621]
const imgArray: string[] = ['white1.svg', 'white2.svg', 'white3.svg', 'white4.svg', 'white5.svg', 'white6.svg', 'white7.svg']
const spriteArray: SpriteProp[] = new Array();
const stars = new PIXI.Container();

/* Mounted, Watcher ...*/
onMounted(async () => {
    if (!PIXI.utils.isWebGLSupported()) {
        PIXI.utils.sayHello('');
    }

    const app = new PIXI.Application({
        backgroundColor: 0x000000,
        antialias: true,
        resizeTo: document.getElementById("canvasContainer")!,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
    });

    buildApp(app);

    return {
    };
});

onUnmounted(() => {
    window.removeEventListener("resize", () => { });
});

/* Methods */
function buildApp(app: PIXI.Application) {
    document.getElementById("canvasContainer")!.appendChild(app.view);
    app.stage.addChild(stars);

    createStars(app, stars, spriteArray)
}

function createStars(app: PIXI.Application, stars: PIXI.Container, spriteArray: SpriteProp[]) {
    let starCount = props.starCount;

    for (let i = 0; i < starCount; i++) {
        newStar(app);
    }

    // create a bounding box box for the star
    const starsBoundsPadding = 20;
    const starsBounds = new PIXI.Rectangle(
        -starsBoundsPadding,
        -starsBoundsPadding,
        app.screen.width + starsBoundsPadding * 2,
        app.screen.height + starsBoundsPadding * 2,
    );

    app.ticker.add(() => {
        for (let j = 0; j < spriteArray.length; j++) {
            const starSprite = spriteArray[j];

            if (j % 10 === 0) {
                starSprite.direction += starSprite.turningSpeed * Math.random();
            }

            if (j % 20 == 0) {
                starSprite.direction -= starSprite.turningSpeed * Math.random();
            }

            starSprite.sprite.x += Math.sin(starSprite.direction) * (starSprite.speed);
            starSprite.sprite.y += Math.cos(starSprite.direction) * (starSprite.speed);

            // wrap the stars once they've fully left the screen
            if (starSprite.sprite.x < starsBounds.x) {
                starSprite.sprite.x += starsBounds.width;
            } else if (starSprite.sprite.x > starsBounds.x + starsBounds.width) {
                starSprite.sprite.x -= starsBounds.width;
            }

            if (starSprite.sprite.y < starsBounds.y) {
                starSprite.sprite.y += starsBounds.height;
            } else if (starSprite.sprite.y > starsBounds.y + starsBounds.height) {
                starSprite.sprite.y -= starsBounds.height;
            }

            stars.addChild(starSprite.sprite);
        }

    });

    window.addEventListener("resize", () => {
        starsBounds.width = document.getElementById('canvasContainer')!.offsetWidth + starsBoundsPadding * 2;
        starsBounds.height = document.getElementById('canvasContainer')!.offsetHeight + starsBoundsPadding * 2;
        app.renderer.resize(starsBounds.width, starsBounds.height);
    });
}

function newStar(app: PIXI.Application,) {
    const imgUrl = imgArray[Math.floor(Math.random() * imgArray.length)];
    const starSprite = PIXI.Sprite.from(getImageUrl(imgUrl));

    const tintColorIndex = Math.floor(Math.random() * colors.length);
    starSprite.tint = colors[tintColorIndex];

    starSprite.x = Math.random() * app.screen.width;
    starSprite.y = Math.random() * app.screen.height;
    starSprite.rotation = Math.random() * Math.PI;
    starSprite.scale.set(0.4 + Math.random() * 0.06);

    const starProp: SpriteProp = {
        sprite: starSprite,
        direction: Math.random() * Math.PI * 2,
        speed: (2 + Math.random() * 2) * 0.02,
        offset: Math.random() * 100,
        turningSpeed: Math.random() * 0.005,
    };

    starSprite.anchor.set(0.5);

    // Opt-in to interactivity
    starSprite.interactive = true;

    // Shows hand cursor
    starSprite.buttonMode = true;

    starSprite.on('pointerdown', () => {
        handleSelectStar(imgUrl, tintColorIndex, starProp, app);
    });

    spriteArray.push(starProp);
    stars.addChild(starSprite);
}

function handleSelectStar(textureUrl: string, tintColorIndex: number, starProp: SpriteProp, app: PIXI.Application) {
    // when star is emmitted, display on text area w/ current texture
    emit('selectStar', textureUrl, tintColorIndex);

    // remove star from screen
    stars.removeChild(starProp.sprite);
    spriteArray.splice(spriteArray.indexOf(starProp), 1);
    newStar(app);
}

</script>

<style lang="scss" scoped>
#canvasContainer {
    background: $black;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
}
</style>