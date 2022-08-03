<template>
  <div>
    <show-map ref="map">
      <div class="overlay">
        <h3>오버레이 화면</h3>
        <div>이곳에 항구 정보를 표시함</div>
      </div>
    </show-map>
  </div>
</template>

<script>
import ShowMap from "@/components/ShowMap.vue";
export default {
  name: "MapView",
  components: {
    ShowMap,
  },
};
</script>

<style scoped></style>
