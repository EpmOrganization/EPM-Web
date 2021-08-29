/* 路由守卫 */
import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// 导入权限
import { getToken } from '@/utils/authentication' // get token from cookie

const whiteList = ['/login']

// 路由守卫，在路由跳转前进行判断
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  // 获取token
  const hasToken = getToken()
  // 如果有值
  if (hasToken) {
    // 如果要跳转的页面是登录页
    if (to.path === '/login') {
      // 跳转到首页 redirect to home page
      next({ path: '/' })
    } else {
      console.log(hasToken)
    }
  } else {
    // 没有token值
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
