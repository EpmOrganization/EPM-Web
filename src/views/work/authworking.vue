<template>
  <div>
    <!--添加按钮-->
    <!-- <el-button
      type="primary"
      class="mb10"
      icon="el-icon-plus"
      :path="$route.path"
      @click="add"
    >
      添加工作记录
    </el-button> -->
    <add v-if="addprop.dialogVisible" :prop="addprop" @close="close" />
    <table-page
      ref="tabepage"
      :table="table"
      :search="search"
      :action="action"
    />
  </div>
</template>
<script>
// 引入添加工作记录组件
import add from './add'
import { mapActions } from 'vuex'
export default {
  components: { add },
  data() {
    return {
      value3: '',
      value2: '',
      processVisible: false,
      action: '/api/workitem/getlist',
      table: {
        recordDate: '日期',
        recordDate_width: '150px',
        workContent: '工作记录',
        // workContent_width: '200px',
        description: '备注',
        // description_width: '100px',

        createTime: '创建时间',
        createTime_width: '150px',
        createUser: '创建人',
        createUser_width: '150px'

        // options: [
        //   {
        //     name: '新增',
        //     type: 'success',
        //     event: this.add,
        //     filter: {
        //       isRecord: [0]
        //     }
        //   },
        //   {
        //     name: '编辑',
        //     type: 'primary',
        //     event: this.edit,
        //     filter: {
        //       isRecord: [1]
        //     }
        //   }
        // ],
        // options_width: '200px'
      },
      search: {
        dept: {
          type: 'select',
          label: '部门',
          options: [
            {
              label: '普通客户',
              value: '普通客户'
            },
            {
              label: '渠道客户',
              value: '渠道客户'
            },
            {
              label: '集团公司',
              value: '集团公司'
            }
          ]
        },
        user: {
          type: 'select',
          label: '员工姓名',
          options: [
            {
              label: '张三',
              value: '张三'
            },
            {
              label: '李四',
              value: '李四'
            }
          ]
        },
        Year: {
          type: 'year',
          label: '年',
          default: ''
        },
        Month: {
          type: 'month',
          label: '月',
          default: ''
        }
      },
      addprop: {
        dialogVisible: false,
        title: '用户新增',
        id: null
      },
      fileList: [],
      submitfrom: {
        applyDescription: ''
      }
    }
  },
  created() {
    const date = new Date()
    this.search.Year.default = date.getFullYear().toString()
    this.search.Month.default = (date.getMonth() + 1).toString()
  },
  methods: {
    ...mapActions('workItem', ['getlist', 'workitem_add', 'workitem_edit']),
    updatalist() {
      this.$refs.tabepage.getData()
    },
    // 年选择改变事件
    YearChange() {
      alert('Year:' + this.value3)
    },
    // 新增工作记录
    add({ row }) {
      this.addprop = {
        recordDate: row.recordDate,
        dialogVisible: true,
        title: '新增工作记录'
      }
    },
    sub({ row }) {
      this.submitfrom = {
        id: row.id,
        applyDescription: ''
      }
    },
    edit({ row }) {
      const { workContent, description, id } = row
      const data = {
        workContent,
        description,
        id
      }
      this.addprop = {
        title: '编辑工作记录',
        data,
        dialogVisible: true
      }
    },
    close() {
      this.addprop.dialogVisible = false
      this.updatalist()
    },
    submit() {
      this.AdjustingOrder_Submit(this.submitfrom).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.updatalist()
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.upload-demo{
  display: inline-block;
}

</style>
