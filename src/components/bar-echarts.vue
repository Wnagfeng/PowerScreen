<template>
  <div ref="BarWrapper" :style="{ width: width, height: height }"></div>
</template>
<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import useEcharts from "@/Hooks/UserEcharts.js";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  BarData: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const BarWrapper = ref();
let wfCharts = null;
watch(
  () => props.BarData,
  (newV, oldV) => {
    setupEcharts(newV);
  }
);
onMounted(() => {
  setupEcharts(props.BarData);
});
function getOption(echartsDatas = []) {
  // 从新数据中拿到新数据放到图标配置文件中
  let name = echartsDatas.map((item) => {
    return item.name;
  });
  let value = echartsDatas.map((item) => {
    return item.value;
  });
  let option = {
    grid: {
      left: "5%",
      right: "5%",
      top: "30%",
      bottom: "5%",
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },

      data: name,
    },
    yAxis: {
      name: "个",
      nameTextStyle: {
        color: "white",
        fontSize: 13,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisLabel: {
        color: "white",
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 17,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#01B1FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#033BFF", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: value,
      },
    ],
  };
  return option;
}
function setupEcharts(echartsDatas) {
  if (!wfCharts) {
    wfCharts = useEcharts(BarWrapper.value);
  }
  let option = getOption(echartsDatas);
  wfCharts.setOption(option);
}
</script>
<style scoped lang="less"></style>
