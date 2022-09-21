<template>
  <div v-show="this.$store.state.menuActive == true">
    <div
      id="co"
      :class="{
        menuActive: this.$store.state.menuActive === true,
        menuDead: this.$store.state.menuActive === false,
      }"
    >
      <ul>
        <li @click="CloseMenu(), (this.$store.state.localIconShow = true)">
          <router-link to="/">전시장지도</router-link>
        </li>
        <li @click="CloseMenu(), (this.$store.state.cafeLocalIconShow = true)">
          <router-link to="/cafe">카페지도</router-link>
        </li>
      </ul>
    </div>
    <div id="bgBox" @click="closeMenu"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywordSearch: "",
    };
  },
  methods: {
    CloseMenu() {
      this.$store.state.menuActive = false;
    },
    closeMenu() {
      this.$store.state.menuActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#bgBox {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(7, 7, 7, 0.294);
  z-index: 99;
}
#co {
  width: 10rem;
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 100;

  &.menuDead {
    display: flex;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: 0;
    opacity: 0;
    transition: 0.5s;

    ul {
      left: -100%;
    }
  }
  &.menuActive {
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.5s;
    z-index: 100;

    ul {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      li {
        padding: 1rem 0;
        text-align: center;
      }
    }
  }
}
</style>
