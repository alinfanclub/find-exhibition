<template>
  <div id="makeMarker">
    <h3>장소 정보 입력</h3>
    <form @submit.prevent="save()" enctype="multipart/form-data">
      <div class="addFile">
        <input type="file" @change="onChange" id="postImage" />
        <img
          :src="uploadImageFile"
          alt=""
          srcset=""
          v-if="uploadImageFile"
          class="img-box"
        />
        <label for="postImage" id="postImageLabel" v-else>사진추가</label>
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          v-model="title"
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="mainText"
        ></textarea>
      </div>
      <button @keydown="enter">저장</button>
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
      // const fd = new FormData();
      // fd.append("postImage", document.querySelector("#postImage").files[0]);
      // fd.append("place_name", this.title);
      // fd.append("lat", localStorage.la);
      // fd.append("lng", localStorage.ma);
      // fd.append("contents", this.mainText);

      const fd = {
        title: this.title,
        contents: this.mainText,
      };
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
form {
  > div {
    margin-bottom: 1.5rem;
    width: 100%;

    input {
      width: 100%;
      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.addFile {
  position: relative;
  width: 100%;
  min-height: 20rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  #postImage {
    display: none;
  }
  #postImageLabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5rem;
    transition: 0.3s;
    border-radius: 8px;

    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
  .img-box {
    max-width: 100%;
  }
}
</style>
