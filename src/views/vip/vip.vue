<template>
<div class='vip'>
    <edit :info='info' ref="edit"></edit>
    <list @edit='edit($event)'></list>
</div>
</template>

<script>
import edit from './components/edit'
import list from './components/list'
export default {
components: {
    edit,
    list
},
data() {
return {
    info:{
        show:false
    }
}
},
computed: {},
watch: {},
methods: {
    edit(id){
        this.info.show = true
        this.$refs.edit.getOne(id)
    }
},
}
</script>
<style scoped>

</style>