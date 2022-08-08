import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/components/SpaceMap.vue"),
  },
  {
    path: "/space/:id",
    component: () => import("@/views/InfoSpaceView.vue"),
  },
  {
    path: "/cafe",
    component: () => import("@/components/cafaMap.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
