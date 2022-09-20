<template>
  <div id="co">
    <ul>
      <li @click="CloseMenu(), (this.$store.state.localIconShow = true)">
        <router-link to="/">전시장지도</router-link>
      </li>
      <li @click="CloseMenu(), (this.$store.state.cafeLocalIconShow = true)">
        <router-link to="/cafe">카페지도</router-link>
      </li>
    </ul>
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
  },
};
</script>

<style lang="scss" scoped>
#co {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    li {
      padding: 1rem 0;
      text-align: center;
    }
  }
}
</style>
