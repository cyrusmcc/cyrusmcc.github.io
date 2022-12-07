<template>
    <div class="personInfo">
        <portrait></portrait>
        <div class="id">
            <span class="name">Cyrus McCormick</span>
            <span class="role">Fullstack Developer</span>
        </div>
    </div>
</template>  
<script setup lang="ts">
import Portrait from "./Portrait.vue";
</script>  
<style scoped lang="scss">
.personInfo {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    width: fit-content;
    text-shadow: $textShadow;

    .id {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 2rem;

        .name {
            font-size: 2rem;
            font-weight: 600;
        }

        .role {
            font-size: 1.5rem;
            font-weight: 400;
        }
    }
}
</style>