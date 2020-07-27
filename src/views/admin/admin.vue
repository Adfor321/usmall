<template>
<div class='admin'>
    <el-button type="primary" @click='add'>添加</el-button>
    <add :info='info' ref="add"></add>
    <list @edit='edit($event)'></list>
</div>
</template>

<script>
import add from './components/add'
import list from './components/list'
export default {
components: {
    add,
    list
},
data() {
return {
    info:{
        show:false,
        title:'添加管理员',
        isAdd:true
    }
}
},
computed: {},
watch: {},
methods: {
    add(){
        this.info.show = true
        this.info.title='添加管理员'
        this.info.isAdd = true
    },
    edit(id){
        this.info.title='管理员修改'
        this.info.show = true
        this.info.isAdd = false
        this.$refs.add.reqOne(id)
    }
},
}
</script>
<style scoped>

</style>