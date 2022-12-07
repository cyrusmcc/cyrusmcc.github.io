<template>
    <div class="homeContainer">
        <div class="carousel">
            <div class="directionArrows" v-if="state.arrows">
                <div class="directionArrowLeft" @click="handleLeftClick">&lt;</div>
                <div class="directionArrowRight" @click="handleRightClick">&gt;</div>
            </div>
            <div class="carouselDots" v-if="(images.length <= 5 && images.length > 1)">
                <div class="carouselDot" v-for="(image, i) in images" :key="i" @click="handleDotClick(i)" :style="[i == state.index ? {
                    opacity: 1
                } : {
                    opacity: 0.5
                }]"></div>
            </div>
            <img :src="getImageUrl(images[state.index])" alt="carousel-image" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import { getImageUrl } from '../utils/globalFunctions';
const state = reactive({
    arrows: true,
    index: 0,
});
const props = defineProps({
    arrows: {
        default: true,
        required: false,
        type: Boolean,
    },
    autoplay: {
        default: false,
        required: false,
        type: Boolean,
    },
    images: {
        required: true,
        type: null,
    },
})
onMounted(() => {
    if (props.autoplay) {
        setInterval(() => {
            handleRightClick();
        }, 5000);
    }
})

watch(() => props.images, (newVal) => {
    if (props.arrows == false || newVal.length == 1) {
        state.arrows = false;
    }
    else {
        state.arrows = true;
    }
    state.index = 0;
})

// Methods
const handleLeftClick = () => {
    state.index = state.index == 0 ? props.images.length - 1 : state.index - 1;
}
const handleRightClick = () => {
    state.index = state.index == props.images.length - 1 ? 0 : state.index + 1;
}
const handleDotClick = (i: number) => {
    state.index = i;
}
</script>
<style scoped lang="scss">
img {
    height: 100%;
    object-fit: cover;
    width: 100%;
}

.homeContainer {
    border-radius: 9px;
    height: 20rem;
    overflow: hidden;
    width: 100%;
    max-width: 40rem;
}

.carousel {
    height: 100%;
    position: relative;
    width: 100%;
}

.directionArrowLeft {
    color: #fff;
    cursor: pointer;
    font-size: 3rem;
    margin-left: 10px;
    opacity: 0.7;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.directionArrowRight {
    color: #fff;
    cursor: pointer;
    font-size: 3rem;
    margin-right: 10px;
    opacity: 0.7;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.carouselDots {
    bottom: 10px;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 1;
}

.carouselDot {
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    height: 10px;
    margin: 0 5px;
    width: 10px;
}
</style>