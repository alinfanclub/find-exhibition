<template>
  <div id="container">
    <li>카페 지도</li>
    <li>전시 지도</li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywordSearch: "",
    };
  },
};
</script>

<style lang="scss" scoped>
#container {
  ul {
    li {
      padding: 1rem 0;
      text-align: center;
    }
  }
}
</style>
