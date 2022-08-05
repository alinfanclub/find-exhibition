<template>
  <div id="navComponents">
    <hamberger-menu></hamberger-menu>
  </div>
  <router-view />
</template>
<script>
import hambergerMenu from "./components/common/hambergerMenu.vue";
export default {
  components: { hambergerMenu },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
#navComponents {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100vh;
  padding: 1rem;
  background-color: #fff;
  display: none;
}
</style>
