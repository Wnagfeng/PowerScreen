// 对userEcharts进行封装 封装的好处在于我们后期可以对我们的图像进行统一的管理
import * as echarts from "echarts";
import { onUnmounted } from "vue";
export default function useEcharts(divEl) {
  // 谁要使用Echarts图表就把挂载点传递过来
  //              初始化画布    挂载点       背景颜色   渲染器
  const echartsinStance = echarts.init(divEl, null, { renderer: "svg" });
  onUnmounted(() => {
    // 在组件销毁的时候我们把EEcharts实例释放掉
    echartsinStance.dispose();
  });

  function setOption(option) {
    echartsinStance.setOption(option);
  }
  function ressizeEcharts() {
    echartsinStance.resize();
  }
  return {
    echartsinStance,
    setOption,
    ressizeEcharts,
  };
}
