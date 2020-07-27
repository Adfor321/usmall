import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
          name:'菜单列表',
          component: () => import('@/views/menu/menu.vue'),
        },
        {
          path: 'kill',
          name:'限时列表',
          component: () => import('@/views/kill/kill.vue'),
        },
        {
          path: 'vip',
          name:'会员列表',
          component: () => import('@/views/vip/vip.vue'),
        },
        {
          path: 'admin',
          name:'管理员列表',
          component: () => import('@/views/admin/admin.vue'),
        },
        {
          path: 'goods',
          name:'商品列表',
          component: () => import('@/views/goods/goods.vue'),
        },
        {
          path: 'role',
          name:'角色列表',
          component: () => import('@/views/role/role.vue'),
        },
        {
          path: 'sort',
          name:'分类列表',
          component: () => import('@/views/sort/sort.vue'),
        },
        {
          path: 'spec',
          name:'规格列表',
          component: () => import('@/views/spec/spec.vue'),
        },
        {
          path: 'lunbo',
          name:'轮播列表',
          component: () => import('@/views/lunbo/lunbo.vue'),
        },
      ]
    },
  ]
})
