import vue from 'vue';
import vuex from 'vuex';
vue.use(vuex);


import { state, mutations, getters } from './mutations'
import { actions } from './actions'
import menu from "./modules/menu"
import role from "./modules/role"
import admin from "./modules/admin"
import login from "./modules/login"
import spec from "./modules/spec"
import vip from "./modules/vip"
import sort from "./modules/sort"
import lunbo from "./modules/lunbo"
import goods from "./modules/goods"
import kill from "./modules/kill"
let store = new vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menu,
        role,
        admin,
        login,
        spec,
        vip,
        sort,
        lunbo,
        goods,
        kill
    }
})

export default store