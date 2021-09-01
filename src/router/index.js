import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

// 系统路由
export const systemRoutes = [
  {
    // 路径
    path: '/login',
    // Vue组件路径
    component: () => import('@/views/login/index'),
    hidden: true
  }
]
// 业务路由
export const businessRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '我的工作台', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    redirect: '/systemlist',
    children: [
      {
        path: 'deptlist',
        name: 'deptlist',
        component: () => import('@/views/system/department/list'),
        meta: { title: '部门管理' }
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/system/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'menulist',
        name: 'menulist',
        component: () => import('@/views/system/menu/list'),
        meta: { title: '菜单管理' }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...systemRoutes, ...businessRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
