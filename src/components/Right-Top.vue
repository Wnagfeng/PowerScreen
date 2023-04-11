<template>
  <div class="wrapper">
    <div class="left">
      <waterBall :counter="totalPercentage"></waterBall>
    </div>
    <div class="right">
      <template v-for="(item, index) in Data">
        <div class="item-inner">
          <span :class="['dot', `area${item.id}`]"></span>
          <span class="name">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import waterBall from "./water-ball.vue";
import { defineProps } from "vue";
defineProps({
  totalPercentage: {
    type: Number,
    default: 0,
  },
  Data: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
</script>
<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
}
.left {
  justify-content: center;
  align-items: center;
}
.right {
  margin-top: 30px;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.item-inner {
  margin-top: 20px;
  width: 100%;
  flex-wrap: nowrap;
  display: flex;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-size: 20px;
  margin-right: 11px;
}
.name {
  margin-left: 10px;
}
.percentage {
  margin-left: 10px;
}
.dot {
  margin-left: 10px;
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
}
.area1 {
  background-color: #209393;
}
.area2 {
  background-color: #1a54a5;
}
.area3 {
  background-color: #85caf0;
}
.area4 {
  background-color: #f5b64a;
}
.area5 {
  background-color: #ee792e;
}
</style>
