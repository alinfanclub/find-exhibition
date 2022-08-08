<template>
  <div id="co">
    <ul>
      <li @click="CloseMenu"><router-link to="/">전시장지도</router-link></li>
      <li @click="CloseMenu"><router-link to="/cafe">카페지도</router-link></li>
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
  ul {
    display: flex;
    flex-direction: column;
    li {
      padding: 1rem 0;
      text-align: center;
    }
  }
}
</style>
