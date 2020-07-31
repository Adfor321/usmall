<template>
  <div class="login">
    <div class="main">
      <el-row>
        <h2>登录</h2>
        <el-col :span="13">
          <el-input v-model="user.username" placeholder="请输入账号"></el-input>
        </el-col>
        <el-col :span="13">
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
        </el-col>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reqAdminLogin } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.homes()
  },
  computed: {
    ...mapGetters({
      users: "login/user",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      reqLogin: "login/reqLogin",
    }),
    homes(){
      if(this.users!=null){
        this.$router.push("/home/index");
      }
    },
    login() {
      reqAdminLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.reqLogin(res.data.list);
          this.$router.push("/home/index");
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #553443, #2f3d60);
  overflow: hidden;
}
h2 {
  margin-bottom: 10px;
}
.main {
  width: 500px;
  height: 300px;
  background: #fff;
  margin: 100px auto;
  box-shadow: 0 2px 4px rgba(0，0，0，.12) ，0 0 6px rgba(0，0，0，.04);
  border-radius: 10px;
}
.el-row {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-col {
  margin: 10px 0;
}
.el-button {
  width: 270px;
  font-size: 17px;
  margin-bottom: 30px;
}
</style>