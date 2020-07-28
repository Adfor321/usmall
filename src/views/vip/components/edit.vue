<template>
  <div class="add">
    <el-dialog title="修改会员" :visible.sync="info.show" @close="empty">
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.number="form.password"></el-input>
          <p>留空则不修改</p>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqVipOne,reqVipEdit } from "@/utils/request";
import { mapGetters, mapActions } from "vuex";
import { successMsg, warringMsg } from "@/utils/alter";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        id: "",
        nickname: "",
        password: "",
        status: 1,
      },
      pass:''
    };
  },
  computed: {
    ...mapGetters({
      vipList: "vip/list",
    }),
  },
  watch: {},
  methods: {
    empty() {
      this.form = {
        uid: "",
        id: "",
        nickname: "",
        password: "",
        status: 1,
      };
    },
    getOne(id) {
      reqVipOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.pass=this.form.password;
        this.form.password='';
      });
    },
    update(){
        if(this.form.password ==''){
            this.form.password = this.pass
        }
        reqVipEdit(this.form).then(res=>{
            if(res.data.code === 200){
                successMsg(res.data.msg)
                this.info.show = false
                this.empty()
            }else{
                warringMsg(res.data.msg)
            }
        })
    }
  },
};
</script>
<style scoped>
</style>