<template>
  <div class="lunbo">
      <el-button type="primary" @click="add">添加</el-button>
      <add :info='info'></add>
      <list></list>
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
        info:{
            show:false
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
      add(){
          this.info.show = true
      }
  },
};
</script>
<style scoped>
</style>