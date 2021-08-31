<template>
  <el-dialog
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
  >
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
        <el-input v-model="ruleForm.departName" />
      </el-form-item>

      <el-form-item label="上级部门">
        <el-cascader
          v-model="ruleForm.parentDeptID"
          :options="treedata"
          :show-all-levels="false"
          :props="props"
        />
      </el-form-item>

      <el-form-item
        label="部门描述"
        prop="description"
      >
        <el-input
          v-model="ruleForm.description"
          type="textarea"
        />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
    return {
      ruleForm: {
        departName: '',
        parentDeptID: '',
        description: ''
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
      const data = await this.department_tree(this.prop.divisionID)
      this.treedata = data
      this.loading = false
      this.ruleForm.divisionID = this.prop.divisionID
      if (this.prop.data) {
        const { departName, parentDeptID, description, id, clusterID } = this.prop.data
        this.ruleForm = {
          departName,
          parentDeptID,
          description,
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
          if (!data.parentDeptID) {
            delete data.parentDeptID
          }
          if (this.ruleForm.id) {
            this.department_edit(data).then(res => {
              if (res.resultCode === 1) {
                this.$message({
                  message: res.resultMsg,
                  type: 'success'
                })
                this.$emit('close', true)
              }
            })
          } else {
            this.department_add(data).then(res => {
              if (res.resultCode === 1) {
                this.$message({
                  message: res.resultMsg,
                  type: 'success'
                })
                this.$emit('close', true)
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

<style>

</style>
