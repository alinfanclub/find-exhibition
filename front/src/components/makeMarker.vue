<template>
  <div id="makeMarker">
    <h3>장소 정보 입력</h3>
    <form @submit.prevent="save()">
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
          <div class="room-file-upload-wrapper">
            <div
              v-if="!files.length"
              class="room-file-upload-example-container"
            >
              <div class="room-file-upload-example">
                <!-- <div class="room-file-image-example-wrapper">이미지</div>
                  <div class="room-file-notice-item">
                    실사진 최소 3장 이상 등록하셔야 하며, 가로사진을 권장합니다.
                  </div>
                  <div class="room-file-notice-item room-file-notice-item-red">
                    로고를 제외한 불필요한 정보(워터마크,상호,전화번호 등)가 있는
                    매물은 비공개처리됩니다
                  </div> -->
                <div class="room-file-notice-item room-file-upload-button">
                  <div class="image-box">
                    <label for="file">일반 사진 등록</label>
                    <input
                      type="file"
                      id="file"
                      ref="files"
                      @change="imageUpload"
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="file-preview-content-container">
              <div class="file-preview-container">
                <div
                  v-for="(file, index) in files"
                  :key="index"
                  class="file-preview-wrapper"
                >
                  <div
                    class="file-close-button"
                    @click="fileDeleteButton"
                    :name="file.number"
                  >
                    x
                  </div>
                  <img :src="file.preview" />
                </div>
                <div class="file-preview-wrapper-upload">
                  <div class="image-box">
                    <label for="file">추가 사진 등록</label>
                    <input
                      type="file"
                      id="file"
                      ref="files"
                      @change="imageAddUpload"
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    };
  },
  methods: {
    imageUpload() {
      console.log(this.$refs.files.files);

      //하나의 배열로 넣기
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          //이미지 업로드
          {
            //실제 파일
            file: this.$refs.files.files[i],
            //이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            //삭제및 관리를 위한 number
            number: i,
          },
        ];
        num = i;
        this.imgName.push({ img: this.$refs.files.files[i].name });
      }
      this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
      console.log(...this.files);
      // console.log(this.filesPreview);
    },

    imageAddUpload() {
      console.log(this.$refs.files.files);

      // this.files = [...this.files, this.$refs.files.files];
      //하나의 배열로 넣기c
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          //이미지 업로드
          {
            //실제 파일
            file: this.$refs.files.files[i],
            //이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            //삭제및 관리를 위한 number
            number: i + this.uploadImageIndex,
          },
        ];
        this.imgName.push({ img: this.$refs.files.files[i].name });
        num = i;
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1;

      console.log(this.files);
      // console.log(this.filesPreview);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute("name");
      this.files = this.files.filter((data) => data.number !== Number(name));
      // console.log(this.files);
    },

    async save() {
      const markerData = {
        place_name: this.title,
        lat: localStorage.la,
        lng: localStorage.ma,
        contents: this.mainText,
      };
      await createMarker(markerData);
      this.$router.push("/space");
      localStorage.clear();
    },
    saveT() {
      console.log("111");
    },
  },
};
</script>

<style scoped>
@import url("../css/upload.css");
</style>
