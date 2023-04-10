import { createRouter, createWebHistory } from "vue-router";
import PowerScreen from "@/views/PowerScreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PowerScreen,
    },
  ],
});

export default router;
