<template>
  <div>
    <el-container class="page">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>


          <el-submenu v-show="user.menus[index].children" :index="item.id+''" v-for="(item,index) in user.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(i) in item.children" :key="i.title" :index="'/home'+i.url">{{i.title}}</el-menu-item>
          </el-submenu>

          <!-- 没有目录，只有菜单 -->
         <el-menu-item v-show="!user.menus[index].children"  :index="'/home'+i.url" v-for="(i,index) in user.menus" :key="i.title">
            {{i.title}}
          </el-menu-item>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item  :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
            <div id="main" style="width: 700px;height:500px;" v-if='!$route.name'></div>
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
var echarts = require('echarts');

export default {
  components: {
    
  },
  data() {
    return {
      shows:true
    };
  },
  computed: {
    ...mapGetters({
      user: "login/user",
    }),
  },
  watch: {},
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["周一","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
  },
  methods: {
    hasChildren() {
      return this.user.menus[0].chi
      ldren ? true : false;
    },
    ...mapActions({
      reqLogin: "login/reqLogin",
    }),
    exit() {
      this.reqLogin(null);
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
.view {
  padding-top: 20px;
}
</style>