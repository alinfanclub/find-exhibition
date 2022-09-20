<template>
  <div id="Infocontainer">
    <div v-for="data in this.$store.state.markersSpace" :key="data">
      <div v-if="data._id == this.$route.params.id">
        <div>
          {{ data._id }}
        </div>
        <div>
          {{ data.place_name }}
        </div>
        <div>
          {{ data.contents }}
        </div>
      </div>
    </div>
    <button @click="deleteA(a)">x</button>
  </div>
</template>

<script>
import { deleteMarker } from "@/api/index.js";
export default {
  props: {},
  data() {
    return {
      a: this.$route.params.id,
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
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 30em;
  font-size: 0.8rem;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;

  #header {
    display: flex;
    height: 3rem;
    line-height: 3rem;
    border-bottom: 1px solid #9c9c9c;

    > div {
      &:nth-child(1) {
        font-size: 1.4rem;
        margin-right: 2rem;
      }
    }
  }

  #body {
    > h3 {
      margin: 10px 0;
    }
    li {
      margin: 30px 0;
      margin-bottom: 60px;

      p {
        margin: 20px 0;
        p {
          margin: 20px 0;
        }
      }
    }
    img {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>
