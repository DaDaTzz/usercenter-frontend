<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "@/plugins/MyAxios";
import {useRouter} from "vue-router";

const router = useRouter()

const userList = ref([])

const columns = ref([{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '昵称',
  dataIndex: 'nickname',
  key: 'nickname',
}, {
  title: '账号',
  dataIndex: 'loginAccount',
  key: 'loginAccount',
  fixed: 'left'
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '简介',
  dataIndex: 'profile',
  key: 'profile',
}, {
  title: '密码',
  dataIndex: 'loginPassword',
  key: 'loginPassword',
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '标签',
  dataIndex: 'tags',
  key: 'tags',
}, {
  title: '状态',
  dataIndex: 'states',
  key: 'states',
}, {
  title: '头像',
  dataIndex: 'profilePhoto',
  key: 'profilePhoto',
}, {
  title: '权限',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '标签',
  dataIndex: 'tags',
  key: 'tags',
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
}, {
  title: '更新时间',
  dataIndex: 'updateTime',
  key: 'updateTime',
}, {
  title: "查看",
  key: "查看",
  dataIndex: "key",
  align: "center",
  slots: {customRender: "name"},//绑定插槽
},])

const current = ref(1);
const defaultPageSize = ref(10);
const total = ref()

/**
 * 换页
 * @param e
 */
const handlePageChange = (e) => {
  //console.log(e)
  pagination.value = e
  myAxios.get("/user/list", {
    params: {
      current: current.value,
      pageSize: defaultPageSize.value,
    }
  }).then(function (response) {
    if (response.data.code === 200) {
      userList.value = response.data.data
      current.value = response.data.data.current;
      defaultPageSize.value = response.data.data.pageSize;
      total.value = response.data.data.total;
      console.log(response.data.data)
    } else {
      alert("数据加载失败，" + response.data.description)
    }
  }).catch(function (error) {
    console.log(error);
  });
}

/**
 * 分页配置
 */
const pagination = ref({
  // size: 'large',
  current: 1,
  pageSize: 10,
  total: 0,
  //pageSizeOptions: ['10', '20', '30'], // 可选的页面显示条数
  showTotal: (total, range) => {
    return range[0] + '-' + range[1] + ' 共' + total + '条'
  }, // 展示每页第几条至第几条和总数
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: true, // 是否可以快速跳转至某页
  showSizeChanger: true // 是否可以改变pageSize
})

onMounted(() => {
  handlePageChange();
})

/**
 * 跳转到编辑页面
 */
const updateUser = (e) => {
  router.push({
    path: "/user/edit",
    query: e
  })
}

/**
 * 删除
 */
const deleteUser = (e) => {
  myAxios.post("/user/delete", {
    id: e
  }).then(function (response) {
    if (response.data.code === 200 && response.data.data === true) {
      alert("删除成功！");
      location.reload();
    } else {
      alert("删除失败，" + response.data.description);
    }
  }).catch(function (error) {
    console.log(error);
  });
}


/**
 * 新增用户
 */
const addUser = () => {
  router.push("/user/add")
}

const searchText = ref('')
/**
 * 条件搜索
 */
const onSearch = () => {
  myAxios.get("/user/getById", {
    params: {
      id: searchText.value,
    }
  }).then(function (response) {
    if (response.data.code === 200) {
      // TODO 赋值报错！
      //userList.value = response.data.data
      console.log(response.data.data)
    } else {
      alert("暂无数据，" + response.data.description)
    }
  }).catch(function (error) {
    console.log(error);
  });
}


</script>

<template>
  <a-button type="primary" ghost @click="addUser">新增用户</a-button>
  <a-input-search
      v-model:value="searchText"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
  />
  <a-table id="list" table-layout="fixed" :columns="columns" :data-source="userList" :pagination="pagination">
    <template #name="{ record }">
      <a-button type="primary" ghost @click="updateUser(record)">编辑</a-button>
      <a-button type="primary" ghost @click="deleteUser(record.id)">删除</a-button>
    </template>
  </a-table>

</template>

<style scoped>


</style>