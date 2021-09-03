<template>
  <div>
    <!--添加用户按钮-->
    <el-button
      type="primary"
      class="mb10"
      icon="el-icon-plus"
      :path="$route.path"
      @click="add"
    >
      添加用户
    </el-button>
    <table-page
      :table="table"
      :search="search"
      :action="action"
    />
    <add v-if="addprop.dialogVisible" :prop="addprop" @close="close" />
    <el-dialog
      v-loading="loading"
      title="数据权限"
      :visible.sync="dialogVisible"
      width="1200px"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%;"
        row-key="id"
        height="550"
        :tree-props="{children: 'children',hasChildren: 'hasChildren',}"
        :default-expand-all="false"
        @selection-change="handleSelectionChange"
        @select-all="selectAll"
        @select="handelSelectRow"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="description"
          label="功能名称"
        />
        <el-table-column
          prop="value"
          label="数据集参数"
        />
        <el-table-column
          prop="type"
          label="数据权限级别"
        >
          <template slot-scope="scope">
            {{ options(scope.row.type) }}
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-tree
        ref="tree"
        :data="tableData"
        node-key="id"
        highlight-current
        show-checkbox
        check-strictly
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="checked"
      /> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import fun from '@/store/modules/fun'
import { mapActions } from 'vuex'
import add from './add'
export default {
  // 组件
  components: { add },
  // 数据
  data() {
    return {
      loading: false,
      // 加载用户列表数据
      action: '/api/user/getlist',
      roleprops: {
        seachname: 'seach'
      },
      //   // 默认的查询参数
      //   query: {
      //     type: 3,
      //     status: 0
      //   },
      dialogVisible: false,
      table: {
        name: '姓名',
        loginName: '账号',
        roleName: '角色名称',
        mobileNumber: '手机号码',
        description: '备注',
        emailAddress: '邮箱地址',
        departmentName: '所属部门',
        departmentName_width: '150px',
        status: {
          label: '状态',
          options: [
            {
              label: '正常',
              value: 0
            },
            {
              label: '冻结',
              value: 1
            },
            {
              label: '注销',
              value: 2
            }
          ]
        },
        loginTime: '最后登录时间',
        createUser: '创建用户',
        createTime: '创建时间',
        updateUser: '修改用户',
        updateTime: '修改时间',
        name_width: '150px',
        account_width: '150px',
        roleName_width: '150px',
        mobileNumber_width: '150px',
        description_width: '150px',
        emailAddress_width: '150px',
        status_width: '150px',
        userType_width: '150px',
        loginTime_width: '150px',
        createUser_width: '150px',
        createTime_width: '150px',
        updateUser_width: '150px',
        updateTime_width: '150px',
        options: [
          {
            name: '编辑',
            event: this.edit,
            type: 'primary'
            // role: 'roleedit'
          },
          //   {
          //     // name: '设置数据权限',
          //     // type: 'primary',
          //     // event: this.datarole
          //     // role: 'roleedit'
          //   },
          //   {
          //     name: '重置密码',
          //     type: 'primary',
          //     event: this.resetpass
          //   },
          {
            name: '删除',
            type: 'danger',
            event: this.del
            // role: 'remove'
          }
        ],
        options_width: '360px'
      },
      // 搜索
      search: {
        keyword: '用户名称/用户账号',
        userGroupID: {
          label: '组织架构',
          type: 'cascader',
          props: { checkStrictly: true, children: 'children', label: 'name', value: 'id' },
          options: []
        },
        roleIds: {
          label: '角色',
          type: 'checkbox',
          options: []
        },
        status: {
          label: '状态',
          type: 'select',
          default: 0,
          options: [
            {
              label: '正常',
              value: 0
            },
            {
              label: '冻结',
              value: 1
            },
            {
              label: '注销',
              value: 2
            }
          ]
        }
      },
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'description'
      },
      addprop: {
        dialogVisible: false,
        title: '用户新增',
        id: null
      },
      from: {
        userID: ''
      },
      checked: []
    }
  },
  async created() {
    const data = await this.OrganizationalStructure()
    // const data1 = await this.role_tree()
    // const newdata = data1.map(v => {
    //   const o = {
    //     label: v.name,
    //     value: v.id
    //   }
    //   return o
    // })
    // this.search.roleIds.options = newdata
    this.search.userGroupID.options = data
  },
  methods: {
    ...mapActions('user', ['user', 'user_del', 'dataAuthority', 'DataAuthorityAllotting', 'ResetPassword']),
    ...mapActions('department', ['OrganizationalStructure']),
    // ...mapActions('role', ['role_tree']),
    updatalist() {
      this.$children[1].getData()
    },
    expandAll() {
      const els = this.$el.getElementsByClassName('el-table__expand-icon')
      els[0].click()
    },
    // 新增用户
    add() {
      this.addprop = {
        dialogVisible: true,
        title: '用户新增'
      }
    },
    // 编辑用户
    edit({ row }) {
      this.addprop = {
        dialogVisible: true,
        title: '用户编辑',
        id: row.id
      }
    },
    handelSelectRow(row, column, event) {
      if (column.show) {
        this.$refs.multipleTable.toggleRowSelection(column, false)
        column.show = false
        this.toggleRowSelection(column.children, column.show)
      } else {
        this.$refs.multipleTable.toggleRowSelection(column, true)
        column.show = true
        this.toggleRowSelection(column.children, column.show)
      }
    },
    toggleRowSelection(rows, state) {
      if (rows && rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i]
          this.$refs.multipleTable.toggleRowSelection(row, state)
          row.show = state
          this.toggleRowSelection(row.children, state)
        }
      }
    },
    dataok() {
      const ids = this.multipleSelection.map(v => {
        return v.id
      })
      this.from.paraAuthorities = ids
      this.DataAuthorityAllotting(this.from).then(res => {
        this.$message({
          message: res.resultMsg,
          type: 'success'
        })
        this.dialogVisible = false
      })
    },
    // 删除用户
    async del({ row }) {
      const id = row.id
      this.$confirm('操作将删除选中的用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.user_del({ id: id }).then(res => {
          this.$message({
            message: res.resultMsg,
            type: 'success'
          })
          this.updatalist()
        })
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    datarole({ row }) {
      this.loading = true
      this.from.userID = row.id
      this.dialogVisible = true
      this.dataAuthority(row.id).then(res => {
        const that = this
        this.tableData = res.data

        const treecheckedfilter = function(data) {
          data.map(v => {
            v.show = false
            if (v.children && v.children.length) {
              treecheckedfilter(v.children)
            }
          })
        }
        treecheckedfilter(this.tableData)

        this.$nextTick(() => {
          const treechecked = function(data) {
            data.map(v => {
              if (v.allotted === 1) {
                that.$refs.multipleTable.toggleRowSelection(v, true)
              }
              // if(){}
              if (v.children && v.children.length) {
                treechecked(v.children)
              }
            })
          }
          treechecked(this.tableData)
          this.expandAll()
        })
        this.loading = false
      })
    },
    close(upload) {
      if (upload) {
        this.updatalist()
      }
      this.addprop = {
        dialogVisible: false,
        title: '用户新增',
        data: {}
      }
    },
    selectAll(selection, first) {
      if (!first) {
        this.isAllSelect = !this.isAllSelect
      }
      selection.map(el => {
        if (el.children) {
          el.children.map(j => {
            this.toggleSelection(j, this.isAllSelect)
          })
          if (el.children.length > 0) {
            this.selectAll(el.children, true)
          }
        }
      })
    },
    toggleSelection(row, select) {
      if (select) {
        this.$refs.multipleTable.toggleRowSelection(row, select)
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    options(type) {
      let msg = ''
      switch (type) {
        case 0:
          msg = '系统级（可访问系统内所有的数据）'
          break
        case 1:
          msg = '部门级（仅可访问该部门下的数据）'
          break
        case 2:
          msg = '用户级（仅可访问该用户下的数据）'
          break
      }
      return msg
    },
    resetpass({ row }) {
      this.$confirm('此操作将重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ResetPassword(row.id).then(res => {
          this.$confirm(`重置密码成功，新密码:${res.data}`, '提示', {
            confirmButtonText: '关 闭',
            type: 'success',
            showCancelButton: false
          }).then(res => {})
        })
      }).catch(() => {})
    }
  }
}
</script>

<style>

</style>
