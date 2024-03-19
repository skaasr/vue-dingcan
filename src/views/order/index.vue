<template>
  <div class="container">
    <div class="app-container">
  <el-table
    :data="records"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="菜品名称:">
            <span v-for="(item,index) in props.row.orderDetailList" :key="item.id">{{ `${item.name}`+ ' ' }}  </span>
          </el-form-item>
          <el-form-item label="菜品图片:">
            <img
            v-for="(item,index) in props.row.orderDetailList" :key="item.id"
             :src="require('../../assets/common/'+ item.image)" 
            style="width: 100px; height: 100px;"
            :alt="props.row.orderDetailList[0].name">
            
          </el-form-item>
          <el-form-item label="菜品数量:">
            <span
            v-for="(item,index) in props.row.orderDetailList" :key="item.id"
            >{{ `${item.number}`+ '份 ' }}</span>
          </el-form-item>
          <el-form-item label="菜品单价:">
            <span
            v-for="(item,index) in props.row.orderDetailList" :key="item.id"
            >{{ `${item.amount}`+ '元 '}} </span>
          </el-form-item>
          <el-form-item label="菜品备注:">
            <span>{{ props.row.remark }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单号"
      prop="number">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="status">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="下单时间"
      prop="orderTime">
    </el-table-column>
    <el-table-column
      label="支付状态"
      prop="payStatus">
      <template v-slot="{ row } ">
      <span>{{  row.payStatus === 1 ? '已支付' : '未支付'  }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="amount">
    </el-table-column>
    <el-table-column
      label="备注信息"
      prop="remark">
    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot="{ row }">
         <el-button type="text" style="margin-right: 15px;" @click="queryOrderDetail(row)">查询</el-button>
         <el-button type="text" @click="cancelOrder(row)" slot="reference"  >{{ row.cancelReason === '用户取消'? '已取消': '取消' }}</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div style="float: right;margin-top: 15px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderParams.page"
      :page-sizes="[2, 5, 10]"
      :page-size="orderParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
import { getOrder, queryOrderDetail, cancelOrder } from '@/api/order'
export default {
    name:'Order',
    data() {
      return {
        records:[],
        orderParams:{
          page:1,
          pageSize:10,

        },
        total:0
      }
    },
    computed:{
   

      /**
       * 加空格
       */
      getEmpty(){
        return 1+String.fromCharCode(32)+String.fromCharCode(32)+2;
      }
    },
    created(){
      this.getHistoryOrder()
    },
    methods:{
      /**
       * 当前页数
       */
       handleCurrentChange(val){
        console.log(val);
        this.orderParams.page = val
        this.getHistoryOrder()
       },
      /**
       * 当前条数
       */
       handleSizeChange(val){ 
        this.orderParams.pageSize = val
        this.getHistoryOrder()
       },
      /**
       * 取消订单
       */
      async cancelOrder(row){ 
        let orderId = row.orderDetailList[0].orderId
        let result  =  await cancelOrder({id:orderId})
        if(result.code == 1){
          this.$message.success('取消成功')
          this.getHistoryOrder()
        }
       },
      /**
       * 查询订单详情
       */
      async queryOrderDetail(row){
        let orderId = row.orderDetailList[0].orderId
     let result  = await  queryOrderDetail({id:orderId})
     console.log(result);
       },
    /**
     * 查询历史订单
     */
    async  getHistoryOrder(){
       const result  =  await getOrder(this.orderParams)
       console.log(result);
       this.total = result.data.total
       this.records = result.data.records
      }
    }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>