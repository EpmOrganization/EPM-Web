<template>
  <div class="pagination">
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40 ,50]"
      :current-page="currentpage"
      :hide-on-single-page="false"
      @size-change="sizechange"
      @current-change="_currentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 10,
      requires: false
    },
    currentpage: {
      type: Number,
      default: 1,
      requires: false
    }
  },
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    total() {
      return this.count
    }
  },
  methods: {
    sizechange(val) {
      this.pageSize = val
      this.$emit('current-change', {
        pageIndex: this.currentpage,
        pageSize: this.pageSize
      })
    },
    _currentChange(val) {
      this.$emit('current-change', {
        pageIndex: val,
        pageSize: this.pageSize
      })
    }
  }
}
</script>

<style scoped>
.pagination { display: block; text-align: center; }
</style>
