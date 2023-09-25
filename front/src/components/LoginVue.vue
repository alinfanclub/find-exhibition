<template>
  <div>
    <form @submit.prevent="loginTo()">
      <div>
        <input type="email" name="" v-model="email" />
      </div>
      <div>
        <input type="password" name="" v-model="password" />
      </div>
      <div>
        <button>로그인</button>
      </div>
    </form>
    <button><router-link to="/signup">회원가입</router-link></button>
  </div>
</template>

<script>
import { login } from "@/api/regiser";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginTo() {
      const fd = {
        email: this.email,
        password: this.password,
      };
      await login(fd);
      this.$router.push("/space");
    },
  },
};
</script>

<style></style>
