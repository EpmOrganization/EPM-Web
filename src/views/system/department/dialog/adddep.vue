
<template>
  <!-- 新增部门组件 -->
  <el-dialog
    v-if="prop.dialogVisible"
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form ref="from" :model="from" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="from.name" />
      </el-form-item>
      <el-form-item label="上级部门" prop="dep">
        <el-cascader
          v-model="from.dep"
          :options="treedata"
          :show-all-levels="false"
          :props="props"
        />
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="from.description" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submit('from')">确 定</el-button>
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
      api: 'department_add',
      from: {
        // 上级部门ID
        parentID: null,
        name: null,
        description: null,
        // 选择的上级部门
        dep: []
      },
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      // 上级部门绑定的数据
      treedata: [],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.prop.data) {
      this.from = this.prop.data
      this.from.dep = JSON.parse(this.prop.data.dep) || []
      this.api = 'department_depedit'
    }
    this.OrganizationalStructure().then(res => {
      this.treedata = res
    })
  },
  methods: {
    ...mapActions('department', ['department_add', 'department_depedit', 'OrganizationalStructure']),
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.from))
          data.parentID = data.dep[data.dep.length - 1]
          data.dep = JSON.stringify(data.dep)
          this[this.api](data).then(res => {
            // 提示信息
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$emit('close', true)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
