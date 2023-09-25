import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/user/login",
  },
  {
    path: "/user/login",
    component: () => import("@/components/LoginVue.vue"),
  },
  {
    path: "/user/signup",
    component: () => import("@/components/SignUpVue.vue"),
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
    path: "/space/make",
    component: () => import("@/views/makeMarkerView.vue"),
  },
  {
    path: "/edit/:id",
    component: () => import("@/components/editMarker.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
