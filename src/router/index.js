import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    // 路由重定向
    redirect: '/home',
    // 子路由
    children: [{
      path: 'home',
      name: 'Home',
      // 组件
      component: () => import('@/views/home/index'),
      meta: { title: '我的工作台' }
    }]
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
