<template>
  <div>
    <div :id="id" :style="option.style" :chart="chart" />
  </div>

</template>
<script>
import HighCharts from 'highcharts'
import loadMap from 'highcharts/modules/map.js'
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(HighCharts)
// import loadStock from "highcharts/modules/stock.js";
// import loadGantt from "highcharts/modules/gantt.js";

loadMap(HighCharts)

// loadStock(HighCharts);
// loadGantt(HighCharts);
HighCharts.setOptions({
  lang: {
    'thousandsSep': ','
  }
})
export default {
  name: 'Hightchart',
  // 验证类型
  props: {
    id: {
      type: String,
      default: '',
      requires: false
    },
    option: {
      type: Object,
      default: () => {},
      requires: false
    },
    type: {
      type: String,
      default: '',
      requires: false
    }
  },
  data() {
    return {
      chart: {}
    }
  },
  mounted() {
    if (this.type === 'map') {
      // 地图
      this.chart = HighCharts.mapChart(this.id, this.option)
    } else {
      // 普通图
      this.chart = HighCharts.chart(this.id, this.option)
    }
  }
}
</script>
