<template>
  <span class="pic" :style="{width:picwidth,height:picheight,lineHeight:picheight}">{{ comname() }}</span>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['width', 'height', 'name'],
  data() {
    return {
      picwidth: this.width || '100%',
      picheight: this.height || '100%',
      picname: this.name || '游客'
    }
  },
  methods: {
    comname() {
      const len = this.picname.length
      let Name = ''
      if (len === 1) {
        Name = this.picname
      } else if (len === 2) {
        Name = this.picname
      } else if (len === 3) {
        Name = this.picname.substring(1, 3)
      } else if (len === 4) {
        Name = this.picname.substring(2, 4)
      } else {
        Name = this.picname.substring(0, 2)
      }
      return Name
    }
  }
}
</script>
<style lang='scss' scoped>
.pic {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #409EFF;
  color: #fff;
  font-size: 12px;
  padding: 2px;
  text-align: center;
  border-radius: 50%;
}
</style>
