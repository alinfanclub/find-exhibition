import { createRouter, createWebHistory } from "vue-router";
import InfoView from "@/views/InfoSpace.vue";
const routes = [
  {
    path: "/",
    component: () => import("@/views/MapView.vue"),
  },
  {
    path: "/space/:id",
    component: InfoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
