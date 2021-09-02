<template>
  <div v-loading="loading">
    <el-form ref="from" :model="from" :rules="fromrules" label-width="100px" class="demo-ruleForm">
      <div class="theader"><p>基本信息</p></div>
      <el-form-item label="角色名称" prop="roleName">
        <el-col :span="8">
          <el-input v-model.trim="from.roleName" />
        </el-col>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-col :span="8">
          <el-input v-model="from.description" type="textarea" />
        </el-col>
      </el-form-item>
      <div class="theader"><p>角色权限</p></div>
      <div class="tree">
        <el-tree
          ref="tree"
          :data="treedata"
          show-checkbox
          node-key="id"
          default-expand-all
          :check-strictly="true"
          :default-checked-keys="checked"
          :props="defaultProps"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>
              <svg-icon :icon-class="data.type === 1?'menu':'rolegn'" />  {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('from')">保 存</el-button>
        <el-button @click="$router.push({path:'/system/rolelist'})">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      api: 'role',
      from: {
        roleName: '',
        description: ''
      },
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checked: [],
      treedata: [],
      fromrules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    // :check-strictly="true"
    ...mapActions('fun', ['fun_tree']),
    ...mapActions('role', ['role', 'role_detail', 'role_edit']),
    async getdata() {
      const treedata = await this.fun_tree()
      // const obj = {}
      // const peon = treedata.reduce((cur, next) => {
      //   obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
      //   return cur
      // }, [])
      // // this.treedata = arr1
      // peon.map(v => {
      //   const obj1 = {}
      //   const peon1 = v.children.reduce((cur, next) => {
      //     obj1[next.id] ? '' : obj1[next.id] = true && cur.push(next)
      //     return cur
      //   }, [])
      //   v.children = peon1
      // })
      // console.log(peon)
      this.treedata = treedata
      if (this.$route.query.id) {
        this.api = 'role_edit'
        this.loading = true
        const { data } = await this.role_detail(this.$route.query.id)
        if (data.halfCheckeds) {
          data.halfCheckeds = JSON.parse(data.halfCheckeds)
          data.halfCheckeds.map(v => {
            data.allottedAuthorities.map((s, i) => {
              if (s === v) {
                data.allottedAuthorities.splice(i, 1)
              }
            })
          })
        }
        const { allottedAuthorities, clusterID, id, description, roleName } = data
        this.from = {
          description,
          clusterID,
          id,
          roleName
        }
        // allottedAuthorities.map((v, i) => {
        //   treedata.map(s => {
        //     if (v === s.id) {
        //       allottedAuthorities.splice(i, 1)
        //     }
        //   })
        // })
        this.checked = allottedAuthorities
        this.loading = false
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const checkedlist = this.$refs.tree.getCheckedKeys()
          const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
          const allottedAuthorities = [...checkedlist, ...HalfCheckedKeys]
          this.from.allottedAuthorities = allottedAuthorities
          this.from.halfcheckeds = JSON.stringify(HalfCheckedKeys)
          this[this.api](this.from).then(res => {
            if (res.resultCode === 1) {
              this.$message({
                message: this.api === 'role' ? '新增成功' : '编辑成功',
                type: 'success'
              })
              this.$router.push({ path: '/system/rolelist' })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.tree{
  .icon{
    margin-right: 5px;
  }
  .el-tree-node__content{
    height: 32px;
  }
}
</style>
