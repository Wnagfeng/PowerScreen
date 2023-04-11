<template>
  <div class="itemWrapper">
    <template v-for="item in props.Data">
      <div class="item">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="Number">
            <span class="state" :id="`total-num-${item.id}`">{{
              item.totalNum
            }}</span>
            <span class="titxe">{{ item.unit }}</span>
          </div>
        </div>
        <div class="right" :class="[item.isUp ? 'red' : 'green']">
          <div :class="[item.isUp ? 'up' : 'down']"></div>
          <div :id="`percentage-num-${item.id}`" class="number">
            {{ item.percentage }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { CountUp } from "countup.js";

import { defineProps, watch, nextTick } from "vue";

const props = defineProps({
  Data: {
    tyep: Array,
    default: () => {
      return [];
    },
  },
});
// 在使用滚动数字库的时候我们需要注意使用的地点 ，
// 我们最好在watch中使用等数据回来以后检测的数据的变化在调用数字滚动函数
// 数字滚动函数
watch(
  () => props.Data,
  (newV, oldV) => {
    //在下一次dom更新完成之后会回调
    /*
    这个函数通常用于在数据更新后，等待DOM更新之后执行一些操作，比如获取DOM元素的尺寸、位置等 
     */
    nextTick(() => {
      startAnimation(newV);
    });
  }
);
function startAnimation(panelItems = []) {
  const option = {
    decimalPlaces: 1, // 保留一位小数点
    duration: 2,
    useGrouping: false, // 1000 -> 1,000
  };
  const option2 = {
    decimalPlaces: 1, // 保留一位小数点
    duration: 2,
    useGrouping: false, // 1000 -> 1,000
    suffix: "%",
  };
  panelItems.forEach((item) => {
    new CountUp(`total-num-${item.id}`, item.totalNum, option).start();
    new CountUp(`percentage-num-${item.id}`, item.percentage, option2).start();
  });
}


</script>
<style scoped>
.itemWrapper {
  margin-top: 65px;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;

  align-items: center;
}
.item .left .title {
  color: #fff;
}
.item .left .Number {
  color: #23aeff;
  font-weight: bold;
  font-size: 36px;
}
.item .right {
  display: flex;
  align-items: center;
  color: red;
  margin-top: 37px;
  margin-left: 18px;
}
.green {
  color: green !important;
}
.red {
  color: red;
}
.up {
  width: 0;
  height: 0;
  border-bottom: 8px solid #c70013;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.down {
  width: 0;
  height: 0;
  width: 0;
  height: 0;
  border-top: 8px solid #37a73f;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
</style>
