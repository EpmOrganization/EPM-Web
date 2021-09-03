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
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/403'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
    // 默认跳转到部门管理页面
    redirect: '/deptlist',
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
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/system/role/list'),
        meta: { title: '角色管理' }
      },
      // 新增角色
      {
        path: 'roleadd',
        name: 'roleadd',
        component: () => import('@/views/system/role/add'),
        meta: { title: '新增角色' },
        hidden: true
      },
      // 编辑角色
      {
        path: 'roleedit',
        name: 'roleedit',
        component: () => import('@/views/system/role/add'),
        meta: { title: '角色编辑' },
        hidden: true
      }
    ]
  },
  {
    path: '/work',
    component: Layout,
    meta: { title: '工作记录管理', icon: 'el-icon-s-tools' },
    redirect: '/working',
    children: [{
      path: 'working',
      name: 'working',
      component: () => import('@/views/work/working'),
      meta: { title: '工作记录' }
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
