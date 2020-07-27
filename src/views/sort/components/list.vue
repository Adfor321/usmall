<template>
<div class='list'>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgs+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
import { reqSortDel} from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";

export default {
components: {},
data() {
return {}
},
computed: {
    ...mapGetters({
      list: "sort/list",
    }),
},
watch: {},
methods: {
...mapActions({
      getList: "sort/reqList",
    }),
    edit(id){
        this.$emit('edit',id)
    },
    del(id){
        console.log(id)
        reqSortDel({id:id}).then(res=>{
            if(res.data.code === 200){
                successMsg(res.data.msg)
                this.getList()
            }else{
                warringMsg(res.data.msg)
            }
        })
    }
},
mounted() {
    this.getList();
  },
}
</script>
<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>