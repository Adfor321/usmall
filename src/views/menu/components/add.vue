<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @close="empty">
      <el-form :model="form" :rules="rules">
        <el-form-item label="菜单名称" label-width="80px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1" @change="one">目录</el-radio>
          <el-radio v-model="form.type" :label="2" @change="two">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="80px" v-else prop="url">
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuAdd, reqMenuOne, reqMenuUpdate } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-goods",
      ],
      urls: [
        "/home",
        "/menu",
        "/role",
        "/vip",
        "/sort",
        "/spec",
        "/goods",
        "/lunbo",
        "/kill",
        "/admin",
        "/index"
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        url: [
            { required: true, message: '菜单地址不能为空', trigger: 'change' }
          ],
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      getList: "menu/reqList",
    }),
    cancle() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    closeDiv() {
      this.empty();
    },
    add() {
      if (!this.form.title) {
        warringMsg("菜单名不能为空");
        return;
      }else if(!this.form.url){
        warringMsg("菜单地址不能为空");
        return;
      }
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successMsg(res.data.msg);
          this.info.show = false;
          this.empty();
          this.getList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    //获取一个数据
    getone(id) {
      reqMenuOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    one() {
      this.form.icon = "";
      this.form.url = "";
    },
    two() {
      this.form.icon = "";
      this.form.url = "";
    },
    //修改
    update() {
      if (!this.form.title) {
        warringMsg("菜单名不能为空");
        return;
      }else if(!this.form.url){
        warringMsg("菜单地址不能为空");
        return;
      }
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successMsg(res.data.msg);
          this.info.show = false;
          this.empty();
          this.getList();
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