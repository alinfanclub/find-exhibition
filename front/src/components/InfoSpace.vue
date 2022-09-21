<template>
  <div id="Infocontainer">
    <header>
      <router-link to="/">
        <h1>RecordMap</h1>
      </router-link>
      <button @click="deleteA(dataID)">x</button>
    </header>
    <body>
      <div v-for="data in this.$store.state.markersSpace" :key="data">
        <div v-if="data._id == this.$route.params.id">
          <img src="@/assets/logo.png" class="data-img" />
          <div>
            {{ data.place_name }}
          </div>
          <div>
            {{ data.contents }}
          </div>
          <small>{{ data.createAt }}</small>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { deleteMarker } from "@/api/index.js";
export default {
  props: {},
  data() {
    return {
      dataID: this.$route.params.id,
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("FETCH_MARKERS_SPACE");
  },
  methods: {
    async deleteA(id) {
      if (confirm("시를 삭제 한다구요??")) {
        try {
          await deleteMarker(id);
        } catch (error) {
          console.log(error);
        }
        // this.$store.dispatch("FETCH_MARKERS_SPAC");
        this.$router.push("/space");
      }
    },
  },
};
</script>

<style scoped lang="scss">
#Infocontainer {
  margin: 0 auto;
  box-sizing: border-box;
  // max-width: 30em;
  font-size: 0.8rem;
  // position: absolute;
  // top: 0%;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 99;
  // min-width: 500px;

  header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    border-bottom: 1px solid #9c9c9c;
  }
  body {
    text-align: center;
    margin: 0 auto;

    .data-img {
      width: 70%;
      height: 70%;
      background-color: #333;
    }
  }
}
</style>
