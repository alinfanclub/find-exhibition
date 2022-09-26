<template>
  <div id="Infocontainer">
    <header>
      <div>
        <router-link to="/">
          <h1>RecordMap</h1>
        </router-link>
        <div class="btns">
          <button @click="deleteA(dataID)">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
          <button @click="editPost(dataID)">
            <ion-icon name="hammer-outline"></ion-icon>
          </button>
        </div>
      </div>
    </header>
    <body>
      <div v-for="data in this.$store.state.markersSpace" :key="data">
        <div v-if="data._id == this.$route.params.id">
          <div class="img-box">
            <img :src="getSrc(data.postImage)" class="data-img" />
          </div>
          <div>
            {{ data.place_name }}
          </div>
          <div>
            {{ data.contents }}
          </div>
          <small>{{ data.createAt }}</small>
          <img
            :src="this.$store.state.markersSpace.postImage"
            alt=""
            srcset=""
          />
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
      if (confirm("삭제 하시겠나요?")) {
        try {
          await deleteMarker(id);
        } catch (error) {
          console.log(error);
        }
        // this.$store.dispatch("FETCH_MARKERS_SPAC");
        this.$router.push("/space");
      }
    },
    editPost(id) {
      this.$router.push("/edit/" + id);
    },
    getSrc(data) {
      // require()으로 묶어줌.
      return require("../assets/" + data);
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
    border-bottom: 1px solid #9c9c9c;
    margin-bottom: 50px;
    padding: 0.5rem;
    > div {
      max-width: 700px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      width: 100%;
      margin: 0 auto;

      .btns {
        display: flex;
        align-items: center;

        button {
          background-color: #fff;
          border: none;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin: 0 5px;
        }
      }
    }
  }
  body {
    text-align: center;
    margin: 0 auto;

    .data-img {
      max-width: 400px;
      width: 70%;
      height: 70%;
      background-color: #333;
    }

    .img-box {
      width: 15rem;
      height: 15rem;
      margin: 0 auto;
      border: 1px solid #ddd;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
