<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules='rules'>
        <el-form-item label="角色名称" label-width="80px" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="menuList"
            :default-checked-keys="checkKey"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleAdd, reqRoleOne, reqRoleUpdate } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      checkKey: [],
      rules:{
        rolename:[{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getList();
    }
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      getList: "menu/reqList",
      getroleList: "role/reqList",
    }),
    cancel() {
      this.info.show = false;
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      if(!this.form.rolename){
        warringMsg('角色名不能为空');
        return
      }else if(!this.form.menus){
        warringMsg('必须选择一个权限');
        return
      }
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.cancel();
          this.empty();
          this.getroleList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },

    getRoleOne(id) {
      reqRoleOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.checkKey = JSON.parse(res.data.list.menus);
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      if(!this.form.rolename){
        warringMsg('角色名不能为空');
        return
      }
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg('修改成功');
          this.cancel();
          this.empty();
          this.getroleList();
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