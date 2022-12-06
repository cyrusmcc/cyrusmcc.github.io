<template>
    <div class="homeContainer">
        <div class="carousel">
            <div class="directionArrows" v-if="arrows">
                <div class="directionArrowLeft" @click="handleLeftClick">&lt;</div>
                <div class="directionArrowRight" @click="handleRightClick">&gt;</div>
            </div>
            <div class="carouselDots" v-if="images.length <= 5">
                <div class="carouselDot" v-for="(image, i) in images" :key="i" @click="handleDotClick(i)"
                    :style="[i == state.index ? { opacity: 1 } : { opacity: 0.5 }]"></div>
            </div>
            <img :src="images[state.index]" alt="carousel-image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const state = reactive({
    index: 0,
    length: 0,
    arrows: true,
});

const props = defineProps({
    images: {
        type: null,
        required: true,
    },
    arrows: {
        type: Boolean,
        required: false,
        default: true,
    },
    autoplay: {
        type: Boolean,
        required: false,
        default: false,
    },
})

onMounted(() => {
    state.length = props.images.length;
    if (props.autoplay) {
        setInterval(() => {
            handleRightClick();
        }, 5000);
    }
})

const handleLeftClick = () => {
    state.index = (state.index - 1 + state.length) % state.length;
}

const handleRightClick = () => {
    state.index = (state.index + 1) % state.length;
}

const handleDotClick = (i: number) => {
    state.index = i;
}

</script>

<style scoped lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.homeContainer {
    height: 100%;
    width: 100%;
}

.carousel {
    height: 100%;
    width: 100%;
    position: relative;
}

.directionArrowLeft {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    margin-left: 10px;
    color: #fff;
    opacity: 0.7;
    cursor: pointer;
    z-index: 1;
}

.directionArrowRight {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    margin-right: 10px;
    font-size: 3rem;
    color: #fff;
    opacity: 0.7;
    cursor: pointer;
    z-index: 1;
}

.carouselDots {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 1;
}

.carouselDot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: #fff;
    cursor: pointer;
}
</style>