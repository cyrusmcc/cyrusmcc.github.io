<template>
  <div class="container">
    <header>
      <StarBoard :starCount="state.starCount" />
    </header>
    <div class="aboutMe">
      <div class="labelBox">
        <span>About me</span>
      </div>
      <div class="contentBox"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StarBoard from "../components/StarBoard.vue";
import {
  reactive
} from "vue";
/* Data */
let state = reactive({
  starCount: 12,
});
</script>
<style lang="scss" scoped>
.container {
  align-items: center;
  background-color: black;
  border-left: 1px solid $gray100;
  border-right: 1px solid $gray100;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 98%;

  header {
    border-bottom: 1px solid $gray100;
    height: 10rem;
    width: 100%;
  }

  .aboutMe {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid $gray100;

    .labelBox {
      background-color: $color2;
    }

  }

  .labelBox {
    border-bottom: 1px solid $gray100;
    @include flexCenter();
    width: 100%;
    height: 6rem;

    span {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .contentBox {
    background-color: black;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10rem;
  }
}

@include screen-md {
  .container {
    max-width: 800px;
    width: 95%;

    .aboutMe {
      display: flex;
      flex-direction: row;
      height: 21rem;
      width: 100%;

      .labelBox {
        border-bottom: 1px solid $gray100;
        height: 100%;
        width: 100%;
        @include flexCenter();
        font-family: $Newake;

        span {
          font-size: 1.5rem;
          font-weight: 600;
          height: fit-content;
          width: fit-content;
        }
      }

      .contentBox {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
