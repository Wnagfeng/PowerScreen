<template>
  <!-- 在绘制Echarts时候必须要有宽高指定画布的宽高 -->

  <div ref="Wrapper" :style="{ width: width, height: height }"></div>
</template>
<script setup>
import { defineProps, ref, onMounted } from "vue";
import useEcharts from "@/Hooks/UserEcharts.js";
import { watch } from "vue";

// 获取画布挂载点
const Wrapper = ref(); //用于初始化画布

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  pieDatas: {
    type: Array,
    default: () => {
      {
        return [];
      }
    },
  },
});

function getOption(pieData = []) {
  let pieDatas = pieData;
  // 拿到颜色
  let colors = pieDatas.map((item) => {
    return item.color;
  });

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
    };
  });

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  let option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",
      formatter: function (name) {
        var currentItem = pieDatas.find((item) => item.name === name);
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        );
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false,
        },
        data: data,
        roseType: "area",
      },
    ],
  };
  return option;
}

// 监听数据的变化 当数据变化以后我们把新数据设置进去
watch(
  () => props.pieDatas,
  (newV, oldV) => {
    // 当数据发生改变的时候我们就拿到新的数据重新设置一下
    setupEcharts(newV);
  }
);
let wfChart = null;
onMounted(() => {
  setupEcharts(props.pieDatas);
});
function setupEcharts(pidata) {
  // 如果画布不存在我们就创建画布
  if (!wfChart) {
    wfChart = useEcharts(Wrapper.value);
  }
  // 如果存在我们就重新设置一下opstion
  // 这个数据应该来自于网络请求
  let option = getOption(pidata); //走getOption来优化数据完整度
  // 设置配置项
  wfChart.setOption(option);
}
</script>
<style scoped lang="less"></style>
