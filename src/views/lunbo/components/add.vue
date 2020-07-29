<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules">
        <el-form-item label="标题" label-width="80px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
        <el-form-item label="状态" label-width="80px">
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
import { reqBannerAdd, reqBannerOne, reqBannerEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
      rules:{
        title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      reqList: "lunbo/reqList",
    }),
    changeImg(e) {
      if (e.size > 2 * 1024 * 1024) {
        warringMsg("上传的图片不能超过2M");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    cancel() {
      this.info.show = false;
    },
    getOne(id) {
      reqBannerOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgs + res.data.list.img;
      });
    },
    update() {
      reqBannerEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    add() {
      if(!this.form.title){
        warringMsg('标题不能为空')
        return
      }
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.cancel();
          this.empty();
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