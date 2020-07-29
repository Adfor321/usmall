import { reqGoodsList, reqGoodsAll } from '@/utils/request'
const state = {
    list: [],
    size: 2,
    page: 1,
    all: 0,
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
    reqList(context, bool) {
        let params = {}
        if (bool) {
            params = {}
        } else {
            params = {
                size: context.state.size,
                page: context.state.page
            }
        }
        reqGoodsList(params).then(res => {
            if (res.data.list.length == 0 && context.state.page > 1) {
                context.commit('changePage', context.state.page - 1)
                context.dispatch('reqList')
                return
            }
            context.commit('changeList', res.data.list)
        })
    },
    //获取总数
    reqAllList(context) {
        reqGoodsAll().then(res => {
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