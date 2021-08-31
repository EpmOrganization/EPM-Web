<template>
  <div class="nodata">
    <div>
      <img src="@/assets/nodata.png" alt="">
      <p>未查询到任何数据！</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
