<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px" prop="catename">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import { reqSortAdd, reqSortOne, reqSortEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
      rules:{
        catename:[{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      reqSortList: "sort/reqList",
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
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl=''
    },
    cancel() {
      this.info.show = false;
    },
    getOne(id) {
      reqSortOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgs + res.data.list.img;
      });
    },
    update() {
        reqSortEdit(this.form).then(res=>{
            if(res.data.code===200){
                successMsg(res.data.msg)
                this.empty();
                this.cancel();
                this.reqSortList()
            }else{
                warringMsg(res.data.msg)
            }
        })
    },
    add() {
      if(!this.form.catename){
        warringMsg('分类名称不能为空')
        return
      }else if(!this.form.img){
        warringMsg('图片必须添加')
        return
      }
      reqSortAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqSortList()
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