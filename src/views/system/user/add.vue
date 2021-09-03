<template>
  <el-dialog
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="500px"
  >
    <div v-loading="loading" class="contant">
      <el-form ref="from" :model="from" :rules="rules" label-width="90px" class="demo-ruleForm">
        <el-form-item label="用户账号" prop="loginName">
          <el-col :span="22">
            <el-input v-model="from.loginName" :disabled="from.id?true:false" />
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="22">
            <el-input v-model="from.password" :disabled="from.id?true:false" />
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-col :span="22">
            <el-input v-model="from.name" />
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobileNumber">
          <el-col :span="22">
            <el-input v-model="from.mobileNumber" />
          </el-col>
        </el-form-item>
        <el-form-item label="备注信息" prop="description">
          <el-col :span="22">
            <el-input v-model="from.description" type="textarea" />
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="emailAddress">
          <el-col :span="22">
            <el-input v-model="from.emailAddress" />
          </el-col>
        </el-form-item>
        <el-form-item label="部门">
          <el-col :span="22">
            <el-cascader
              v-model="from.dep"
              :options="depdata"
              :props="{ checkStrictly: true ,children:'children',label:'name',value:'id'}"
              clearable
            />
          </el-col>
        </el-form-item>
        <el-form-item label="角色" prop="roleID">
          <el-col :span="22">
            <el-select v-model="from.roleID" placeholder="请选择">
              <el-option v-for="item in roledara" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item v-if="api === 'user_edit'" label="用户状态" prop="state">
          <el-col :span="22">
            <el-select v-model.number="from.status" placeholder="请选择">
              <el-option label="正常" :value="0" />
              <el-option label="冻结" :value="1" />
              <el-option label="注销" :value="2" />
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('from')">确定</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    prop: {
      type: Object,
      default: () => {},
      requires: false
    }
  },
  data() {
    // 验证手机号码
    // const validatePhone = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入手机号'))
    //   } else {
    //     if (!/^1[3456789]\d{9}$/.test(value)) {
    //       callback(new Error('请输入正确的手机号'))
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    return {
      api: 'user',
      from: {
        loginName: '', // 用户账号
        password: '', // 密码
        name: '', // 姓名
        mobileNumber: '', // 手机号码
        description: '', // 备注信息
        emailAddress: '', // 邮箱地址
        position: '', // 职务
        dep: [], // 记录部门数组
        departmentID: '', // 部门ID
        roleID: '', // 角色ID
        status: 0
      },
      // 验证规则
      rules: {
        loginName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        // mobileNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
        RoleID: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
        dep: [{ required: true, message: '请选择用户部门', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
      },
      roledara: [],
      depdata: [],
      syblist: []
    }
  },
  async created() {
    this.loading = true
    const role_tree = await this.role_tree() // 角色
    const data = await this.OrganizationalStructure()
    this.depdata = data
    this.roledara = role_tree

    if (this.prop.id) {
      this.getDetail(this.prop.id).then(res => {
        this.from = Object.assign(this.from, res.data)
        this.from.dep = JSON.parse(this.from.dep)
      })
      // this.sybchange(this.prop.data.divisionID)
      this.api = 'user_edit'
    } else {
      this.api = 'user'
      // 自动创建密码
    //   this.AutoCreatePwd().then(res => {
    //     this.from.password = res.data
    //   })
    }
    this.loading = false
  },
  methods: {
    ...mapActions('user', ['user', 'user_edit', 'getDetail']),
    ...mapActions('role', ['role_tree']),
    ...mapActions('department', ['department_tree', 'OrganizationalStructure']),
    // sybchange(id) {
    //   this.department_tree(id).then(res => {
    //     this.userGroupID = ''
    //     this.depdata = res
    //   })
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.from))
          console.log(data)
          if (data.dep && data.dep.length > 0) {
            data.departmentID = data.dep[data.dep.length - 1]
          } else {
            data.departmentID = null
          }
          //   data.dep = JSON.stringify(data.dep)
          //   if (!data.divisionID) {
          //     delete data.divisionID
          //   }
          this[this.api](data).then(res => {
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$emit('close', true)
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

<style lang='scss' scoped>
.contant{
    .el-cascader{
        width: 100%;
    }
    .el-select{
        width: 100%;
    }
}
</style>
