<template>
  <div id="makeMarker">
    <h3>장소 정보 입력</h3>
    <form @submit.prevent="edit(dataID)">
      <input type="text" name="" id="" v-model="title" />
      <textarea name="" id="" cols="30" rows="10" v-model="mainText"></textarea>
      <div class="main-container">
        <div class="room-deal-information-container">
          <div class="room-deal-information-title">사진 등록</div>
          <input type="file" id="postImage" accept-charset="UTF-8" />
        </div>
      </div>
      <button>수정</button>
    </form>
  </div>
</template>

<script>
import { editMarker } from "@/api/index.js";
export default {
  data() {
    return {
      imageUrl: "",
      files: [], //업로드용 파일
      filesPreview: [],
      uploadImageIndex: 0,
      // 이미지 업로드를 위한 변수
      sendData: [],
      title: "",
      mainText: "",
      imgName: [],
      dataID: this.$route.params.id,
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("FETCH_MARKERS_SPACE");
    this.setData();
  },
  methods: {
    // ! 에딧 -> 이미지가 있으면 이미지가 있는 폼을 보여주고,  이미지가 없다고 이미지를 삽입하는 폼을 보여준다. -> 이미지 있는 폼에서 이미지 삭제버튼 생성하고 누르면 이미지 삭제와 동시에 이미지가 없는 폼을 if(this.$store.state.markersSpace.postImage == null){이미지 삽입 하는 폼을 보여준다는 식으로 진행하면 어떨까}
    async edit(id) {
      const fd = new FormData();
      fd.append("id", id);
      fd.append("postImage", document.querySelector("#postImage").files[0]);
      fd.append("place_name", this.title);
      fd.append("contents", this.mainText);
      await editMarker(fd);
      this.$router.push("/space/" + this.$route.params.id);
    },
    setData() {
      // this.title = this.$store.state.markersSpace[0].place_name
      for (let i = 0; i < this.$store.state.markersSpace.length; i++) {
        if (this.$store.state.markersSpace[i]._id == this.$route.params.id) {
          this.title = this.$store.state.markersSpace[i].place_name;
          this.mainText = this.$store.state.markersSpace[i].contents;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("../css/upload.css");
</style>
