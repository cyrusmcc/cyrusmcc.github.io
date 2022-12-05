<template>
  <div class="container">
    <section class="fullpage">
      <personInfo></personInfo>
    </section>
    <section class="fullpage"></section>
    <section class="fullpage"></section>
    <div class="fullpage-select">
      <img :src="getImageUrl('white1.svg')" alt="select page menu option" class="fullpage-option"
        v-for="(offset, index) in state.offsets" :key="index" :title="'Go to section ' + (state.index + 1)"
        :class="{ active: state.activeSelection == index }" @click="scrollToSelection(index)">
    </div>
    <starBoard :starCount="state.starCount" />
  </div>
</template>
<script setup lang="ts">
import personInfo from "../components/PersonInfo.vue";
import starBoard from "../components/StarBoard.vue";
import { getImageUrl } from "@/utils/globalFunctions";
import { onMounted, onUnmounted, reactive } from "vue";

/* Data */
let state = reactive({
  starCount: 40,
  activeSelection: 0,
  index: 0,
  offsets: [] as number[],
  inMove: false,
  inMoveDelay: 400,
  touchStartY: 0,
});

/* Mounted, Watcher ...*/
onMounted(() => {
  calculateSectionOffsets();

  window.addEventListener("wheel", (e) => {
    console.log(e)
    handleScroll(e as WheelEvent);
  }, { passive: false }); // firefox
  /*
  window.addEventListener("mousewheel", (e) => {
    handleScroll(e as WheelEvent);
  }, { passive: false }); // chrome, safari, opera
  */
  window.addEventListener("touchstart", (e) => {
    touchStart(e as TouchEvent);
  }, { passive: false });

  window.addEventListener("touchmove", (e) => {
    touchMove(e as TouchEvent)
  }, { passive: false });

});

onUnmounted(() => {
  window.removeEventListener("DOMMouseScroll", () => { }); // firefox
  window.removeEventListener("mousewheel", () => { });
  window.removeEventListener("touchstart", () => { });
  window.removeEventListener("touchmove", () => { });
});

/* Methods */
const calculateSectionOffsets = () => {
  const sections = document.getElementsByTagName("section") as HTMLCollectionOf<HTMLElement>;
  state.offsets = [];
  for (let i = 0; i < sections.length; i++) {
    state.offsets.push(sections[i].offsetTop);
  }
};

const handleScroll = (e: WheelEvent) => {
  if (e.deltaY < -30 && !state.inMove) {
    moveDown();
  }
  else if (e.deltaY > 30 && !state.inMove) {
    moveUp();
  }

  e.preventDefault();
  return false;
};

const moveDown = () => {
  state.inMove = true;
  state.activeSelection--;
  if (state.activeSelection < 0) state.activeSelection = state.offsets.length - 1;
  scrollToSelection(state.activeSelection, true);
};

const moveUp = () => {
  state.inMove = true;
  state.activeSelection++;
  if (state.activeSelection > state.offsets.length - 1) state.activeSelection = 0;
  scrollToSelection(state.activeSelection, true);
};

const scrollToSelection = (index: number, force = false) => {
  if (state.inMove && !force) return false;

  state.activeSelection = index;
  state.inMove = true;

  console.log(document.getElementsByTagName('section'))
  console.log(index)
  document.getElementsByTagName('section')[index].scrollIntoView({
    behavior: 'smooth',
  });

  setTimeout(() => {
    state.inMove = false;
  }, state.inMoveDelay);

};

const touchStart = (e: TouchEvent) => {
  e.preventDefault()
  state.touchStartY = e.touches[0].clientY;
};

const touchMove = (e: TouchEvent) => {
  if (state.inMove) return false;
  e.preventDefault()

  const touchEndY = e.changedTouches[0].clientY;

  if (state.touchStartY < touchEndY) {
    moveDown();
  }
  else {
    moveUp();
  }

  state.touchStartY = 0;
  return false;
};

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

  .fullpage {
    height: 100vh;
    width: 100%;
    z-index: 1;
  }

  .fullpage-select {
    position: fixed;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    flex-direction: column;

    .fullpage-option {
      cursor: pointer;
      height: 1.5rem;
      margin-bottom: 1rem;
      width: 1.5rem;
      transition: .4s ease all;
      opacity: 0.6;
      filter: invert(0.5);

      &.active {
        opacity: 1;
        transform: scale(1.2);
        filter: invert(0);
      }
    }
  }

}

@include screen-md {
  .container {}
}
</style>
