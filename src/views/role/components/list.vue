<template>
  <div class="list">
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {reqRoleDel} from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  components: {
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  mounted() {
    this.getList();
  },
  watch: {},
  methods: {
    ...mapActions({
      getList: "role/reqList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqRoleDel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successMsg("删除成功");
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