import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/MapView.vue"),
  },
  {
    path: "/space/:id",
    component: () => import("@/views/InfoSpaceView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
