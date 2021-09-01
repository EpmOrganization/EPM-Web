<template>
  <el-dialog
    :title="prop.title"
    :visible.sync="prop.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form ref="from" :model="from" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="name">
        <el-col :span="16">
          <el-input v-model="from.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="功能参数" prop="value">
        <el-col :span="16">
          <el-input v-model="from.value" />
        </el-col>
      </el-form-item>
      <el-form-item label="功能说明">
        <el-col :span="16">
          <el-input v-model="from.description" type="textarea" />
        </el-col>
      </el-form-item>

      <el-form-item label="功能分类" prop="type">
        <el-col :span="16">
          <el-select v-model.number="from.type" placeholder="请选择功能分类">
            <el-option label="页面载入" :value="1" />
            <el-option label="数据查询显示" :value="2" />
            <el-option label="数据增/删/改/导" :value="3" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="所属分组" :prop="isrulesName">
        <el-col :span="16">
          <el-cascader
            v-model="from.parentList"
            :options="options"
            :props="{ checkStrictly: true , children:'children',label:'name',value:'id'}"
            clearable
          />
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
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
      api: 'menu_add',
      from: {
        name: '',
        value: '',
        description: '',
        type: '',
        parentAuthorityID: '',
        parentList: []
      },
      isrulesName: '',
      rules: {
        name: [{ required: true, message: '请输入功能名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择功能分类', trigger: 'blur' }],
        parentList: [{ required: true, message: '请选择功能分组', trigger: 'blur' }],
        value: [{ required: true, message: '请输入功能参数', trigger: 'blur' }]
      }
    }
  },
  computed: {
    options() {
      const filterdata = function(tree, type) {
        return tree.filter(item => {
          if (item.type === type) {
            return item
          }
        }).map(item => {
          if (item.children && item.children.length) {
            item.children = filterdata(item.children, type)
          }
          return item
        })
      }
      const filterOption = filterdata(this.prop.treedata, 1)
      return filterOption
    },
    isparentList() {
      return this.from.type
    }
  },
  watch: {
    isparentList(val) {
      if (val !== 1) {
        this.isrulesName = 'parentList'
      } else {
        this.isrulesName = ''
      }
    },
    prop: {
      deep: true,
      handler: function(newV, oldV) {
        if (newV.edit) {
          const { name, value, description, type, parentAuthorityID, parentList, id, clusterID } = newV.from
          this.from = Object.assign(this.from, { name, value, description, type, parentAuthorityID, id, clusterID })
          if (parentList) {
            this.from.parentList = parentList.split(',')
          }

          this.api = 'menu_edit'
        } else {
          this.bedoreclose()
          this.api = 'menu_add'
        }
      }
    }
  },
  methods: {
    ...mapActions('menu', ['menu_add', 'menu_edit']),
    bedoreclose() {
      this.from = {
        name: '',
        value: '',
        description: '',
        type: '',
        parentAuthorityID: '',
        parentList: []
      }
    },
    close() {
      this.bedoreclose()
      this.$emit('close')
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.from))
          data.parentAuthorityID = data.parentList[this.from.parentList.length - 1]
          if (data.parentList && data.parentList.length) {
            let sum = ''

            data.parentList.map((v, i) => {
              if (i === data.parentList.length - 1) {
                sum += v
              } else {
                sum += v + ','
              }
            })
            data.parentList = sum
          } else {
            data.parentList = ''
          }

          this[this.api](data).then(res => {
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.bedoreclose()
              this.$emit('success')
            } else {
              this.close()
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

<style>

</style>
