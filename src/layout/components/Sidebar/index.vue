<template>
  <div class="cantant">
    <div class="logo">
      <img
        src="@/assets/logo.png"
        alt=""
      >
      <span v-if="logotitle">企业资源管理</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'role'
    ]),
    routes() {
      const options = JSON.parse(JSON.stringify(this.$router.options.routes))
      // 注释掉的是动态获取权限
      //   const hblist = []

      //   const ywlist = options.filter(item => {
      //     if (!item.hidden && item.path !== '/') {
      //       return item
      //     } else {
      //       hblist.push(item)
      //     }
      //   })

      //   // 菜单权限
      //   const rolelist = []
      //   this.$store.state.user.role.map(v => {
      //     if (v.type === 1) {
      //       rolelist.push(v.value)
      //     }
      //   })
      //   const filterrole = function(arr, path) {
      //     arr.map((item, index) => {
      //       if (path) {
      //         if (!rolelist.includes(path + '/' + item.path)) {
      //           item.hidden = true
      //         }
      //       } else {
      //         if (!rolelist.includes(item.path)) {
      //           item.hidden = true
      //         }
      //       }
      //       if (item.children && item.children.length) {
      //         filterrole(item.children, item.path)
      //       }
      //     })
      //   }
      //   filterrole(ywlist, false)
      //   return [...hblist, ...ywlist]
      return options
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    logotitle() {
      return this.$store.state.settings.logotitle
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.cantant{
  .logo{
    height: 50px;
    display: flex;
    align-items: center;
    img{
      margin: 0 10px;
    }
    span{
      color: #fff;
      font-size: 18px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
  .scrollbar  {
      height: calc(100% - 60px);
  }
 }
</style>
