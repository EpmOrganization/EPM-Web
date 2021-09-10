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
        createUser_width: '150px',

        options: [
          {
            name: '新增',
            type: 'success',
            event: this.add,
            filter: {
              isRecord: [0]
            }
          },
          {
            name: '编辑',
            type: 'primary',
            event: this.edit,
            filter: {
              isRecord: [1]
            }
          }
        ],
        options_width: '200px'
      },
      search: {
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
      }
    }
  },
  created() {
    // // 给年和月控件赋值
    // const date = new Date()
    // // this.search.Year.default = date.getFullYear().toString()
    // this.search.Month.default = (date.getMonth() + 1).toString()
  },
  methods: {
    ...mapActions('workItem', ['getlist', 'workitem_add', 'workitem_edit']),
    updatalist() {
      this.$refs.tabepage.getData()
    },
    // 新增工作记录
    add({ row }) {
      this.addprop = {
        data: row,
        type: 'add',
        dialogVisible: true,
        title: '新增工作记录'
      }
    },
    // 编辑工作记录
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
    }
  }
}
</script>

<style scoped lang='scss'>
.upload-demo{
  display: inline-block;
}

</style>
