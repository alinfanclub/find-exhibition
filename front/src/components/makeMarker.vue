<template>
  <div id="makeMarker">
    <h3>장소 정보 입력</h3>
    <form @submit.prevent="save()" enctype="multipart/form-data">
      <input type="file" @change="onChange" id="postImage" />
      <div>
        <img
          :src="uploadImageFile"
          alt=""
          srcset=""
          v-if="uploadImageFile"
          class="img-box"
        />
        <div v-else class="img-box img-box-before">사진 자리</div>
      </div>
      <input type="text" name="" id="" v-model="title" />
      <textarea name="" id="" cols="30" rows="10" v-model="mainText"></textarea>
      <button>저장</button>
    </form>
  </div>
</template>

<script>
import { createMarker } from "@/api/index.js";
export default {
  data() {
    return {
      title: "",
      mainText: "",
      uploadImageFile: "",
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
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.uploadImageFile = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../css/upload.css");
.img-box {
  width: 15rem;
  height: 15rem;
  margin: 0 auto;
}
</style>
