import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/space",
  },
  {
    path: "/space",
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
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFoundPage.vue"),
  },
  {
    path: "/make",
    component: () => import("@/views/makeMarkerView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
