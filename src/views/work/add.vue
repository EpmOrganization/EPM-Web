<template>
  <el-dialog
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="500px"
  >
    <el-form ref="from" :model="from" :rules="rules" label-width="0">
      <el-form-item prop="workContent">
        <el-input
          v-model="from.workContent"
          type="textarea"
          :autosize="{ minRows: 3}"
          placeholder="工作记录内容"
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="from.description"
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="备注"
        />
      </el-form-item>

    </el-form>
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
    return {
      api: 'workItem_add',
      from: {
        recordDate: '',
        workContent: '',
        description: '' // 备注信息
      },
      // 验证规则
      rules: {
        workContent: [{ required: true, message: '请输入工作记录内容', trigger: 'blur' }]
      }
    }
  },
  async created() {
    if (this.prop.data && this.prop.type !== 'add') {
      this.api = 'workItem_edit'
      this.from = this.prop.data
    } else {
      this.from.recordDate = this.prop.data.recordDate
    }
  },
  methods: {
    ...mapActions('workItem', ['workItem_add', 'workItem_edit']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   this.from.recordDate = this.prop.recordDate
          const data = JSON.parse(JSON.stringify(this.from))
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
