<template>
<div class='role'>
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
        isAdd:true,
        title:'添加角色'
    }
}
},
computed: {},
watch: {},
methods: {
    add(){
        this.info.show = true
        this.info.isAdd = true
        this.info.title = '添加角色'
    },
    edit(id){
        this.info.show = true
        this.info.title = '修改角色'
        this.info.isAdd = false
        this.$refs.add.getRoleOne(id)
    }
},
}
</script>
<style scoped>

</style>