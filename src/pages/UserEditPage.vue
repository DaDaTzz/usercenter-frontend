<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "@/plugins/MyAxios";

const route = useRoute()
const router = useRouter()

const user = ref(route.query)

const onSubmit = () => {
  console.log(user.value)
  myAxios.post("/user/update", user.value).then(function (response) {
    if (response.data.code === 200 && response.data.data === true) {
      alert("修改成功")
      router.back()
      //router.push("/user/list")
    } else {
      alert("修改失败，" + response.data.description)
    }
  }).catch(function (error) {
    console.log(error);
  });
}

</script>

<template>
  <a-form id="UserEdit-Page">
    <a-form-item label="账号">
      <a-input v-model:value="user.loginAccount"/>
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="user.loginPassword"/>
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="user.nickname"/>
    </a-form-item>
    <a-form-item label="电话">
      <a-input v-model:value="user.phone"/>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="user.email"/>
    </a-form-item>
    <a-form-item label="头像">
      <a-input v-model:value="user.profilePhoto"/>
    </a-form-item>
    <a-form-item label="标签">
      <a-input v-model:value="user.tags"/>
    </a-form-item>
    性别：
    <a-radio-group v-model:value="user.sex">
      <a-radio :value="'1'">男</a-radio>
      <a-radio :value="'0'">女</a-radio>
    </a-radio-group>
    <br>
    权限：
    <a-radio-group v-model:value="user.type">
      <a-radio :value="'0'">用户</a-radio>
      <a-radio :value="'1'">管理员</a-radio>
    </a-radio-group>
    <br>
    状态：
    <a-radio-group v-model:value="user.states">
      <a-radio :value="'0'">正常</a-radio>
      <a-radio :value="'1'">封禁</a-radio>
    </a-radio-group>
    <br>
    介绍：
    <a-textarea v-model:value="user.profile" placeholder="Basic usage" :rows="4"/>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
#UserEdit-Page {
  max-width: 300px;
  margin: 0 auto;
}
</style>