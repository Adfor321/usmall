import {reqAdminLogin} from '@/utils/request'
const state={
    user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null
}
const mutations={
    changeList(state,user){
        state.user = user
        sessionStorage.setItem("user",JSON.stringify(state.user))
    }
}
const actions = {
    reqAdminLogin(context){
        reqAdminLogin().then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    reqLogin(context,user){      
            context.commit('changeList',user)
    },
}
const getters = {
    user(state){
        return state.user
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}