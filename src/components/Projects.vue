<template>
    <div class="panelOne">
        <sideScrollGallery :items="state.projects" :length="4" title="Projects" :active="state.activeProject"
            @change-active="updateActive">
        </sideScrollGallery>
        <carousel :arrows="true" :autoplay="true" :images="state.projects[state.activeProject].imgs"></carousel>
    </div>
    <div class="panelTwo">
        <div class="projectTitle">
            {{ state.projects[state.activeProject].title }}
            <div></div>
        </div>
        <div class="projectDescription">
            {{ state.projects[state.activeProject].description }}
        </div>
    </div>
</template>

<script setup lang="ts">
import carousel from "./Carousel.vue";
import sideScrollGallery from "./SideScrollGallery.vue";
import { reactive } from "vue";

const state = reactive({
    projects: [
        {
            imgUrl: "projects/doodalioprev.png",
            imgs: [],
            title: "doodal.io",
            description: "This is a project",
            link: "",
            repo: "",
        },
        {
            imgUrl: "projects/succyplantprev.png",
            imgs: [
                "projects/succyplant1.png",
                "projects/succyplant2.png",
                "projects/succyplant3.png",
            ],
            title: "SuccyPlant",
            description: "SuccyPlant is a full stack project which implements JWT based user authorization and authentication, content generation which inlcudes the creation of blog and wiki style posts, pagination, and user discussion. SuccyPlant is an online repository containing pictures and information regarding the care and housing requirements of succulents, cactuses, and houseplants. Users can comment on & discuss plants, search and filter by a variety of topical tags, manage their accounts, and build custom plant lists. This project was developed utilizing Java and Spring Framework on the backend with data stored in MySQL. Javascript with Vue.js was used to develop a single page application for the frontend.",
            link: "",
            repo: "",
        },
        {
            imgUrl: "projects/strboardprev.png",
            imgs: [
                "projects/strboard1.png",
            ],
            title: "Strboard.io",
            description: "Submit text to a pool of anonymous messages and explore what others have shared! No registration is required to submit an anonymous message on Strboard.io.",
            link: "",
            repo: "",
        },
        {
            imgUrl: "projects/nmtrailsprev.png",
            imgs: [],
            title: "NMTrails",
            description: "Full stack team based project utilizing NPS & NFS open geoJSON datasets which allows users to search, filter, and rate hiking trails in New Mexico. NMTrails was developed for an Adobe sponsored app contest which encourages students to build mobile applications which benefit their communities. Spring Boot was utilized on the backend to develop REST APIs alongside PostgreSQL for data storage. Our client was web-based and built as an SPA using Vue.js",
            link: "",
            repo: "",
        },
    ],
    activeProject: 0,
})

const updateActive = (index: number) => {
    state.activeProject = index;
}

</script>

<style scoped lang="scss">
.panelOne {
    width: 100%;
}

.panelTwo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;

    .projectTitle {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        border-bottom: 3px solid $color5;
        box-sizing: border-box;
    }

    .projectDescription {
        text-align: justify;
        hyphens: auto;
    }

}
</style>