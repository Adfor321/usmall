<template>
  <div class="list">
    <el-table :data="specList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性">
          <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.attrs)" :key="item">{{item}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination class="page" background layout="prev, pager, next" :page-size="specSize" :total="specAll" @current-change="pages"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecDel } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      specList: "spec/list",
      specAll: "spec/all",
      specSize: "spec/size",
    }),
  },
  mounted(){
      this.reqList()
      this.reqAllList()
  },
  watch: {
  },
  methods: {
      ...mapActions({
          reqList:'spec/reqList',
          reqAllList:'spec/reqAllList',
          changePage:'spec/changePage',
      }),
      edit(id){
        this.$emit('edit',id)
      },
      pages(a){
        this.changePage(a);
        this.reqList()
        this.reqAllList();
      },
      del(id){
        reqSpecDel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successMsg("删除成功");
          this.reqList()
          this.reqAllList()        
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