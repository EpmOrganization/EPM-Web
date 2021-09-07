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
    <div class="container">
      <div class="block">
        <span class="demonstration">年</span>
        <el-date-picker
          v-model="value3"
          type="year"
          placeholder="选择年"
          :change="YearChange"
        />
      </div>
      <div class="block">
        <span class="demonstration">月</span>
        <el-date-picker
          v-model="value2"
          type="month"
          placeholder="选择月"
        />
      </div>
    </div>

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
        // recordDate_width: '150px',
        workContent: '工作记录',
        // workContent_width: '200px',
        description: '备注',
        // description_width: '100px',

        createTime: '首次创建时间',
        createTime_width: '150px',
        createUser: '创建人',
        createUser_width: '150px',

        options: [
          {
            name: '编辑',
            type: 'primary',
            event: this.edit
          }
        ],
        options_width: '100px'
      },
      search: {
        Year: {
          type: 'select',
          label: '年',
          options: [
            {
              label: '2021',
              value: 2021
            },
            {
              label: '2020',
              value: 2020
            },
            {
              label: '2019',
              value: 2019
            }
          ]
        },
        Month: {
          type: 'select',
          label: '月',
          options: [
            {
              label: '1',
              value: 1
            },
            {
              label: '2',
              value: 2
            },
            {
              label: '3',
              value: 3
            },
            {
              label: '4',
              value: 4
            },
            {
              label: '5',
              value: 5
            }
          ]
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
    add() {
      this.addprop = {
        dialogVisible: true,
        title: '新增工作记录'
      }
    },
    sub({ row }) {
      this.submitfrom = {
        id: row.id,
        applyDescription: ''
      }
      // this.dialogVisible = true
    },
    edit({ row }) {
      // const { adjustType } = row
      const data = JSON.parse(JSON.stringify(row))
      console.log(data)
      // if (adjustType === 0) {
      //   this.quantityprop = {
      //     title: '编辑量差调整',
      //     data,
      //     dialogVisible: true
      //   }
      // } else if (adjustType === 1) {
      //   this.minpriceprop = {
      //     title: '编辑价差调整',
      //     data,
      //     dialogVisible: true
      //   }
      // } else if (adjustType === 2) {
      //   this.balanceprop = {
      //     title: '编辑余额调整',
      //     data,
      //     dialogVisible: true
      //   }
      // }
      alert('编辑')
      this.addprop = {
        recordDate: row.recordDate,
        dialogVisible: true,
        title: '编辑工作记录'
      }
    },
    close() {
      this.addprop.dialogVisible = false
    },
    submit() {
      this.AdjustingOrder_Submit(this.submitfrom).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.updatalist()
        // this.dialogVisible = false
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
