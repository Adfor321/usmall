<template>
  <div class="list">
    <el-table :data="adminList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :page-size="adminSize"
      :total="adminAll"
      @current-change="pages"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqAdminAll, reqAdminList, reqAdminOne,reqAdminDel } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  components: {},
  data() {
    return {
      change:0
    };
  },
  computed: {
    ...mapGetters({
      adminList: "admin/list",
      adminAll: "admin/all",
      adminSize: "admin/size",
    }),
  },
  mounted() {
    this.getAdminList();
    this.list();
  },
  watch: {
    
  },
  methods: {
    ...mapActions({
      getAdminList: "admin/reqList",
      //总数
      list: "admin/reqAllList",
      changePage: "admin/changePage",
    }),
    //删除
    del(id){
        reqAdminDel({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          successMsg("删除成功");
          if(this.list%this.adminSize===1&&this.change>0){
            console.log(1)
          }
          this.list();
          this.getAdminList();          
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    pages(a) {
      this.changePage(a);
      this.change = a
      this.getAdminList();
    },
    edit(id){
        this.$emit('edit',id)
    }
  },
};
</script>
<style scoped>
</style>