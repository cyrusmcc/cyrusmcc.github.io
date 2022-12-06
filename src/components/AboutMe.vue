<template>
    <div class="skills">
        <span class="skillLabel">Skills</span>
        <div class="skillIcons">
            <div class="beIcons">
                <img :src="getImageUrl('skills/mysql.svg')" alt="mysql icon" />
                <img :src="getImageUrl('skills/java.svg')" alt="java icon" />
                <img :src="getImageUrl('skills/spring.svg')" alt="spring icon" />
            </div>
            <div class="feIcons">
                <img :src="getImageUrl('skills/sass.svg')" alt="sass icon" />
                <img :src="getImageUrl('skills/js.svg')" alt="js icon" />
                <img :src="getImageUrl('skills/vue.svg')" alt="vue icon" />
            </div>
        </div>
    </div>
    <span class="desc">
    </span>
</template>

<script setup lang="ts">
import { getImageUrl } from "../utils/globalFunctions";

</script>
<style scoped lang="scss">
.skills {
    @include flexCenter();
    width: 80%;
    //border-bottom: 2px solid $primaryLight;
    padding-bottom: 15px;
    margin-top: 15px;

    .skillLabel {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .skillIcons {
        display: flex;
        flex-direction: column;
        width: 80%;
        row-gap: 20px;
    }

    .skillIcons>div {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .skillIcons>.beIcons>img,
    .skillIcons>.feIcons>img {
        height: auto;
        width: 2rem;
        align-self: center;
    }
}

.desc {
    max-height: 14rem;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    overflow: hidden;
    direction: rtl;
    //box-shadow: $shadowLight;
}

.desc>span {
    padding: 10px;
    overflow-y: scroll;
    height: inherit;
}
</style>