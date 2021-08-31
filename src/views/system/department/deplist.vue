<template>
  <div v-loading="loading">
    <!-- 部门管理 -->
    <el-button
      type="primary"
      class="mb20"
      icon="el-icon-plus"
      @click="add"
    >
      新增部门
    </el-button>
    <div class="contant">
      <el-table
        :data="treedata"
        style="width: 100%;"
        row-key="id"
        :tree-props="{children: 'childrenDepartment', }"
      >
        <el-table-column
          prop="departName"
          label="部门名称"
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
          prop="description"
          label="备注"
        />

        <el-table-column
          label="操作"
          width="180"
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
    <setdep v-if="setdepprop.dialogVisible" :prop="setdepprop" @close="close" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setdep from './dialog/setdep'
export default {
  components: { setdep },
  data() {
    return {
      loading: false,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      propsnode: {
        node: {}
      },
      setdepprop: {
        dialogVisible: false,
        title: '新增部门',
        divisionID: this.$route.query.id
      }
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    ...mapActions('department', ['department_tree', 'department_del']),
    async getdata() {
      this.loading = true
      const data = await this.department_tree(this.$route.query.id)
      this.treedata = data
      this.loading = false
    },
    handleNodeClick(node, data) {
      this.propsnode.node = node
    },
    add() {
      this.setdepprop = {
        divisionID: this.$route.query.id,
        title: '新增部门',
        dialogVisible: true
      }
    },
    edit(data) {
      this.setdepprop = {
        divisionID: this.$route.query.id,
        title: '编辑部门',
        data,
        dialogVisible: true
      }
    },
    close(upload) {
      if (upload) {
        this.getdata()
      }
      this.setdepprop.dialogVisible = false
    },
    remove(data) {
      const del = { departId: data['id'] }
      this.department_del(del).then(res => {
        if (res.resultCode === 1) {
          this.$message({
            message: res.resultMsg,
            type: 'success'
          })
          this.getdata()
        }
      })
    }
  }
}
</script>

<style  lang="scss" scope>
.contant{
  .el-table{
    border-bottom: none;
  }
}
</style>
