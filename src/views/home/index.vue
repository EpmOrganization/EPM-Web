<template>
  <div v-loading="loading">
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="contant-item">
          <div class="title">通知提醒</div>
          <table class="w-table">
            <tr>
              <td class="pl18">有<span class="red">{{ peonum }}</span>个预付费客户的余额已到预警线</td>
              <td><el-button type="text" size="medium" @click="$router.push({path:'/reports/accountagewarning'})">查看</el-button></td>
            </tr>
            <tr>
              <td class="pl18">有<span class="red">{{ yj }}</span>个后付费客户的应收账单已到账期预警</td>
              <td><el-button type="text" size="medium" @click="$router.push({path:'/reports/accountagewarning'})">查看</el-button></td>
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="24" class="mt20">
        <div class="contant-item dj">
          <div class="title">待审核单据</div>
          <el-row :gutter="24">
            <el-col :span="4" class="item">
              <router-link to="/customer/audit">
                <h1>{{ pending.customerPendingCount }}</h1>
                <p>客户</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/customer/distributions">
                <h1>{{ pending.customerAllotCount }}</h1>
                <p>客户分配单</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/contract/contractaudit">
                <h1>{{ pending.contractPendingCount }}</h1>
                <p>合同</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/accountexamine">
                <h1>{{ pending.accountPendingCount }}</h1>
                <p>新建账户</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/customer/newnameaudit">
                <h1>{{ pending.clientRenameLogCount }}</h1>
                <p>客户更名</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/payment/examine">
                <h1>{{ pending.adjustingOrderCount }}</h1>
                <p>调整单</p>
              </router-link>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="4" class="item">
              <router-link to="/payment/paymentto">
                <h1>{{ pending.payingRecordCount }}</h1>
                <p>打款记录</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/supplier/supplier_examine">
                <h1>{{ pending.providerCount }}</h1>
                <p>供应商</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/supplier/suppliereditname">
                <h1>{{ pending.providerRenameRecordCount }}</h1>
                <p>供应商更名</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/basicDataSettings/batchexamine?type=1">
                <h1>{{ pending.billReminderCount }}</h1>
                <p>标准账期表</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/basicDataSettings/batchexamine?type=4">
                <h1>{{ pending.customerDayWarningCount }}</h1>
                <p>日调用预警表</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/basicDataSettings/batchexamine?type=3">
                <h1>{{ pending.businessFeeRateCfgCount }}</h1>
                <p>商务费比例表</p>
              </router-link>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="4" class="item">
              <router-link to="/account/accountexamine?name=second">
                <h1>{{ pending.froozeLoginUserCount }}</h1>
                <p>账户冻结</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/accountexamine?name=third">
                <h1>{{ pending.unFroozeLoginUserCount }}</h1>
                <p>账户解冻</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/delayexamine?name=first">
                <h1>{{ pending.addServiceAuditCount }}</h1>
                <p>测试账户新增服务</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/delayexamine?name=second">
                <h1>{{ pending.serviceUsageCount }}</h1>
                <p>测试账户用量申请</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/delayexamine?name=third">
                <h1>{{ pending.serviceStopCount }}</h1>
                <p>测试账户服务停用</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/account/delayexamine?name=fourth">
                <h1>{{ pending.serviceEnableCount }}</h1>
                <p>测试账户服务启用</p>
              </router-link>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="4" class="item">
              <router-link to="/account/delayexamine?name=fifth">
                <h1>{{ pending.serviceDelayCount }}</h1>
                <p>测试账户服务延期</p>
              </router-link>
            </el-col>
            <el-col :span="4" class="item">
              <router-link to="/bill/ownlistaudit">
                <h1>{{ pending.ownCount }}</h1>
                <p>应收预收核销</p>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="contant-item mt20">
          <div class="title">合同到期提醒</div>
          <table class="w-table">
            <tr>
              <th>客户名称（账号）</th>
              <th>合同编号</th>
              <th>过期时间</th>
            </tr>
            <tr v-for="(item,index) in tablelist" :key="index">
              <td class="txc">{{ item.partyA }}</td>
              <td class="txc">{{ item.number }}</td>
              <td class="txc">{{ item.endTime }}</td>
            </tr>

          </table>
          <div v-if="!tablelist.length">
            <div class="nodata">
              <div>
                <img src="@/assets/nodata.png" alt="">
                <p>未查询到任何数据！</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      peonum: '',
      pending: {},
      loading: false,
      tablelist: [],
      yj: ''
    }
  },
  // async created() {
  //   this.loading = true
  //   const { count: num } = await this.WarningAmountRemind()
  //   this.peonum = num
  //   const { data } = await this.Pending()
  //   this.pending = data
  //   const { data: arr } = await this.GetExpireNotice()
  //   this.tablelist = arr
  //   const { count: yj } = await this.GetBillNotice()
  //   this.yj = yj
  //   this.loading = false
  // },
  methods: {
    ...mapActions('home', ['WarningAmountRemind', 'Pending', 'GetExpireNotice', 'GetBillNotice'])
  }
}
</script>

<style scoped lang='scss'>
.nodata{
    padding: 30px;
    height: 300px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    p{
        margin: 0;
        line-height:30px ;
        color: #909399;
        margin-top: 20px;
        font-size: 13px;
        display: block;
        width: 100%;
    }
}
.contant-item{
  min-height: 200px;
  box-shadow: 0 1px 15px rgba(0, 21, 41, 0.08);
  padding: 0px 20px 20px 20px;
  border-radius: 8px;
  &::after{
    content: '';
    clear: both;
    display: block;
    height: 0;
  }
  .title{
    height: 65px;
     position: relative;
    line-height: 65px;
    &::before{
      content: '';
      display: block;
      width: 6px;
      height: 20px;
      background: #409EFF;
      position: absolute;
      left: -20px;
      top: 23px;
    }
  }
  .w-table{
    width: 100%;
    border: 1px solid #DDDFE5;
    border-collapse: collapse;
    th{
      background: #f8f9fb;
      font-size: 16px;
      color: #27282a;
      font-weight: 400;
    }
    tr{
      border: 1px solid #DDDFE5;
      color: #606266;
      line-height: 40px;
      font-size: 16px;
      .red{
        color: #ff0000;
      }
    }
    .txc{text-align: center;width: 33.333%;}
    .pl18{
      padding-left: 18px;
    }
  }
  .item{
    cursor: pointer;
  }
}
.dj{
  h1{
    font-weight: 500;
    font-size: 36px;
    color: #409eff;
    text-align: center;
    line-height: 40px;
    margin: 0;
    padding-top: 32px;
  }
  p{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #606266;
    line-height: 40px;
    margin: 0;
  }
}
</style>
