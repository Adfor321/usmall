<template>
<div class='list'>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="商品编号" width="50"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="$imgs+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm='del(scope.row.id)'></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="all"
    ></el-pagination>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel} from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";

export default {
components: {},
data() {
return {}
},
computed: {
    ...mapGetters({
        list:'goods/list',
        all:'goods/all',
        size:'goods/size'
    })
},
watch: {},

methods: {
    ...mapActions({
        reqGoodsList:'goods/reqList',
        reqGoodsAll:'goods/reqAllList',
        changePage: "goods/changePage",
    }),
    edit(id){
        this.$emit('edit',id)
    },
    del(id){
        reqGoodsDel({id:id}).then(res=>{
            if(res.data.code===200){
                successMsg('删除成功')
                this.reqGoodsList();
                this.reqGoodsAll()
            }else{
                warringMsg(res.data.msg)
            }
        })
    },
    cPage(i){
        this.changePage(a);
      this.reqGoodsList();
    }
},
mounted(){
    this.reqGoodsList()
    this.reqGoodsAll()
},
}
</script>
<style scoped>
img{
    width: 100px;
}
</style>