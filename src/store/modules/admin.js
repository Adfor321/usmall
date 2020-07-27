import { reqAdminList, reqAdminAll } from '@/utils/request'
const state = {
    list: [],
    //总数
    all: 0,
    //一页的个数
    size: 3,
    //页数
    page: 1,
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeAll(state, num) {
        state.all = num;
    },
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    reqList(context) {
        const params = {
            size: context.state.size,
            page: context.state.page
        }
        
        reqAdminList(params).then(res => {
            if(!res.data.list&&context.state.page>1){
                context.commit('changeList', context.state.page-1)
                context.dispatch('reqList')
                return
            }
            context.commit('changeList', res.data.list)
        })
    },
    //获取总数
    reqAllList(context) {
        reqAdminAll().then(res => {
            context.commit('changeAll', res.data.list[0].total)
        })
    },
    changePage(context, page) {
        context.commit('changePage', page)
    }
}
const getters = {
    list(state) {
        return state.list
    },
    all(state) {
        return state.all
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}