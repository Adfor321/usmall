import {reqAdminLogin} from '@/utils/request'
const state={
    username:""
}
const mutations={
    changeList(state,name){
        state.username = name
    }
}
const actions = {
    reqAdminLogin(context){
        reqAdminLogin().then(res=>{
            context.commit('changeList',res.data.list.username)
        })
    },
    reqLogin(context,name){      
            context.commit('changeList',name)
    },
}
const getters = {
    username(state){
        return state.username
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}