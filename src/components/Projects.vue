<template>
    <div class="panelContainer">
        <div class="panelOne">
            <sideScrollGallery :items="state.projects" :length="4" :title="'Other projects'"
                :active="state.activeProject" @change-active="updateActive">
            </sideScrollGallery>
            <carousel :arrows="true" :autoplay="false" :images="state.projects[state.activeProject].imgs"></carousel>
        </div>
        <div class="panelTwo">
            <div class="projectTitle">
                {{ state.projects[state.activeProject].title }}
                <div></div>
            </div>
            <div class="linkContainer">
                <a class="projectLink" v-if="state.projects[state.activeProject].link"
                    :href="state.projects[state.activeProject].link" target="_blank">
                    <span>Live site</span>
                </a>
                <a class="projectLink" v-if="state.projects[state.activeProject].repo"
                    :href="state.projects[state.activeProject].repo" target="_blank">
                    <span>Repository</span>
                </a>
            </div>
            <div class="projectDescription scrollContainer">
                {{ state.projects[state.activeProject].description }}
            </div>
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
            imgs: [
                "projects/doodalio1.png",
                "projects/doodalio2.png",
            ],
            title: "doodal.io - WIP",
            description: "doodal.io is a website which allows users to create and share doodles based on weekly prompts. Users can create doodles, view doodles created by others, and vote on their favorite doodles each week. HTML Canvas is utilized to create a drawing interface which allows users to draw and color doodles. Typescript alongside Vue.js is utilized to develop the client, and kotlin with Spring Boot is used for the backend.",
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
            description: "SuccyPlant is a full stack project which implements JWT based user auth, blog and wiki style posts creation, pagination, and user discussion. SuccyPlant is an online repository which provides information regarding the requirements of care for succulents, cactuses, and houseplants. Users can discuss plants through comments, search and filter by a variety of topical tags, and build custom plant lists. Java and Spring Framework was utilized on the backend with data stored in MySQL. Javascript with Vue.js was used to develop an SPA client on the frontend.",
            link: "",
            repo: "https://github.com/cyrusmcc/SuccyPlant",
        },
        {
            imgUrl: "projects/strboardprev.png",
            imgs: [
                "projects/strboard1.png",
            ],
            title: "Strboard.io",
            description: "Strboard.io is an anonymous message sharing platform. Users can submit text to a pool of anonymous messages and explore what others have shared. This project incorporates a content moderation system which filters problematic content from the platform. Kotlin with Spring Boot was used to develop the backend, and TypeScript alongside Vue.js was used to develop the frontend.",
            link: "",
            repo: "https://github.com/cyrusmcc/strboard-frontend",
        },
        {
            imgUrl: "projects/nmtrailsprev.png",
            imgs: [
                'projects/nmtrails1.png',
                'projects/nmtrails2.png',
            ],
            title: "NMTrails",
            description: "A full stack team based project utilizing open geoJSON datasets which allows users to search, filter, and rate hiking trails in New Mexico. NMTrails was developed for an Adobe sponsored app contest which encourages students to build mobile applications which benefit their communities. Spring Boot was used to build the backend and develop REST APIs. PostgreSQL was used for data persistence, and our client was built using Vue.js",
            link: "",
            repo: "https://github.com/cyrusmcc/nmtrails-frontend",
        },
    ],
    activeProject: 0,
})

const updateActive = (index: number) => {
    state.activeProject = index;
}

</script>

<style scoped lang="scss">
.panelContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    .panelOne {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }

    .panelTwo {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-shadow: $textShadow;

        .linkContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 0 0 10px 0;

            .projectLink {
                color: $gray100;
                text-decoration: none;
                border: 1px solid $color5;
                border-radius: 9px;
                padding: 5px;
                text-shadow: $textShadow;
                
            }

            .projectLink:hover {
                transform: scale(1.05);
            }

        }

        .projectTitle {
            font-size: 2rem;
            font-weight: 600;
            margin: 10px 0 1rem 0;
            border-bottom: 3px solid $color5;
            box-sizing: border-box;
        }

        .projectDescription {
            text-align: justify;
            hyphens: auto;
            max-width: 35rem;
        }

    }
}

@include screen-md {
    .panelContainer {
        flex-direction: row;

        .panelOne {
            flex-direction: column-reverse;
            justify-content: flex-end;
            width: 50%;
        }

        .panelTwo {
            padding: 0 spacing(2) 0 spacing(2);
            width: 50%;

            .projectTitle {
                margin: 0 0 10px 0;
            }
        }
    }

}
</style>