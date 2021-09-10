<template>
  <div>
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
      processVisible: false,
      action: '/api/workitem/GetAuthorityWorkItemlist',
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
        // dept: {
        //   type: 'select',
        //   label: '部门',
        //   options: [

        //   ]
        // },
        // user: {
        //   type: 'select',
        //   label: '员工姓名',
        //   options: [
        //     {
        //       label: '张三',
        //       value: '张三'
        //     },
        //     {
        //       label: '李四',
        //       value: '李四'
        //     }
        //   ]
        // },
        DepartID: {
          label: '部门',
          type: 'cascader',
          props: { checkStrictly: true, children: 'children', label: 'name', value: 'id' },
          options: []
        },
        // Year: {
        //   type: 'year',
        //   label: '年',
        //   default: ''
        // },
        SelectedDate: {
          type: 'month',
          label: '日期',
          default: '2021-09'
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
  async created() {
    // 获取当前日期
    // const date = new Date()
    // 给年控件赋值
    // this.search.Year.default = date.getFullYear().toString()
    // 给月控件赋值
    // this.search.SelectedDate.default = (date.getMonth() + 1).toString()

    // 从后端接口获取数据  ES6中解构
    const { data } = await this.getAuthorityDept()
    // 部门搜索控件赋值
    this.search.DepartID.options = data
  },
  methods: {
    ...mapActions('workItem', ['getlist', 'workitem_add', 'workitem_edit']),
    ...mapActions('dataauthority', ['getAuthorityDept']),
    updatalist() {
      this.$refs.tabepage.getData()
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
