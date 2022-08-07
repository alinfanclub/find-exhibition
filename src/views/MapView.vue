<template>
  <div>
    <div
      id="wrap"
      :class="{
        menuActive: this.$store.state.menuActive === true,
        menuDead: this.$store.state.menuActive === false,
      }"
    >
      <hamberger-menu
        class="menu-content"
        :class="{ menuContentActive: this.$store.state.menuActive === true }"
      ></hamberger-menu>
      <div id="bgBox" @click="closeMenu"></div>
    </div>
    <show-map></show-map>
  </div>
</template>

<script>
import HambergerMenu from "@/components/common/hambergerMenu.vue";
import ShowMap from "@/components/ShowMap.vue";
export default {
  name: "MapView",
  components: {
    ShowMap,
    HambergerMenu,
  },
  methods: {
    closeMenu() {
      this.$store.state.menuActive = false;
    },
  },
};
</script>

<style scoped lang="scss">
.menuDead {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 0;
  opacity: 0;
  transition: 0.5s;
}
.menuActive {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0 !important;
  opacity: 1 !important;
  left: 0% !important;
  z-index: 50;
  transition: 0.5s;
}
.menu-content {
  background: #fff;
  position: absolute;
  width: 400px;
  height: 100vh;
  top: 0;
  left: -100%;
  transition: 0.5s;
  z-index: 52;
}
.menuContentActive {
  top: 0;
  left: 0% !important;
}
#bgBox {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 7, 7, 0.294);
}

@media screen and (max-width: 1000px) {
  .menu-content {
    width: 50%;
  }
}
</style>
