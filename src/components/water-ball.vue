<template>
  <div class="water-ball" :style="{ width: size, height: size }">
    <svg
      version="1.1"
      xmlns="https://www.w3.org/2000/svg"
      xmlns:xlink="https://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      style="display: none"
    >
      <symbol id="wave">
        <path
          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
        ></path>
        <path
          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
        ></path>
      </symbol>
    </svg>
    <div class="box" :style="{ width: size, height: size }">
      <div class="percent" :style="{ fontSize: countSize }">
        <div class="percentNum" id="count" ref="number">{{ current }}</div>
        <div class="percentB">%</div>
      </div>
      <div ref="water" id="water" class="water">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
          <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
const props = defineProps({
  size: {
    type: String,
    default: "190px",
  },
  counter: {
    type: Number,
    default: 0,
  },
  countSize: {
    type: String,
    default: "40px",
  },
});
// 获取球体进度和文字
const water = ref();
let current = ref(0);
watch(
  () => props.counter,
  (newV, oldV) => {
    startanimate(newV);
  }
);
onMounted(() => {});
function startanimate(count) {
  var timeId = null;
  timeId = setInterval(function () {
    current.value++;
    // 边界的判断
    if (current.value >= count) {
      clearInterval(timeId);
    }
    water.value.style.transform = `translate(0%,${100 - current.value}%)`;
  }, 60);
}
</script>
<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  outline: none;
}

body {
  background: #020438;
  font: 14px/1 "Open Sans", helvetica, sans-serif;
}
.box {
  margin-top: 30px;
  margin-left: 30px;
  position: absolute;
  background: #020438;
  border-radius: 100%;
  overflow: hidden;
}
.box .percent {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  align-items: center;

  justify-content: center;
  color: #fff;
}
.box .water {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform: translate(0, 50%);
  background: #4d6de3;
}
.box .water_wave {
  width: 200%;
  position: absolute;
  bottom: 100%;
}
.box .water_wave_back {
  right: 0;
  fill: #c7eeff;
  animation: moveWaveBack 1.7s linear infinite;
}
.box .water_wave_front {
  left: 0;
  fill: #4d6de3;
  margin-bottom: -1px;
  animation: moveWavefront 0.7s linear infinite;
}
@keyframes moveWaveBack {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(50%);
  }
}
@keyframes moveWavefront {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
