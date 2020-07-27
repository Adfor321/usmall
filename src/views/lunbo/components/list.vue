<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgs+scope.row.img" alt />
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
import { reqBannerDel } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "lunbo/list",
    }),
  },
  watch: {},
  mounted() {
    this.reqList();
  },
  methods: {
    ...mapActions({
      reqList: "lunbo/reqList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqBannerDel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.reqList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
img {
  width: 100px;
}
</style>