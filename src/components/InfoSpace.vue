<template>
  <div id="Infocontainer">
    <div id="header">
      <div>{{ this.$store.state.spaceData.place_name }}</div>
      <div>{{ this.$store.state.spaceData.adress }}</div>
    </div>
    <div id="body">
      <h3>최근 전시</h3>
      <ul>
        <li v-for="list in this.$store.state.spaceData.exhibition" :key="list">
          <h4>{{ list.title }}</h4>
          <p>{{ list.date }}</p>
          <img :src="require(`../img/${list.detail.mainArt}`)" />
          <!-- <img src="../img/LeeupanSpace_main.png" alt="" /> -->
          <div>
            <details>
              <summary>더보기</summary>
              <p>작품수 : {{ list.detail.artNum }}</p>
              <p>장소 : {{ list.detail.artPlace }}</p>
              <p v-html="list.detail.artText"></p>
            </details>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  created() {
    const url = this.$route.params.id;
    console.log(this.$route.params.id);
    this.$store.dispatch("FETCH_DATA", url);
  },
};
</script>

<style scoped lang="scss">
#Infocontainer {
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 30em;
  width: 100%;
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
