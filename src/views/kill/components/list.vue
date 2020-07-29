<template>
<div class='list'>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="title" label="活动名称" width="150"></el-table-column>
      <el-table-column label="状态" width='150'>
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqKillDel} from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
components: {},
data() {
return {}
},
computed: {
    ...mapGetters({
        list:'kill/list'
    })
},
mounted(){
    this.reqlist()
},
watch: {},
methods: {
...mapActions({
        reqlist:'kill/reqList'
    }),
    edit(id){
        this.$emit('edit',id)
    },
    del(id){
        reqKillDel({id:id}).then(res=>{
            if(res.data.code === 200){
                successMsg('删除成功')
                this.reqlist()
            }else{
                warringMsg(res.data.msg)
            }
        })
    }
},
}
</script>
<style scoped>

</style>