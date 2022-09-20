<template>
  <whole-map-view></whole-map-view>
</template>
<script>
import WholeMapView from "./views/WholeMapView.vue";

export default {
  components: {
    WholeMapView,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
</style>
