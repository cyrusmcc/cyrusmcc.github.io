<template>
    <div class="sideScrollContainer">
        <div class="itemList">
            <div class="directionArrowLeft" @click="handleLeftClick" v-if="items.length > length">
                &lt;
            </div>
            <div class="directionArrowRight" @click="handleRightClick" v-if="items.length > length">
                &gt;
            </div>
            <div class="sideScrollItem" v-for="(item, i) in itemsSubArr" :key="i">
                <img class="itemImg" :src="getImageUrl(item.imgUrl)" alt="carousel-image" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, computed, watch, onMounted } from 'vue';
import { getImageUrl } from '../utils/globalFunctions';
const state = reactive({
    itemList: [] as any[],
})
const props = defineProps({
    length: {
        type: Number,
        default: 4,
    },
    items: {
        type: Array,
        default: [],
    },
})
onMounted(() => {
    state.itemList = props.items;
})
watch(() => props.items, () => {
    state.itemList = props.items;
});
const itemsSubArr = computed(() => {
    return state.itemList.slice(0, props.length)
})
const handleRightClick = () => {
    state.itemList.push(state.itemList.shift())
}
const handleLeftClick = () => {
    state.itemList.unshift(state.itemList.pop())
}
const getImg = (imgUrl: Blob) => {
    return URL.createObjectURL(imgUrl)
}
</script>

<style lang="scss" scoped>
.sideScrollContainer {
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: fit-content;
}

.sideScrollLabel {
    color: $gray100;
    font-size: 1.1rem;
    font-weight: normal;
    margin: 45px 0 0 0;
    padding-left: 5px;
    width: 100%;
}

.directionArrowLeft {
    align-items: center;
    background: $gray800;
    border-radius: 5px;
    color: $gray100;
    cursor: pointer;
    display: flex;
    font-size: $fontSize4;
    height: 2rem;
    justify-content: center;
    left: 0;
    margin-left: 5px;
    outline: $outline;
    position: absolute;
    width: 2rem;
    z-index: 1;
}

.directionArrowRight {
    align-items: center;
    background: $gray800;
    border-radius: 5px;
    color: $gray100;
    cursor: pointer;
    display: flex;
    font-size: $fontSize4;
    height: 2rem;
    justify-content: center;
    margin-right: 5px;
    outline: $outline;
    position: absolute;
    right: 0;
    width: 2rem;
    z-index: 1;
}

.itemList {
    align-items: center;
    column-gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 100%;
    position: relative;
    width: fit-content;
}

.sideScrollItem {
    align-items: center;
    border-radius: 10px;
    border: 1px solid $outline;
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: flex-start;
    margin: 1rem 0;
    overflow: hidden;
    width: 20rem;
}

.itemImg {
    height: auto;
    object-fit: cover;
    width: 100%;
}
</style>