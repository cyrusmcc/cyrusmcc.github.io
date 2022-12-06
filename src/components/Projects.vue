<template>
    <div class="panelOne">
        <sideScrollGallery :items="state.projects" :length="4" title="Projects"></sideScrollGallery>
        <carousel :arrows="true" :autoplay="true"
            :images="['https://via.placeholder.com/450x250', 'https://via.placeholder.com/450x250']"></carousel>
    </div>
    <div class="panelTwo"></div>
</template>

<script setup lang="ts">
import carousel from "./Carousel.vue";
import sideScrollGallery from "./SideScrollGallery.vue";
import { reactive } from "vue";

const state = reactive({
    projects: [
        {
            imgUrl: "strboard.png",
            title: "Project 1",
            description: "This is a project",
        },
        {
            imgUrl: "https://via.placeholder.com/450x250",
            title: "Project 2",
            description: "This is a project",
        },
        {
            imgUrl: "https://via.placeholder.com/450x250",
            title: "Project 3",
            description: "This is a project",
        },
        {
            imgUrl: "https://via.placeholder.com/450x250",
            title: "Project 4",
            description: "This is a project",
        },
    ]
})

</script>

<style scoped lang="scss">
.panelOne {
    width: 100%;
}
</style>