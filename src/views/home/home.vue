<template>
  <div class="home">
    <el-container>
      <el-aside width="150px">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#20222a"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
            >
              <el-menu-item index="/home">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>首页</span>
                </template>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item index="/home/menu">菜单管理</el-menu-item>
                <el-menu-item index="/home/role">角色管理</el-menu-item>
                <el-menu-item index="/home/admin">管理员管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>商城管理</span>
                </template>
                <el-menu-item index="/home/sort">商品分类</el-menu-item>
                <el-menu-item index="/home/spec">商品规格</el-menu-item>
                <el-menu-item index="/home/goods">商品管理</el-menu-item>
                <el-menu-item index="/home/vip">会员管理</el-menu-item>
                <el-menu-item index="/home/lunbo">轮播图管理</el-menu-item>
                <el-menu-item index="/home/kill">秒杀活动</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="username">
            <span>{{username}}</span>
            <el-button type="primary" round>退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { successMsg } from "@/utils/alter";
import { reqAdminLogin } from "@/utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      username:'login/username'
    })
  },
  watch: {},
  mounted(){
    
  },
  methods: {
    ...mapActions({
      reqAdminLogin:'login/reqAdminLogin'
    })
  },
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
  height: 100vh;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-header {
  background: #b3c0d1;
}
.el-menu {
  background-color: #20222a;
  border-right: none;
  overflow-y: hidden;
  overflow-x: hidden;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: #1a1b22;
}
.el-submenu__title:hover {
  background: #1a1b22;
}
.username {
  height: 100%;
  line-height: 60px;
  float: right;
}
.view{
  margin-top: 20px;
}
</style>