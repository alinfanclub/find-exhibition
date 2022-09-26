<template>
  <div id="makeMarker">
    <h3>장소 정보 입력</h3>
    <form @submit.prevent="save()" enctype="multipart/form-data">
      <input type="text" name="" id="" v-model="title" />
      <textarea name="" id="" cols="30" rows="10" v-model="mainText"></textarea>
      <div class="main-container">
        <div class="room-deal-information-container">
          <div class="room-deal-information-title">사진 등록</div>
          <!-- <div class="room-picture-notice">
              <ul class="room-write-wrapper">
                <li>
                  사진은 가로로 찍은 사진을 권장합니다. (가로 사이즈 최소 800px)
                </li>
                <li>사진 용량은 사진 한 장당 10MB 까지 등록이 가능합니다.</li>
              </ul>
            </div> -->
          <input type="file" @change="onChange" id="postImage" />
        </div>
      </div>
      <button>저장</button>
    </form>
  </div>
</template>

<script>
import { createMarker } from "@/api/index.js";
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
      imagesArray: null,
      originalname: "",
    };
  },
  methods: {
    async save() {
      const fd = new FormData();
      fd.append("postImage", document.querySelector("#postImage").files[0]);
      fd.append("place_name", this.title);
      fd.append("lat", localStorage.la);
      fd.append("lng", localStorage.ma);
      fd.append("contents", this.mainText);
      await createMarker(fd);
      this.$router.push("/space");
      localStorage.clear();
    },
    saveT() {
      console.log("111");
    },
    onChange(event) {
      this.imagesArray = event.target.files[0];
      this.originalname = event.target.files[0].name;
      console.log(this.imagesArray.name);
      const fileInput = document.querySelector("#postImage");
      console.log(fileInput.files[0]);
    },
  },
};
</script>

<style scoped>
@import url("../css/upload.css");
</style>
