<template>
  <div class="add">
    <el-dialog width="60%" :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form" ref="forms" :rules="rules">
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
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondeArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px" prop="market_price">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <div class="box">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="changeImg"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px" prop="specsid">
          <el-select v-model="form.specsid" @change="specArr()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="80px" prop="specsattr">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in specArrs" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import { reqGoodsAdd, reqGoodsOne, reqGoodsEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      editor: null,
      secondeArr: [],
      specArrs: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        description: "",
        specsid: "",
        specsattr: [],
        ishot: 1,
        isnew: 1,
        img: null,
        status: 1,
      },
      imageUrl: "",
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      specList: "spec/list",
      //一级
      sortList: "sort/list",
    }),
  },
  mounted() {
    if (this.sortList.length == 0) {
      this.reqSortList();
    }
    //获取所有的规格数据
    this.reqSpecList(true);
  },
  watch: {},
  methods: {
    ...mapActions({
      reqSpecList: "spec/reqList",
      reqSortList: "sort/reqList",
      reqGoodsList: "goods/reqList",
      reqAllList: "goods/reqAllList",
    }),
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    add() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      reqGoodsAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqGoodsList();
          this.reqAllList();
        } else {
          successMsg(res.data.msg);
        }
      });
    },
    empty() {
      (this.editor = null),
        (this.secondeArr = []),
        (this.specArrs = []),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: 0,
          market_price: 0,
          description: "",
          specsid: "",
          specsattr: [],
          ishot: 1,
          isnew: 1,
          img: null,
          status: 1,
        });
      this.imageUrl = "";
    },
    getOne(id) {
      reqGoodsOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgs + res.data.list.img;
        this.changeFirst(true);
        this.specArr(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      reqGoodsEdit(this.form).then((res) => {
        successMsg(res.data.msg);
        this.empty();
        this.cancel();
        this.reqGoodsList();
        this.reqAllList();
      });
    },
    cancel() {
      this.info.show = false;
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
    specArr(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.specArrs = JSON.parse(this.specList[index].attrs);
      if (!bool) {
        this.form.specsattr = [];
      }
    },
  },
};
</script>
<style scoped>
.box {
  border: 1px dashed #d9d9d9;
  width: 178px;
  height: 178px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>