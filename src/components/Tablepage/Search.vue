<template>
  <div class="fn SearchArea">
    <div class="SearchAreaLeft clear">
      <el-form
        ref="searchform"
        :inline="true"
        :model="searchform"
      >

        <el-form-item
          v-for="(input,index) in _search"
          :key="index"
          :label="input.label"
          :class="{section:input.type==='section'}"
          :rules="{required:input.required || false,trigger: 'blur',message:`${input.label}必填`}"
        >
          <div v-if="input.type&&input.type=='special'">
            <el-select
              v-model="selected"
              class="special"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,i) in input.optionKey"
                :key="i"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-model="searchform[selected]"
              placeholder="请输入内容"
              class="special-model"
            />
          </div>
          <div v-if="input.type&&input.type=='section'" class="section">
            <el-input v-model="searchform[input.left]" :placeholder="input.left_label" /> ~ <el-input v-model="searchform[input.right]" :placeholder="input.right_label" />
          </div>

          <el-input
            v-if=" input.type&& input.type=='text'"
            v-model="searchform[input.model]"
            :placeholder="input.label"
          />
          <el-input
            v-if=" input.type&& input.type=='float'"
            v-model="searchform[input.model]"
            :placeholder="input.label"
          />
          <!-- <el-input
            v-if="input.type&& input.type=='number'"
            v-model.number="searchform[input.model]"
            :placeholder="input.label"
          /> -->
          <el-input
            v-if=" input.type&& input.type=='number'"
            v-model="searchform[input.model]"
            v-Int
            :placeholder="input.label"
          />
          <!-- <el-input-number
            v-if="input.type&& input.type=='number'"
            v-model.number="searchform[input.model]"
            controls-position="right"
            :min="1"
            :placeholder="input.label"
          /> -->
          <el-select
            v-if="input.type=='select-multiple'"
            v-model="searchform[input.model]"
            multiple
            :placeholder="input.label"
            filterable
          >
            <el-option
              v-for="(select,i) in input.options"
              :key="i"
              :label="select.label"
              :value="select.value"
            />
          </el-select>
          <el-select
            v-if="input.type=='select' || input.type=='radio'"
            v-model="searchform[input.model]"
            :placeholder="input.label"
            clearable
            filterable
          >
            <el-option
              v-for="(select,i) in input.options"
              :key="i"
              :label="select.label"
              :value="select.value"
            />
          </el-select>

          <el-select
            v-if="input.type=='checkbox'"
            v-model="searchform[input.model]"
            :placeholder="input.label"
            multiple
            filterable
          >
            <el-option
              v-for="(select,i) in input.options"
              :key="i"
              :label="select.label"
              :value="select.value"
            />
          </el-select>

          <el-cascader
            v-if="input.type=='cascader'"
            v-model="searchform[input.model]"
            :options="input.options"
            :props="input.props"
            clearable
            :show-all-levels="false"
          />

          <el-date-picker
            v-if="input.type=='date'"
            v-model="searchform[input.model]"
            type="date"
            :placeholder="input.label"
            value-format="yyyy-MM-dd"
          />

          <el-date-picker
            v-if="input.type=='month'"
            v-model="searchform[input.model]"
            type="month"
            :placeholder="input.label"
            value-format="yyyy-MM"
          />
          <el-date-picker
            v-if="input.type=='dismonth'"
            v-model="searchform[input.model]"
            type="month"
            :placeholder="input.label"
            value-format="yyyy-MM"
            :picker-options="expireTimeOption"
          />
          <el-date-picker
            v-if="input.type=='year'"
            v-model="searchform[input.model]"
            type="year"
            :placeholder="input.label"
            value-format="yyyy"
          />

          <el-date-picker
            v-if="input.type=='dategroup'"
            v-model="searchform[input.model]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          />

          <el-date-picker
            v-if="input.type == 'time'"
            v-model="searchform[input.model]"
            type="datetime"
            :placeholder="input.label"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
          <el-date-picker
            v-if="input.type=='timemonth'"
            v-model="searchform[input.model]"
            type="monthrange"
            class="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM"
          />
          <el-date-picker
            v-if="input.type == 'end_time'"
            v-model="searchform[input.model]"
            type="datetime"
            :placeholder="input.label"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="'23:59:59'"
          />

          <el-date-picker
            v-if="input.type=='Alonetime'"
            v-model="searchform[input.model]"
            type="date"
            :placeholder="input.label"
            value-format="yyyyMMdd"
          />

          <el-date-picker
            v-if="input.type=='timegroup'"
            v-model="searchform[input.model]"
            type="datetimerange"
            class="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item v-if="isShowSubmit">
          <el-button
            type="primary"

            @click="onSubmit"
          >
            查询
          </el-button>
        </el-form-item>
        <el-form-item v-if="isShowSubmit">
          <el-button
            @click="resetForm()"
          >
            重置
          </el-button>
        </el-form-item>
        <el-form-item class="right">
          <!-- eslint-disable-next-line max-len -->
          <el-button
            v-for="(btn,i) in filterbtn"
            :key="i"
            type="primary"
            @click="btnclick({searchform,data,btn})"
          >
            {{ btn.name }}
          </el-button>
          <el-upload
            v-for="(btn,index) in filterup"
            :key="'upload-'+index"
            class="upload"
            action
            :file-list="fileList"
            :auto-upload="false"
            :show-file-list="false"
            :limit="1"
            :on-change="
              (file, filename) => {
                btnclick({file, filename,searchform,data,btn});
              }
            "
          >
            <el-button
              slot="trigger"
              type="primary"
            >
              {{ btn.name }}
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Seach',
  props: {
    search: {
      type: Object,
      default: () => {},
      requires: false
    },
    isShowSubmit: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => [],
      requires: false
    },
    checkedAll: {
      type: Boolean
    }
  },
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() < 1609430400000
        }
      },
      searchform: {},
      selected: '',
      fileList: []
    }
  },
  computed: {
    _search() {
      const newsearch = []
      Object.keys(this.search).forEach(key => {
        if (typeof this.search[key] === 'string') {
          newsearch.push({
            type: 'text',
            label: this.search[key],
            model: key
          })
        } else {
          if (this.isArray(this.search[key])) {
            newsearch.push({
              type: 'special',
              optionKey: this.search[key],
              selected: this.search[key][0].value
            })
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.selected = this.search[key][0].value
          } else {
            // eslint-disable-next-line
                        this.search[key].model = key
          }
          newsearch.push(this.search[key])
        }
      })
      newsearch.forEach((item, index) => {
        if (this.isArray(item)) {
          newsearch.splice(index, 1)
        }
      })
      return newsearch
    },
    filterbtn() {
      const btnlist = this._search.filter((item) => {
        return item.type === 'button'
      })
      return btnlist
    },
    filterup() {
      const btnlist = this._search.filter((item) => {
        return item.type === 'upload'
      })
      return btnlist
    }
  },
  watch: {
    'selected': {
      handler: function(val, oldval) {
        // eslint-disable-next-line no-unused-vars
        Object.keys(this.searchform).forEach(key => {
          delete this.searchform[oldval]
        })
        this.$set(this.searchform, val, '')
      }
    }
  },
  created() {
    var lett = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key === 13) {
        lett.enterSearchMember()
      }
    }
  },
  mounted() {
    this.searchform = this._searchform() || {}
  },
  methods: {
    enterSearchMember() {
      this.onSubmit()
    },
    resetForm() {
      this.searchform = this._searchform() || {}
      this.onSubmit()
    },
    onSubmit() {
      const newfrom = JSON.parse(JSON.stringify(this.searchform))
      for (let i = 0; i < this._search.length; i++) {
        const item = this._search[i]
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
      this.$emit('searchFn', newfrom)
    },
    changes(inputs, model) {
      if (inputs.parent) {
        const parentNode = inputs.parent.map(v => {
          return this.searchform[v]
        })
        inputs.parentNode = parentNode
      }
      if (inputs.change) {
        inputs['change']({ inputs, model })
      }
    },
    // eslint-disable-next-line no-unused-vars
    fileUpload(file, fileList) {

    },
    _searchform() {
      const vmodel = {}
      this._search.forEach(v => {
        if (v.type === 'special') {
          vmodel[v.selected] = v.default || null
        } else if (v.type === 'unselect') {
          vmodel[v.model] = v.default || []
        } else if (v.type === 'section') {
          vmodel[v.left] = v.default || null
          vmodel[v.right] = v.default || null
        } else if (v.type === 'select') {
          let o = null
          if (v.default === 0) {
            o = 0
          } else if (v.default) {
            o = v.default
          } else {
            o = null
          }
          vmodel[v.model] = o
        } else {
          vmodel[v.model] = v.default || null
        }
      })
      return vmodel
    },
    btnclick(data) {
      const newfrom = JSON.parse(JSON.stringify(data.searchform))
      for (let i = 0; i < this._search.length; i++) {
        const item = this._search[i]
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
      }
      data.checkedAll = this.checkedAll
      data.searchform = newfrom
      data.btn.event(data)
      if (data.btn.type === 'upload') {
        this.fileList = []
      }
    },
    isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]'
    }
  }

}
</script>
<style lang="scss" scoped>
.SearchArea{
  position: relative;
  margin-bottom: 10px;
  border: solid 5px#f2f2f2;
  padding: 10px 10px 0 10px;
}
.SearchArea .el-form-item {
  margin-bottom: 10px;
}
// .SearchAreaLeft {
//   margin-right: 80px;
// }
.SearchAreaRight {
  position: absolute;
  right: 10px;
  top: 10px;
}
.right{
    float:right ;
    margin-right: 30px;
}
.special{
    width: 100px;
}
.special-model{
    width:300px;
    display: inline-block;
    margin-left: 10px;
}
.upload{
    display: inline-block;
    margin-left: 10px;
}
.section{
   display: inline-block;
   .section{
    .el-input{
       display: inline-block;
       width: 150px;
    }
   }
}
.clear{
  &::after{
    content: '';
    display: block;
    height: 0;
    clear: both;
  }
}
</style>
