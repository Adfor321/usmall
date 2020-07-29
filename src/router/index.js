import Vue from 'vue'
import Router from 'vue-router'
import login from "../store/modules/login"
Vue.use(Router)

function goes(url){
  return login.state.user.menus_url.some(i=>i==url)
}
let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue'),
      children: [
        {
          path: 'menu',
          name: '菜单列表',
          component: () => import('@/views/menu/menu.vue'),
          beforeEnter(to, from, next) {
            goes('/menu') ? next() : next("/home")
          }
        },
        {
          path: 'kill',
          name: '限时列表',
          component: () => import('@/views/kill/kill.vue'),
          beforeEnter(to, from, next) {
            goes('/kill') ? next() : next("/home")
          }
        },
        {
          path: 'vip',
          name: '会员列表',
          component: () => import('@/views/vip/vip.vue'),
          beforeEnter(to, from, next) {
            goes('/vip') ? next() : next("/home")
          }
        },
        {
          path: 'admin',
          name: '管理员列表',
          component: () => import('@/views/admin/admin.vue'),
          beforeEnter(to, from, next) {
            goes('/admin') ? next() : next("/home")
          }
        },
        {
          path: 'goods',
          name: '商品列表',
          component: () => import('@/views/goods/goods.vue'),
          beforeEnter(to, from, next) {
            goes('/goods') ? next() : next("/home")
          }
        },
        {
          path: 'role',
          name: '角色列表',
          component: () => import('@/views/role/role.vue'),
          beforeEnter(to, from, next) {
            goes('/role') ? next() : next("/home")
          }
        },
        {
          path: 'sort',
          name: '分类列表',
          component: () => import('@/views/sort/sort.vue'),
          beforeEnter(to, from, next) {
            goes('/sort') ? next() : next("/home")
          }
        },
        {
          path: 'spec',
          name: '规格列表',
          component: () => import('@/views/spec/spec.vue'),
          beforeEnter(to, from, next) {
            goes('/spec') ? next() : next("/home")
          }
        },
        {
          path: 'lunbo',
          name: '轮播列表',
          component: () => import('@/views/lunbo/lunbo.vue'),
          beforeEnter(to, from, next) {
            goes('/lunbo') ? next() : next("/home")
          }
        },
      ]
    },
  ]
})
//登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
    return
  }
  if (login.state.user) {
    next()
    return
  }
  next('/')
})

export default router