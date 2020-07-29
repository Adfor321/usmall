<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-form" :rules="rules">
        <div class="names">
          <el-form-item label="活动名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </div>
        <div class="names">
          <el-form-item label="活动期限" class="times" >
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="一级分类" label-width="80px" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in sortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select v-model="form.second_cateid" @change="changeSconed()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondeArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px" prop="goodsid">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondeArrs"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqKillAdd, reqKillOne, reqKillEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      value1: [new Date(), new Date()],
      secondeArr: [],
      secondeArrs: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      //一级
      sortList: "sort/list",
      specList: "spec/list",
      goodsList: "goods/list",
    }),
  },
  mounted() {
    if (this.sortList.length == 0) {
      this.reqSortList();
    }
    //获取所有的规格数据
    this.reqSpecList(true);
    this.reqGoodsList(true);
  },
  watch: {},
  methods: {
    ...mapActions({
      reqSpecList: "spec/reqList",
      reqSortList: "sort/reqList",
      reqGoodsList: "goods/reqList",
      reqAllList: "goods/reqAllList",
      reqlist: "kill/reqList",
    }),
    getOne(id) {
      reqKillOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.value1 = [
          new Date(Number(this.form.begintime)),
          new Date(Number(this.form.endtime)),
        ];
        this.changeSconed(true);
        this.changeFirst(true);
      });
    },
    changeSconed(bool) {
      for (let i in this.goodsList) {
        if (this.goodsList[i].second_cateid == this.form.second_cateid) {
          this.secondeArrs.push(this.goodsList[i]);
        }
      }
      if (!bool) {
        this.form.goodsid = "";
      }
    },
    changeFirst(bool) {
      let index = this.sortList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondeArr = this.sortList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    update() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqKillEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqlist();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        value1: [new Date(), new Date()],
        secondeArr: [],
        secondeArrs: [],
        form: {
          title: "",
          begintime: "",
          endtime: "",
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1,
        },
      };
    },
    cancel() {
      this.empty();
      this.info.show = false;
    },
    add() {
      if(!this.form.title){
        warringMsg('活动名称不能为空');
        return
      }
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqKillAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqlist();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.names {
  margin-left: -19px;
}
</style>