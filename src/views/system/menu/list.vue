<template>
  <div v-loading="loading">
    <el-button
      type="primary"
      class="mb10"
      icon="el-icon-plus"
      @click="add"
    >
      添加菜单
    </el-button>
    <!--tree-props 表示绑定的子级-->
    <div class="contant">
      <el-table
        :data="treedata"
        style="width: 100%;"
        row-key="id"
        :tree-props="{children: 'childrenMenu', }"
      >
        <el-table-column
          prop="name"
          label="菜单名称"
        />

        <el-table-column
          prop="createUser"
          label="创建用户"
        />

        <el-table-column
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | date('yyyy-MM-dd  hh:mm:ss') }}
          </template>
        </el-table-column>

        <el-table-column
          prop="updateUser"
          label="更新用户"
        />

        <el-table-column
          prop="UpdateTime"
          label="更新时间"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime | date('yyyy-MM-dd  hh:mm:ss') }}
          </template>
        </el-table-column>

        <el-table-column
          prop="value"
          label="功能参数"
        />

        <el-table-column
          prop="description"
          label="备注"
        />

        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialog-menuAdd :prop="menuadd" @close="menuadd.dialogVisible = false" @success="success" />
  </div>
</template>

<script>
import dialogMenuAdd from './dialog/dialogMenuAdd'
import { mapActions } from 'vuex'
export default {
  components: { dialogMenuAdd },
  data() {
    return {
      loading: false,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      menuadd: {
        title: '添加菜单',
        dialogVisible: false,
        treedata: [],
        from: {}
      }
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    ...mapActions('menu', ['menu_tree', 'menu_del']),
    async getdata() {
      this.loading = true
      const data = await this.menu_tree()
      this.treedata = data
      this.loading = false
    },
    // 编辑
    edit(data) {
      const copytreedata = JSON.parse(JSON.stringify(this.treedata))
      this.menuadd = {
        title: '编辑菜单',
        dialogVisible: true,
        treedata: copytreedata,
        from: data,
        edit: true
      }
    },
    // 删除菜单
    async remove(data) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = data
        this.fun_del({ id }).then(res => {
          if (res.resultCode === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getdata()
          }
        })
      }).catch(() => {})
    },
    success() {
      this.menuadd.dialogVisible = false
      this.getdata()
    },
    // 添加菜单
    add() {
      const copytreedata = JSON.parse(JSON.stringify(this.treedata))
      this.menuadd = {
        title: '添加菜单',
        dialogVisible: true,
        treedata: copytreedata,
        from: {},
        edit: false
      }
    }
  }
}
</script>

<style>

</style>
