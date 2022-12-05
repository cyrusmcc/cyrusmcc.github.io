<template>
  <div class="container">
    <personInfo></personInfo>
    <starBoard :starCount="state.starCount" />
  </div>
</template>
<script setup lang="ts">
import personInfo from "../components/PersonInfo.vue";
import starBoard from "../components/StarBoard.vue";
import {
  reactive
} from "vue";
/* Data */
let state = reactive({
  starCount: 40,
});
</script>
<style lang="scss" scoped>
.container {
  align-items: center;
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: relative;
  font-family: $manrope;

}

@include screen-md {
  .container {}
}
</style>
