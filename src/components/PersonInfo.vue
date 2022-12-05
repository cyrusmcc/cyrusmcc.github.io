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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;

    .id {
        display: flex;
        flex-direction: column;
        align-items: center;
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