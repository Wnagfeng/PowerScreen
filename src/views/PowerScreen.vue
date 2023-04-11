<template>
  <main class="screen-bg">
    <div class="header"></div>
    <div class="left-top">
      <pieEcharts :pie-datas="pieDatas"></pieEcharts>
    </div>
    <div class="left-bottom">
      <lineEcharts :linde-data="HomeLineDatas"></lineEcharts>
    </div>
    <div class="center">
      <CenterSvg></CenterSvg>
    </div>
    <div class="bottom">
      <CenterBottom :Data="dataAnalysi"></CenterBottom>
    </div>
    <div class="right-top">
      <RightTop :totalPercentage="totalPercen" :Data="chargingTop4"></RightTop>
    </div>
    <div class="right-center">
      <barEcharts :BarData="BarDatas"></barEcharts>
    </div>
    <div class="right-bottom">
      <RightBottomSvg :dots="exceptionMonitoring"></RightBottomSvg>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import pieEcharts from "../components/pie-echarts.vue";
import lineEcharts from "../components/line-echarts.vue";
import barEcharts from "../components/bar-echarts.vue";
import RightBottomSvg from "../components/Right-Bottom-svg.vue";
import CenterSvg from "../components/CenterSvg.vue";
import CenterBottom from "../components/Center-Bottom.vue";
import RightTop from "../components/Right-Top.vue";
import {
  pieData,
  HomeLineData,
  BarData,
  exceptionMonitoringData,
  dataAnalysisData,
  chargingTop4Data,
} from "./Config/Home-Echarts-Data";
import { getPowerScreenData } from "@/services/index.js";

let pieDatas = ref(pieData);
let HomeLineDatas = ref(HomeLineData);
let BarDatas = ref(BarData);
let exceptionMonitoring = ref(exceptionMonitoringData);
let dataAnalysi = ref(dataAnalysisData);
let totalPercen = ref(0);
let chargingTop4 = ref(chargingTop4Data);
getPowerScreenData().then((res) => {
  // 对数据进行改变chargingStatistics
  const data = res?.data;
  pieDatas.value = data.chargingPile.data;
  HomeLineDatas.value = data.processMonitoring.data;
  BarDatas.value = data.chargingStatistics.data;
  dataAnalysi.value = data.dataAnalysis.data;
  totalPercen.value = data.chargingTop4.totalPercentage;
  chargingTop4.value = data.chargingTop4.data;
});
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.header {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;
  width: 100%;
  background-image: url(@/assets/images/bg_header.svg);
  background-repeat: no-repeat;
}
.left-top {
  position: absolute;
  width: 536px;
  height: 443px;
  left: 16px;
  top: 116px;
  background-image: url(@/assets/images/bg_left-top.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.left-bottom {
  position: absolute;
  position: absolute;
  left: 16px;
  bottom: 49px;
  width: 536px;
  height: 443px;
  background-image: url(@/assets/images/bg_left_bottom.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;
  background-image: url(@/assets/images/bg_right_top.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;
  background-image: url(@/assets/images/bg_right_center.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(@/assets/images/bg_right_bottom.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}
.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(@/assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
