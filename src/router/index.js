import { createRouter, createWebHistory } from "vue-router";
import Appview from "../App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Appview,
    },
  ],
});

export default router;
