<template>
  <div>
    <router-view></router-view>
    <div>
      <hamberger-menu class="menu-content"></hamberger-menu>
    </div>
  </div>
</template>

<script>
import HambergerMenu from "@/components/common/hambergerMenu.vue";
export default {
  name: "WholeMap",
  components: {
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
@media screen and (max-width: 1000px) {
  .menu-content {
    width: 50%;
  }
}
</style>
