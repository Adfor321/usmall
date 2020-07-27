<template>
  <div class="lunbo">
    <el-button type="primary" @click="add">添加</el-button>
    <add :info="info" ref="add"></add>
    <list @edit="edit($event)"></list>
  </div>
</template>

<script>
import add from "./components/add";
import list from "./components/list";
export default {
  components: {
    add,
    list,
  },
  data() {
    return {
      info: {
        show: false,
        isAdd: true,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
    },
    edit(id){
      this.info.show = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id)
    }
  },
};
</script>
<style scoped>
</style>