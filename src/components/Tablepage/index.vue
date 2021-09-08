<template>
  <div>
    <Seach
      v-if="issearch"
      ref="search"
      :search="search"
      :data="data.data"
      :checked-all="checkedAll"
      :is-show-submit="isShowSubmit"
      @searchFn="searchFn"
    />

    <div class="tablelist">
      <el-table
        v-if="table"
        ref="multipleTable"
        v-loading="loading"
        border
        :height="mrheight || screenHeight || Height"
        show-overflow-tooltip
        :data="data.data"
        :row-style="styleFn"
        :fit="true"
        size="small"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        @sort-change="changeSort"
      >
        <el-table-column
          v-if="checkedall"
          type="selection"
          width="55"
        />

        <template v-for="(th,thkey) in table">

          <el-table-column
            v-if="typeOne(th,thkey)"
            :key="thkey"
            :prop="thkey"
            :label="th.label"
            :sortable="sort"
            :width="th[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>{{ scope.$index+1 }}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="typeTwo(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :sortable="sort"
            :label="th.label"
            :width="th[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>{{ scope.row[thkey] | date('yyyy-MM-dd  hh:mm:ss') }}</div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="typeEight(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :sortable="sort"
            :label="th.label"
            :width="table[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>{{ scope.row[thkey] | month('yyyy-MM') }}</div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="typeThree(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :sortable="sort"

            :label="th.label"
            :width="th[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>{{ th.data[scope.row[thkey]] }}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="typeFour(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :label="th.label"
            :sortable="sort"
            :width="th[thkey+'_width']"
            :min-width="jswidth()"
          >
            <template slot-scope="scope">
              {{ scope.row[thkey] | addressLabelByCode }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="typefifed(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :fixed="table[Object.keys(table)[0]] === th"
            :sortable="sort"
            :label="th"
            :width="table[thkey+'_width']"
          />
          <el-table-column
            v-if="typeSix(th,thkey)"
            :key="thkey+'only'"
            :label="th.label"
            :width="table[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row[thkey] | valueBack(th.options,'value','label') }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="typeSeven(th,thkey)"
            :key="thkey"
            type="selection"
            :width="th[thkey+'_width']"
          />
          <el-table-column
            v-if="typenine(th,thkey)"
            :key="thkey+'only'"
            :prop="thkey"
            :fixed="table[Object.keys(table)[0]] === th"
            :sortable="sort"
            :label="th.label"
            :width="table[thkey+'_width']"
          >
            <template slot-scope="scope">
              <div>
                <el-popover
                  placement="top-start"
                  width="1000"
                  trigger="click"
                  :content="scope.row[thkey]"
                >
                  <el-button slot="reference" type="text" class="dysl">{{ scope.row[thkey] }}</el-button>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="thkey=='options'"
            :key="thkey"
            fixed="right"
            :prop="thkey"
            :label="thkey=='options'?(table['options_label']?table['options_label']:'操作'):th"
            :width="table[thkey+'_width']"
          >
            <template
              v-if="thkey=='options'"
              slot-scope="scope"
              class="btn"
            >
              <span
                v-for="(opt,optindex) in th"
                v-show="optionsFilter(opt,scope.row)"
                :key="optindex"
              >
                <el-button
                  v-if="!opt.upload && opt.type!=='select'"
                  class="table-link"
                  plain
                  size="mini"
                  :style="opt.style"
                  :disabled="opt.dis"
                  :type="opt.type"
                  @click="tdClick(opt, scope.row, scope.$index)"
                >
                  {{ opt.name }}
                </el-button>
                <el-upload
                  v-if="opt.upload && opt.type!=='select'"
                  class="upload-demo"
                  action=""
                  :auto-upload="false"
                  multiple
                  :show-file-list="false"
                  :file-list="fileList"
                  :on-change="(file)=>{
                    filechange(opt, scope.row, scope.$index,file)
                  }"
                >
                  <el-button
                    class="table-link"
                    size="mini"
                    plain
                    :style="opt.style"
                    :disabled="opt.dis"
                    :type="opt.type"
                  >
                    {{ opt.name }}
                  </el-button>
                </el-upload>
                <el-dropdown v-if="opt.type==='select'">
                  <el-button type="primary" size="mini">
                    {{ opt.label }}<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in opt.options" v-show="optionsFilter(opt.options[index],scope.row)" :key="index" @click.native="tdClick(opt, scope.row, scope.$index,index)">{{ item.name }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>

            </template>
          </el-table-column>
        </template>

        <!-- <template>

        </template> -->
        <template slot="empty">
          <Nodata v-if="data.data ? !data.data.length : 0" />
        </template>
      </el-table>
      <template v-if="datakey">
        <span class="mr15" style="line-height:45px;">{{ datakey.title }}:</span><span v-for="(item,key) in datakey.summrytable" :key="key" style="color:#606266;line-height:45px;" class="mr15">{{ item }}  :  {{ sum[key] }}</span>
      </template>
      <Pagination
        class="mt5"
        :count="data.count"
        :currentpage="pagedata.pageIndex"
        @current-change="changePagination"
      />
    </div>
  </div>
</template>
<script>
import Seach from './Search'
import Pagination from './Pagination'
import request from '@/utils/request'
import Nodata from './nodata'
export default {
  name: 'TablePage',
  components: { Seach, Pagination, Nodata },
  props: {
    nostyle: {
      type: Boolean,
      requires: false
    },
    table: {
      type: Object,
      default: () => ({}),
      requires: true
    },
    action: {
      type: String,
      default: '',
      requires: false
    },
    actionheader: {
      type: Object,
      default: () => {},
      requires: false
    },
    search: {
      type: Object,
      default: () => {},
      requires: false
    },
    roleprops: {
      type: Object,
      default: () => {},
      requires: false
    },
    checkedall: {
      type: Boolean,
      default: false
    },
    isShowSubmit: {
      type: Boolean,
      default: true
    },
    customData: {
      type: Array,
      default: () => [],
      requires: false
    },
    props: {
      type: Object,
      default: () => {},
      requires: false
    },
    query: {
      type: Object,
      default: () => {},
      requires: false
    },
    datakey: {
      type: Object,
      default: () => {},
      requires: false
    },
    mrheight: {
      type: String,
      default: '',
      requires: false
    },
    sort: {
      type: String,
      default: 'custom',
      requires: false
    }
  },
  data() {
    return {
      data: {},
      loading: 0,
      checkedAll: false,
      multipleSelection: [],
      fileList: [],
      sum: {},
      screenHeight: '',
      pagedata: {
        pageIndex: 1,
        pageSize: 10
      },
      copyData: ''
    }
  },
  computed: {
    issearch() {
      let isshow = false
      if (this.roleprops && this.roleprops.seachname) {
        this.$store.state.user.funlist.map(v => {
          if (v.path === this.$route.path) {
            if (v.funlist && v.funlist.length) {
              v.funlist.map(s => {
                if (s.value === this.roleprops.seachname) {
                  isshow = true
                }
              })
            }
          }
        })
      } else if (this.search) {
        isshow = true
      }
      return isshow
    },
    funlist() {
      const list = []
      this.$store.state.user.funlist.map(v => {
        if (v.path === this.$route.path) {
          if (v.funlist && v.funlist.length) {
            v.funlist.map(s => {
              list.push(s.value)
            })
          }
        }
      })
      return list
    },
    Height() {
      let height = 0
      if (this.issearch) {
        height = document.body.clientHeight - 280
      } else if (!this.issearch) {
        height = document.body.clientHeight - 250
      } else {
        height = 500
      }
      return height
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    customData(n, o) {
      this.data = n
    },
    // eslint-disable-next-line no-unused-vars
    customLoading(n, o) {
      this.loading = n
    }
  },
  mounted() {
    if (this.issearch) {
      this.screenHeight = document.body.clientHeight - 280
    } else if (!this.issearch) {
      this.screenHeight = document.body.clientHeight - 200
    } else {
      this.screenHeight = 500
    }
    window.onresize = () => {
      return (() => {
        if (this.issearch) {
          this.screenHeight = document.body.clientHeight - 280
        } else if (!this.issearch) {
          this.screenHeight = document.body.clientHeight - 37
        } else {
          this.screenHeight = 500
        }
      })()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    typeOne(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'index'
    },
    typeTwo(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'time'
    },
    typeThree(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'dict'
    },
    typeFour(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'area'
    },
    typefifed(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) === 'string' && th.type !== 'index' &&
                    th.type !== 'time' && th.type !== 'dict' && th.type !== 'area' && th.type !== 'adapt'
    },
    typeSix(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type !== 'index' &&
                    th.type !== 'time' && th.type !== 'dict' && th.type !== 'area' && th.type !== 'selection' && th.type !== 'month' && th.type !== 'adapt'
    },
    typeEight(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'month'
    },
    typeSeven(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'selection'
    },
    typenine(th, thkey) {
      return thkey !== 'options' && thkey !== 'options_label' && thkey.indexOf('_width') < 0 && typeof (th) !== 'string' && th.type === 'adapt'
    },
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({ row, rowIndex }) {
      let className = ''
      if (rowIndex % 2 === 0) {
        className = 'warning-row'
      } else {
        className = 'success-row'
      }
      return className
    },
    flexColumnWidth2(str, data, th) {
      // console.log('该列数据[i]:', th)
      if (!data || !data.length || data.length === 0 || data === undefined) {
        return
      }
      if (!str || !str.length || str.length === 0 || str === undefined) {
        return
      }
      const tableData = JSON.parse(JSON.stringify(data))
      let index = 0
      str = str + ''
      let columnContent = ''
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][str] === null) {
          tableData[i][str] = ''
        }
        const now_temp = tableData[i][str] + ''
        const max_temp = tableData[index][str] + ''
        if (now_temp.length >= max_temp.length) {
          index = i
        }
      }
      columnContent = tableData[index][str]
      let flexWidth = 0
      // const regExp = /\b\d{4}-\d{1,2}-\d{1,2}\b/
      try {
        for (const char of columnContent) {
          if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            // 如果是英文字符，为字符分配8个单位宽度
            flexWidth += 8
          } else if (char >= '\u4e00' && char <= '\u9fa5') {
            // 如果是中文字符，为字符分配15个单位宽度
            flexWidth += 16
          } else {
            // 其他种类字符，为字符分配8个单位宽度
            flexWidth += 11
          }
        }
      // eslint-disable-next-line no-empty
      } catch (error) {}
      let thlength = 0
      const thlabel = th
      for (const th of thlabel) {
        // 如果是中文字符，为字符分配15个单位宽度
        if (th >= '\u4e00' && th <= '\u9fa5') {
          // 如果是中文字符，为字符分配15个单位宽度
          thlength += 16
        }
      }
      let num = 44
      if (flexWidth >= thlength) {
        num += flexWidth
      } else {
        num += thlength
      }
      if (num < 80) {
        // 设置最小宽度
        num = 80
      }
      if (num > 250) {
        // 设置最大宽度
        num = 250
      }
      return num + 'px'
    },
    // 宽度计算
    flexColumnWidth(str, data, th) {
      // console.log('该列数据[i]:', th)
      // console.log('我执行了', str, tableData, '我需要转换', th)
      // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
      // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
      // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
      if (!data || !data.length || data.length === 0 || data === undefined) {
        return
      }
      const tableData = JSON.parse(JSON.stringify(data))
      let thlabel = ''
      if (th) {
        thlabel = th.label
        if (th.options) {
          th.options.map(item => {
            tableData.map(v => {
              if (v[str] === item.value) {
                v[str] = item.label
              }
            })
          })
        }
      }

      str = str + ''
      let columnContent = ''

      if (!str || !str.length || str.length === 0 || str === undefined) {
        return
      }
      // 获取该列中最长的数据(内容)
      let index = 0
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][str] === null) {
          return
        }
        const now_temp = tableData[i][str] + ''
        const max_temp = tableData[index][str] + ''
        if (now_temp.length > max_temp.length) {
          index = i
        }
      }
      columnContent = tableData[index][str]

      // console.log('该列数据[i]:', th.label, columnContent)
      // 以下分配的单位长度可根据实际需求进行调整
      let flexWidth = 0
      for (const char of columnContent) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 8
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          // 如果是中文字符，为字符分配15个单位宽度
          flexWidth += 16
        } else {
          // 其他种类字符，为字符分配8个单位宽度
          flexWidth += 11
        }
      }
      let thlength = 0
      for (const th of thlabel) {
        // 如果是中文字符，为字符分配15个单位宽度
        if (th >= '\u4e00' && th <= '\u9fa5') {
          // 如果是中文字符，为字符分配15个单位宽度
          thlength += 16
        }
      }
      let num = 44
      if (flexWidth >= thlength) {
        num += flexWidth
      } else {
        num += thlength
      }
      if (num < 80) {
        // 设置最小宽度
        num = 80
      }
      if (num > 250) {
        // 设置最大宽度
        num = 250
      }
      return num + 'px'
    },
    // 数据查询
    getData(search) {
      if (this.query) {
        search = Object.assign(this.pagedata, this.query, search)
      } else {
        search = Object.assign(this.pagedata, search)
      }
      this.loading = 1
      request({
        url: this.action,
        method: 'post',
        data: search
      }).then(res => {
        this.loading = 0
        if (res && res.code === 1) {
          if (this.datakey) {
            this.data.data = res.data[this.datakey.tablekey]
            this.data.count = res.count
            this.sum = res.data[this.datakey.summarykey]
            this.$emit('update:customData', this.data)
          } else {
            this.data = res
            this.$emit('update:customData', res.data)
          }
        }
      })
    },
    searchFn(seachfrom) {
      this.pagedata.pageIndex = 1
      this.getData(seachfrom)
    },
    optionsFilter(opt, row) {
      let filter = true
      if (!opt.filter) {
        if (opt.role) {
          if (this.funlist.indexOf(opt.role) !== -1) {
            filter = true
          } else {
            filter = false
          }
        }
      } else {
        if (opt.role) {
          if (this.funlist.indexOf(opt.role) !== -1) {
            filter = true
          } else {
            filter = false
          }
        }
        if (typeof opt.filter === 'function') {
          filter = opt.filter(row)
        }
        Object.keys(opt.filter).forEach(key => {
          if (typeof opt.filter[key] === 'number') {
            if (opt.filter[key] !== row[key] * 1) {
              filter = false
            }
          } else {
            if (opt.filter[key].indexOf(row[key]) < 0) {
              filter = false
            }
          }
        })
      }
      return filter
    },
    styleFn({ row, column, rowIndex, columnIndex }) {
      let style = {}
      if (this.nostyle) {
        style = {}
      } else {
        if (row.handlingStatus === -1) {
          style = {
            color: 'rgb(160, 160, 160)'
          }
        } else if (row.handlingStatus === 0) {
          style = {
            color: 'red',
            fontWeight: 'bold'
          }
        }
      }
      return style
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('checked', this.multipleSelection)
    },
    filechange(opt, td, index, file) {
      if (opt.event) {
        opt['event']({ data: this.data.data, row: td, index: index, checked: this.multipleSelection || false, file })
      }
    },
    tdClick(opt, td, index, i) {
      if (opt.path) {
        const query = {}
        if (opt.query) {
          opt.query.split('&').map(v => {
            if (v.indexOf('=') >= 0) {
              const arry = v.split('=')
              query[arry[0]] = arry[1]
            } else {
              query[v] = td[v] || ''
            }
          })
        }
        this.$router.push({ path: opt.path, query })
      }
      if (opt.href) {
        if (opt.target) {
          window.open(opt.href)
        } else {
          location.href = opt.href
        }
      }
      if (opt.click) {
        this.$emit(opt.click, td, index)
      }
      if (opt.type === 'select') {
        if (opt.options[i]['event']) {
          opt.options[i]['event']({ data: this.data.data, row: td, index: index, checked: this.multipleSelection || false })
        } else if (opt.options[i].path) {
          console
          const query = {}
          if (opt.options[i].query) {
            opt.options[i].query.split('&').map(v => {
              if (v.indexOf('=') >= 0) {
                const arry = v.split('=')
                query[arry[0]] = arry[1]
              } else {
                query[v] = td[v] || ''
              }
            })
          }
          this.$router.push({ path: opt.options[i].path, query })
        }
      }
      if (opt.event) {
        opt['event']({ data: this.data.data, row: td, index: index, checked: this.multipleSelection || false })
      }
    },
    changeSort(val) {
      const { prop, order } = val
      if (this.search) {
        const data = JSON.parse(JSON.stringify(Object.assign(this.$refs.search.searchform, { prop, order }))) || {}
        for (const i in data) {
          if (data[i] === '') {
            data[i] = null
          }
        }
        this.getData(data)
      } else {
        this.getData({ prop, order })
      }
    },
    changePagination(page) {
      this.pagedata = page
      if (this.search) {
        const newfrom = JSON.parse(JSON.stringify(this.$refs.search.searchform))
        for (let i = 0; i < this.$refs.search._search.length; i++) {
          const item = this.$refs.search._search[i]
          if (item.required) {
            if (!newfrom[item.model] && newfrom[item.model] !== 0) {
              this.$message.error(`${item.label}必填`)
              return false
            }
          }
          if (item.type === 'button') {
            delete newfrom[item.model]
          }
          if (item.model === 'searchName') {
            delete newfrom[item.model]
          }
          if (item.type === 'unselect') {
            const seachname = item.model.split(',')
            seachname.map((s, i) => {
              newfrom[s] = newfrom[item.model][i] || ''
            })
          }

          if (item.model === 'time' && item.type === 'dategroup') {
            if (newfrom.time.length !== 0) {
              newfrom['start'] = newfrom.time[0]
              newfrom['end'] = newfrom.time[1]
              delete newfrom.time
            }
          }
          if (item.type === 'float') {
            newfrom[item.model] = parseFloat(newfrom[item.model]) || null
          }
          if (item.type === 'number') {
            newfrom[item.model] = parseInt(newfrom[item.model]) || null
          }

          if (item.type === 'select') {
            if (newfrom[item.model] === 0) {
              newfrom[item.model] = 0
            } else {
              newfrom[item.model] = newfrom[item.model] || null
            }
          }

          if (item.type === 'section') {
            if (item.valuetype === 'number') {
              newfrom[item.left] = parseInt(newfrom[item.left]) || null
              newfrom[item.right] = parseInt(newfrom[item.right]) || null
            }
            if (item.valuetype === 'float') {
              newfrom[item.left] = parseFloat(newfrom[item.left]) || null
              newfrom[item.right] = parseFloat(newfrom[item.right]) || null
            }
          }
          if (item.type === 'timegroup') {
            newfrom[item.left] = newfrom[item.model] && newfrom[item.model][0] ? newfrom[item.model][0] : null
            newfrom[item.right] = newfrom[item.model] && newfrom[item.model][1] ? newfrom[item.model][1] : null
            delete newfrom[item.model]
          }
          if (item.type === 'timemonth') {
            newfrom[item.left] = newfrom[item.model] && newfrom[item.model][0] ? newfrom[item.model][0] : null
            newfrom[item.right] = newfrom[item.model] && newfrom[item.model][1] ? newfrom[item.model][1] : null
            delete newfrom[item.model]
          }
          if (item.type === 'timedate') {
            newfrom[item.left] = newfrom[item.model] && newfrom[item.model][0] ? newfrom[item.model][0] : null
            newfrom[item.right] = newfrom[item.model] && newfrom[item.model][1] ? newfrom[item.model][1] : null
            delete newfrom[item.model]
          }
        // if (item.type === 'cascader') {
        //   if (newfrom[item.model].length === 0) {
        //     newfrom[item.model] = null
        //   } else {
        //     newfrom[item.model] = newfrom[item.model] || null
        //   }
        // }
        }
        // const data = JSON.parse(JSON.stringify(this.$refs.search.searchform)) || {}
        // const searchdata = this.$refs.search.search
        // console.log('data', data, this.$refs.search.search)
        // for (const key in searchdata) {
        //   if (Object.prototype.toString.call(searchdata[key]) === '[object Object]') {
        //     console.log(searchdata[key])
        //     if (searchdata[key].required) {
        //       if (!data[searchdata[key].model] && data[searchdata[key].model] !== 0) {
        //         this.$message.error(`${searchdata[key].label}必填`)
        //         return false
        //       }
        //     }
        //   }
        // }
        // for (const i in data) {
        //   if (data[i] === '') {
        //     data[i] = null
        //   }
        // }
        this.getData(newfrom)
      } else {
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tablelist{
    background:rgba(255,255,255,1);
    opacity:1;
    border-radius:12px;
    .checked{
        margin-bottom: 12px;
    }
}
 tr {
      .is-hidden {
        display: table-cell;
        overflow: hidden;
      }
    }
.upload-demo{
  display: inline-block;
}
.table-link{
    margin: 0px 5px ;
}
.el-pagination{
    text-align: center;
}
.dysl{
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
