<template>
  <div class="container">
    <section class="fullpage title">
      <personInfo></personInfo>
      <div class="linkBlobs">
        <div class="blobContainer floatAnim">
          <span @click="scrollToSelection(1)">About me</span>
          <img :src="getImageUrl('dots/white2.svg')" alt="link to about me" :style="{
            filter: 'brightness(0) saturate(100%) invert(54%) sepia(82%) saturate(414%) hue-rotate(101deg) brightness(97%) contrast(98%)'
          }" @click="scrollToSelection(1)" class="blob">
        </div>
        <div class="blobContainer floatAnim">
          <span @click="scrollToSelection(2)">My projects</span>
          <img :src="getImageUrl('dots/white3.svg')" alt="link to projects" :style="{
            filter: 'brightness(0) saturate(100%) invert(89%) sepia(13%) saturate(6189%) hue-rotate(289deg) brightness(101%) contrast(102%)',
            transform: 'rotate(-10deg)'
          }" @click="scrollToSelection(2)" class="blob">
        </div>
        <!-- blob for future content
        <div class="blobContainer floatAnim">
          <span @click="scrollToSelection(3)">More</span>
          <img :src="getImageUrl('dots/white7.svg')" alt="link to contact" :style="{
            filter: 'brightness(0) saturate(100%) invert(62%) sepia(26%) saturate(995%) hue-rotate(151deg) brightness(91%) contrast(81%)'
          }" @click="scrollToSelection(3)" class="blob">
        </div>
         -->
      </div>
    </section>
    <section class="fullpage aboutMe">
      <div class="content">
        <div class="blobContainer floatAnim">
          <span>About me</span>
          <img :src="getImageUrl('dots/white2.svg')" alt="about me" :style="{
            filter: 'brightness(0) saturate(100%) invert(54%) sepia(82%) saturate(414%) hue-rotate(101deg) brightness(97%) contrast(98%)'
          }" class="blob medium">
        </div>
        <aboutme></aboutme>
      </div>
    </section>
    <section class="fullpage projects">
      <div class="topRow">
        <div class="blobContainer floatAnim">
          <span>Projects</span>
          <img :src="getImageUrl('dots/white2.svg')" alt="about me" :style="{
            filter: 'brightness(0) saturate(100%) invert(89%) sepia(13%) saturate(6189%) hue-rotate(289deg) brightness(101%) contrast(102%)',
            transform: 'rotate(-10deg)'
          }" class="blob medium">
        </div>
      </div>
      <div class="content">
        <projects></projects>
      </div>
    </section>
    <div class="fullpage-select">
      <img :src="getImageUrl('dots/white4.svg')" alt="select page menu option" class="fullpage-option"
        v-for="(offset, index) in state.offsets" :key="index" :title="'Go to section ' + (state.index + 1)" :class="{
          active: state.activeSelection == index
        }" @click="scrollToSelection(index)">
    </div>
    <dotBoard :starCount="state.starCount" />
  </div>
</template>
<script setup lang="ts">
import personInfo from "../components/PersonInfo.vue";
import dotBoard from "../components/DotBoard.vue";
import aboutme from "../components/AboutMe.vue";
import projects from "../components/Projects.vue";
import { getImageUrl } from "../utils/globalFunctions";
import { onMounted, onUnmounted, reactive } from "vue";

/* Data */
let state = reactive({
  activeSelection: 0,
  inMove: false,
  inMoveDelay: 400,
  index: 0,
  offsets: [] as number[],
  starCount: 60,
  touchStartY: 0,
});
/* Mounted, Watcher ...*/
onMounted(() => {
  calculateSectionOffsets();
  window.addEventListener("wheel", (e) => {
    handleScroll(e as WheelEvent);
  }, {
    passive: false
  }); // firefox
  window.addEventListener("touchstart", (e) => {
    touchStart(e as TouchEvent);
  }, {
    passive: false
  });
  window.addEventListener("touchmove", (e) => {
    touchMove(e as TouchEvent)
  }, {
    passive: false
  });
});
onUnmounted(() => {
  window.removeEventListener("DOMMouseScroll", () => {
  }); // firefox
  window.removeEventListener("mousewheel", () => {
  });
  window.removeEventListener("touchstart", () => {
  });
  window.removeEventListener("touchmove", () => {
  });
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

  // if mobile no smooth scroll
  if (window.innerWidth < 768) {
    document.getElementsByTagName('section')[index].scrollIntoView();
  }
  else {
    document.getElementsByTagName('section')[index].scrollIntoView({
      behavior: 'smooth',
    });
  }
  setTimeout(() => {
    state.inMove = false;
  }, state.inMoveDelay);
};
const touchStart = (e: TouchEvent) => {
  //e.preventDefault()
  state.touchStartY = e.touches[0].clientY;
};
const touchMove = (e: TouchEvent) => {
  e.preventDefault()
  if (state.inMove) return false;
  console.log(state.touchStartY)
  const touchEndY = e.changedTouches[0].clientY;
  console.log(touchEndY)
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
  font-family: $manrope;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 1280px;

  .fullpage {
    display: flex;
    height: 100vh;
    width: 100%;
    z-index: 1;

    @include flexCenter();
  }

  .blobContainer {
    align-self: flex-start;
  }

  .linkBlobs {
    column-gap: 20px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    width: fit-content;
    z-index: 0;
    margin-top: 20px;
    row-gap: 5px;

    .blobContainer>span {
      cursor: pointer;
    }

    .blobContainer>img {
      cursor: pointer;
    }
  }

  .aboutMe,
  .projects {
    justify-content: flex-start;

    .topRow {
      height: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
    }

    .content {
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 95%;
    }
  }

  .aboutMe .content {
    justify-content: flex-start;
  }


  .medium {
    width: 5.5rem;
  }

  .blobContainer>span {
    left: 50%;
    position: absolute;
    text-align: center;
    top: 35%;
    transform: translate(-50%, 0);
    white-space: nowrap;
    width: fit-content;
    z-index: 1;
  }

  .fullpage-select {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    column-gap: 5px;
    z-index: 1;

    .fullpage-option {
      cursor: pointer;
      filter: invert(0.5);
      height: 1.5rem;
      margin-bottom: 1rem;
      opacity: 0.6;
      transition: .4s ease all;
      width: 1.5rem;

      &.active {
        filter: invert(0);
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
}

@include screen-md {
  .container {

    .linkBlobs {
      flex-direction: row;
    }
    .blobContainer {
      align-self: center;
    }

    .aboutMe {
      .content {
        justify-content: center;
      }
    }

    .fullpage {
      justify-content: center;
    }

  }
}
</style>
