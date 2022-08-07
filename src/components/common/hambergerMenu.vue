<template>
  <div id="co">
    <ul>
      <li>카페 지도</li>
      <li>전시 지도</li>
      <li>test</li>
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
