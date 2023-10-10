<script setup lang="ts">
import myAxios from "@/plugins/MyAxios";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const loginAccount = ref('');
const loginPassword = ref('');


const onSubmit = () => {
  myAxios.post("/user/login", {
    loginAccount: loginAccount.value,
    loginPassword: loginPassword.value,
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === 200) {
      localStorage.setItem("token", response.data.message)
      router.push("/user/list")
    } else {
      alert("登录失败，" + response.data.description)
    }
  }).catch(function (error) {
    console.log(error);
  });

}


</script>

<template>
  登录
  <a-form id="Index-Page">
    <a-form-item label="账号">
      <a-input v-model:value="loginAccount"/>
    </a-form-item>
    <a-form-item label="密码">
      <a-input-password v-model:value="loginPassword"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
#Index-Page {
  max-width: 300px;
  margin: 0 auto;
}

</style>