<template>
  <div>
    <el-button icon="el-icon-plus" type="primary" class="mb10" @click="add">新增部门</el-button>

    <adddep v-if="depprop.dialogVisible" :prop="depprop" @close="close" />
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children' }"
    >
      <el-table-column
        prop="name"
        label="部门名称"
        width="180"
      />
      <el-table-column
        prop="createUser"
        label="创建人"
        width="180"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />

      <el-table-column
        prop="updateUser"
        label="更新人"
      />

      <el-table-column
        prop="updateTime"
        label="更新时间"
      />

      <el-table-column
        prop="description"
        label="备注"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" plain @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入新增部门组件
import adddep from './dialog/adddep'
import { mapActions } from 'vuex'
export default {
  components: { adddep },
  data() {
    return {
      tableData: [],
      depprop: {
        title: '新增部门',
        dialogVisible: false
      }
    }
  },
  // 在模板渲染成html前调用，即通常初始化某些属性值
  created() {
    this.updatalist()
  },
  methods: {
    ...mapActions('department', ['department_del', 'OrganizationalStructure']),
    async updatalist() {
      const data = await this.OrganizationalStructure()
      this.tableData = data
    },
    // 新增部门事件
    add() {
      this.depprop = {
        title: '新增部门',
        dialogVisible: true
      }
    },
    dep({ row }) {
      const { id } = row
      this.$router.push({ path: '/system/deplist', query: { id }})
    },
    // 编辑
    edit(row) {
      const { parentID, name, description, id, dep } = row
      const data = {
        parentID,
        name,
        description,
        dep,
        id
      }
      this.depprop = {
        title: '编辑部门',
        data,
        dialogVisible: true
      }
    },
    // 删除
    del(row) {
      const { id } = row
      this.$confirm('操作将删除该部门，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.department_del(id).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.updatalist()
        })
      }).catch(() => {})
    },
    close(upload) {
      if (upload) {
        this.updatalist()
      }
      this.depprop.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
