<template>
  <div>
    <!-- <div>
      324234234
    </div> -->
    <!-- 图表位置 -->
    <x-chart id="charts" ref="charts" type="chart" :option="chartsOptions" />
  </div>
</template>

<script>
import HighCharts from 'highcharts'
// import { mapActions } from 'vuex'
HighCharts.setOptions({
  // 所有语言文字相关配置都设置在 lang 里
  lang: {
    resetZoom: '重置缩放比例', // 若图标设置了缩放功能，当鼠标选中数据列的连续点或者区域时会出现缩放按钮，此选项设置了按钮上的文字
    resetZoomTitle: '重置缩放比例'// 此选项为鼠标悬浮在按钮上后显示的提示文字
  }
})
export default {
  data() {
    return {
      searchform: {
        type: 1,
        time: [],
        customer: '',
        service: ''
      },
      rules: {
        time: [{ required: true, message: '  ', trigger: 'change' }]
      },
      chartsOptions: {
        chart: {
          zoomType: 'x'
        },
        style: {
          height: ''
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false // 不显示LOGO
        },
        xAxis: {
          type: 'datetime',
          categories: []
        //   dateTimeLabelFormats: {
        //     millisecond: '%H:%M:%S.%L',
        //     second: '%H:%M:%S',
        //     minute: '%H:%M',
        //     hour: '%H:%M',
        //     day: '%m-%d',
        //     week: '%m-%d',
        //     month: '%Y-%m',
        //     year: '%Y'
        //   }
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                // eslint-disable-next-line new-cap
                [0, new HighCharts.getOptions().colors[0]],
                [1, new HighCharts.Color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: '耗用量',
          data: [
            {
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true
            }, {
              name: 'Internet Explorer',
              y: 11.84
            }, {
              name: 'Firefox',
              y: 10.85
            }, {
              name: 'Edge',
              y: 4.67
            }, {
              name: 'Safari',
              y: 4.18
            }, {
              name: 'Sogou Explorer',
              y: 1.64
            }, {
              name: 'Opera',
              y: 1.6
            }, {
              name: 'QQ',
              y: 1.2
            }, {
              name: 'Other',
              y: 2.61
            }]
        }]
      }
    }
  }
//   mounted() {
//     this.chartsOptions.style.height = document.body.clientHeight - this.$refs.SearchArea.offsetHeight - 100 + 'px'
//     window.onresize = () => {
//       return (() => {
//         this.chartsOptions.style.height = document.body.clientHeight - this.$refs.SearchArea.offsetHeight - 100 + 'px'
//       })()
//     }
//   }
//   methods: {
//     ...mapActions('reports', ['GetCustomerUsedTrend']),
//     removetime() {
//       this.searchform.time = []
//     },
//   }
}
</script>

<style lang='scss' scoped>
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
.nodata{
    padding: 30px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      display: block;
      margin: 10px auto;
    }
    p{
        margin: 0;
        line-height:30px ;
    }
}
</style>

