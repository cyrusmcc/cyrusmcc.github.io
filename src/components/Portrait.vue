<template>
    <div class="portraitWrapper">
        <img class="blob" :src="getImageUrl('blob.svg')" alt="blob accent" />
        <img class="portrait" :src="getImageUrl('portrait.jpg')" alt="Portrait of me" />
    </div>
</template>  
<script setup lang="ts">
import {

    getImageUrl
} from "@/utils/globalFunctions";
</script>  
<style scoped lang="scss">
.portraitWrapper {
    position: relative;

    @include flexCenter();
}

.blob {
    filter: brightness(1.2);
    height: auto;
    opacity: 0.9;
    pointer-events: none;
    position: absolute;
    transform: rotate(321deg);
    width: 144%;
    z-index: 2;
}

.portrait {
    border-radius: 50%;
    box-shadow: $shadow1;
    height: 125px;
    object-fit: cover;
    object-position: center right;
    pointer-events: none;
    position: relative;
    width: 125px;
    z-index: 2;
}
</style>