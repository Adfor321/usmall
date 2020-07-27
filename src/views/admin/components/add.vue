<template>
  <div class="add">
    <el-dialog title="添加管理员" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqAdminAdd, reqAdminOne, reqAdminEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
      adminSize: "admin/size",
    }),
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.getRoleList();
    }
  },
  watch: {},
  methods: {
    ...mapActions({
      getRoleList: "role/reqList",
      getAdminList: "admin/reqList",
      reqAllList: "admin/reqAllList",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqAdminAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successMsg(res.data.msg);
          this.info.show = false;
          this.empty();
          this.getAdminList();
          this.reqAllList()
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    reqOne(id) {
      reqAdminOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    
    //修改
    update() {
      reqAdminEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successMsg('修改成功');
          this.cancel();
          this.empty();
          this.getAdminList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>