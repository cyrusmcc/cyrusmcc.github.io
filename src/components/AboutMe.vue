<template>
    <div class="skills">
        <span class="skillLabel">Skills</span>
        <div class="skillIcons">
            <div class="beIcons">
                <img :src="getImageUrl('skills/java.svg')" alt="java icon" />
                <img :src="getImageUrl('skills/spring.svg')" alt="spring icon" />
                <img :src="getImageUrl('skills/kotlin.svg')" alt="kotlin icon" />
            </div>
            <div class="feIcons">
                <img :src="getImageUrl('skills/js.svg')" alt="js icon" />
                <img :src="getImageUrl('skills/vue.svg')" alt="vue icon" />
                <img :src="getImageUrl('skills/ts.svg')" alt="ts icon" />
            </div>
            <div class="otherIcons">
                <img :src="getImageUrl('skills/mysql.svg')" alt="mysql icon" />
                <img :src="getImageUrl('skills/python.svg')" alt="python icon" />
                <img :src="getImageUrl('skills/postgresql.svg')" alt="postgresql icon" />
            </div>
        </div>
    </div>
    <div class="descLinkParent">
        <div class="descContainer">
            <span class="desc">
                My name is Cyrus and I am a web developer with a passion for creating creative and interactive
                websites.
                I
                am
                currently studying computer science at the University of New Mexico and have a particular interest
                in
                using
                Spring Boot and Vue.js to build elegant and functional web applications. In my free time, I enjoy
                watching
                sci-fi television shows and tackling challenging routes at the rock climbing gym. I also have a love
                for
                simple
                pleasures, such as sipping on a cold glass of iced tea and cruising around in my miata with the top
                down
                on
                a
                sunny day.
            </span>
        </div>
        <div class="socialContainer">
            <div class="socialRowOne">
                <a href="mailto: dev@cyrusmcc.com" target="_blank" title="email">
                    <div class="blobContainer floatAnim" href="">
                        <img class="socialIcon" :src="getImageUrl('icons/email.svg')" alt="email icon">
                        <img class="blob" :src="getImageUrl('dots/white2.svg')" alt="accent image">
                    </div>
                </a>
                <a href="https://github.com/cyrusmcc" title="github">
                    <div class="blobContainer floatAnim">
                        <img class="socialIcon" :src="getImageUrl('icons/github.svg')" alt="github icon">
                        <img class="blob" :src="getImageUrl('dots/white4.svg')" alt="accent image">
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/cyrusmcc/" title="linkedin">
                    <div class="blobContainer floatAnim">
                        <img class="socialIcon" :src="getImageUrl('icons/linkedin.svg')" alt="linkedin icon">
                        <img class="blob" :src="getImageUrl('dots/white5.svg')" alt="accent image">
                    </div>
                </a>
                <a href="https://drive.google.com/file/d/1-l4pgVrcBHjNPl0KcpfQs4SZdYzBWc1C/view" title="resume">
                    <div class="blobContainer floatAnim">
                        <img class="socialIcon" :src="getImageUrl('icons/resume.svg')" alt="resume icon">
                        <img class="resumeBlob" :src="getImageUrl('dots/white4.svg')" alt="accent image">
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from "../utils/globalFunctions";

</script>
<style scoped lang="scss">
.skills {
    @include flexCenter();
    width: fit-content;
    //border-bottom: 2px solid $primaryLight;
    margin-top: 15px;
    text-shadow: $textShadow;
    padding-bottom: 20px;

    .skillLabel {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .skillIcons {
        display: flex;
        flex-direction: column;
        width: 20rem;
        row-gap: 30px;
    }

    .skillIcons>div {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .skillIcons>.beIcons>img,
    .skillIcons>.feIcons>img {
        height: auto;
        width: 1.5rem;
        align-self: center;
    }
}

.descContainer {
    height: fit-content;
    width: fit-content;
    border-top: 3px solid $color4;

    .desc {
        width: fit-content;
        max-width: 35rem;
        display: flex;
        justify-content: flex-start;
        text-align: center;
        hyphens: auto;
        overflow: hidden;
        text-shadow: $textShadow;
        margin-top: 15px;
    }
}


.socialContainer {
    @include flexCenter();
    width: 100%;
    margin-top: 10px;

    .socialRowOne {
        @include flexCenter();
        flex-direction: row;
        width: 100%;
        column-gap: 20px;

        img {
            height: auto;
            width: 2.5rem;
        }

        .resumeBlob {
            height: auto;
            width: 3rem;
            transform: rotate(90deg);;
        }

    }

    .blobContainer {
        position: relative;
        cursor: pointer;

        .blob {
            height: auto;
            width: 3rem;
        }

        .socialIcon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: auto;
            width: 2rem;
            z-index: 1;
        }

    }

}
</style>