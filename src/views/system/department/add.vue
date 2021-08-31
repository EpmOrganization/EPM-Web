<template>
  <div v-loading="loading">
    <div class="theader">
      <p>基本信息</p>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="部门名称"
        prop="departName"
      >
        <el-col :span="8">
          <el-input v-model="ruleForm.departName" />
        </el-col>
      </el-form-item>

      <el-form-item label="上级部门">
        <el-col :span="8">
          <el-cascader
            v-model="ruleForm.parentDeptID"
            :options="treedata"
            :show-all-levels="false"
            :props="props"
          />
        </el-col>
      </el-form-item>

      <el-form-item
        label="部门描述"
        prop="remark"
      >
        <el-col :span="8">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
          />
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >
          确定
        </el-button>
        <el-button @click="$router.push({ name: 'list' })">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        departName: '',
        parentDeptID: '',
        remark: ''
      },
      rules: {
        departName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      props: {
        value: 'id',
        label: 'departName',
        children: 'childrenDepartment',
        checkStrictly: true
      },
      treedata: [],
      loading: 0
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    ...mapActions('department', ['department_tree', 'department_edit', 'department_add']),
    async getdata() {
      this.loading = true
      const data = await this.department_tree()
      this.treedata = data
      this.loading = false
      if (this.$route.query.data) {
        const { departName, parentDeptID, remark, id, clusterID } = JSON.parse(
          this.$route.query.data
        )
        this.ruleForm = {
          departName,
          parentDeptID,
          remark,
          id,
          clusterID
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.ruleForm))
          if (Array.isArray(data.parentDeptID)) {
            data.parentDeptID = data.parentDeptID[data.parentDeptID.length - 1]
          }
          if (this.ruleForm.id) {
            this.department_edit(data).then(res => {
              if (res.resultCode === 1) {
                this.$message({
                  message: res.resultMsg,
                  type: 'success'
                })
                this.$router.push({ name: 'list' })
              }
            })
          } else {
            this.department_add(data).then(res => {
              if (res.resultCode === 1) {
                this.$message({
                  message: res.resultMsg,
                  type: 'success'
                })
                this.$router.push({ name: 'list' })
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped></style>
