<template>
  <el-dialog
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="500px"
  >
    <el-form ref="from" :model="from" :rules="rules" label-width="110px">
      <el-input
        v-model="from.workContent"
        type="textarea"
        :autosize="{ minRows: 2}"
        placeholder="工作记录内容"
      />
      <div style="margin: 20px 0;" />
      <el-input
        v-model="from.description"
        type="textarea"
        autosize
        placeholder="备注"
      />
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
  //   async created() {
  //     // this.loading = true
  //     // const role_tree = await this.role_tree() // 角色
  //     // const data = await this.OrganizationalStructure()
  //     // this.depdata = data
  //     // this.roledara = role_tree

  //     // if (this.prop.id) {
  //     //   this.getDetail(this.prop.id).then(res => {
  //     //     this.from = Object.assign(this.from, res.data)
  //     //     this.from.dep = JSON.parse(this.from.dep)
  //     //   })
  //     //   // this.sybchange(this.prop.data.divisionID)
  //     //   this.api = 'user_edit'
  //     // } else {
  //     //   this.api = 'user'
  //     //   // 自动创建密码
  //     // //   this.AutoCreatePwd().then(res => {
  //     // //     this.from.password = res.data
  //     // //   })
  //     // }
  //     this.loading = false
  //   },
  methods: {
    ...mapActions('workItem', ['workItem_add', 'workItem_edit']),
    submitForm(formName) {
      alert('提交')
      alert(this.prop.recordDate)
      console.log(this.prop.recordDate)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.from.recordDate = this.prop.recordDate
          const data = JSON.parse(JSON.stringify(this.from))
          console.log(data)

          this.workItem_add(data).then(res => {
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
