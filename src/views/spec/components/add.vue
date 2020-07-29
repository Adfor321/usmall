<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @close="empty">
      <el-form :model="form" ref="form" :rules="rules" label-width="80px" class="demo-dynamic">
        <el-form-item label="规格名称" prop="specsname">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in attrs" label="规格属性" :key="item.key" class="wen">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" @click="addDomain" class="new" v-if="index===0" ref="tree">新增规格</el-button>
          <el-button @click.prevent="removeDomain(item)" type="danger" class="del" v-else>删 除</el-button>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" v-if="info.isAdd">添加</el-button>
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecAdd, reqSpecOne, reqSpecEdit } from "@/utils/request";
import { successMsg, warringMsg } from "@/utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        id:'',
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules:{
        specsname:[{ required: true, message: '请输入规格名称', trigger: 'blur' }],
      },
      attrs: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    submit() {
      let arr = [];
      for (let i in this.attrs) {
        if (this.attrs[i]) {
          arr.push(this.attrs[i].value);
        }
      }
      if (this.attrs.some((item) => item.value == "")) {
        warringMsg("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(arr);
      reqSpecAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqList();
          this.reqAllList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    //取消清空
    empty() {
      this.form = {
        id:'',
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrs = [
        {
          value: "",
        },
      ];
    },
    //编辑前清空
    empty1() {
      this.form = {
        id:'',
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrs = [];
    },
    ...mapActions({
      reqList: "spec/reqList",
      reqAllList: "spec/reqAllList",
    }),
    //获取一个
    getOne(id) {
      reqSpecOne({ id: id }).then((res) => {
        this.empty1();
        this.form = res.data.list[0];
        this.form.attrs = res.data.list[0].attrs;
        let a = JSON.parse(this.form.attrs);
        this.form.arrts = JSON.parse(this.form.attrs)[0];
        for (let i = 0; i < a.length; i++) {
          this.attrs.push({
            value: a[i],
          });
        }
      });
    },
    //修改
    update() {
      let arr = [];
      for (let i in this.attrs) {
        if (this.attrs[i]) {
          arr.push(this.attrs[i].value);
        }
      }
      this.form.attrs = JSON.stringify(arr);
      reqSpecEdit({id:this.form.id,specsname:this.form.specsname,attrs:this.form.attrs,status:this.form.status}).then((res) => {
        if (res.data.code === 200) {
          successMsg(res.data.msg);
          this.empty();
          this.cancel();
          this.reqList();
          this.reqAllList();
        } else {
          warringMsg(res.data.msg);
        }
      });
    },
    cancel() {
      this.info.show = false;
    },
    removeDomain(item) {
      var index = this.attrs.indexOf(item);
      if (index !== -1) {
        this.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.attrs.push({
        value: "",
        key: Date.now(),
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  
  watch: {},
};
</script>
<style scoped>
.wen {
  width: 80%;
  position: relative;
}
.new {
  position: absolute;
  width: 126px;
}
.del {
  position: absolute;
  width: 126px;
}
</style>