<template>
  <div>
    <el-button
      type="primary"
      class="mb10"
      icon="el-icon-plus"
      @click="add"
    >
      添加角色
    </el-button>
    <table-page
      :table="table"
      :search="search"
      :action="action"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      action: '/api/role/GetList',
      table: {
        name: '角色名称',
        createUser: '创建用户',
        createTime: {
          label: '创建时间',
          type: 'time'
        },
        updateUser: '更新用户',
        updateTime: {
          label: '更新时间',
          type: 'time'
        },
        description: '备注',
        options: [
          {
            name: '编辑',
            path: '/system/roleedit',
            query: 'id'
          },
          {
            name: '删除',
            type: 'danger',
            event: this.deleteitem
          }
        ],
        options_width: '160px'
      },
      search: {
        keyword: '角色名称'
      }
    }
  },
  created() {
    // console.log(this.$route.path)
  },
  methods: {
    ...mapActions('role', ['role', 'role_del']),
    add() {
      // 跳转路径，需要在router里面配置
      this.$router.push({ path: '/system/roleadd' })
    },
    deleteitem(data) {
      this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = data.row
        this.role_del(id).then(res => {
          if (res.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$children[1].getData()
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style>

</style>
