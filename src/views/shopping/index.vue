<template>
  <div class="container">
    <div class="app-container">
        <el-button type="danger" style="float: right;" @click="cleanShoppingCart" >清空购物车</el-button>
        <el-table
    :data="records"
    stripe
    class="tableBox">
    <el-table-column
      prop="name"
      label="菜品名称">
    </el-table-column>
    <el-table-column
      prop="image"
      label="菜品图片">
      <template v-slot="{row}">
        <el-avatar shape="square" :size="80" :src="require('../../assets/common/'+ row.image)"></el-avatar>
    </template>
    </el-table-column>
    <el-table-column
      prop="userId"
      label="用户id">
    </el-table-column>
    <el-table-column
      prop="dishId"
      label="菜品id">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="下单时间">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="价格">
    <template v-slot="{ row}  ">
 {{ row.amount* row.number  }}
    </template>
    </el-table-column>
  <el-table-column
      label="操作" >
      <template v-slot="{ row }">
      <el-button type="text"  @click="deleteSingleShopping(row)">删除</el-button>
    </template>
    </el-table-column>
  </el-table>
<el-button style="float: right; margin-top: 10px; margin-right: 10px;" round  type="primary" @click="getOrder">去下单</el-button>
<el-dialog
  title="添加菜品备注信息"
  :visible.sync="remarkShow"
  width="30%">
  <el-input   type="textarea"
  placeholder="请输入内容"
  v-model="textarea"
  maxlength="30"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="btnCancel">不需要,谢谢</el-button>
    <el-button type="primary" @click="btnOk">确 定</el-button>
  </span>
</el-dialog>

</div>
  </div>
</template>

<script>
import  { queryShopping, deleteSingleShopping, cleanShoppingCart } from '@/api/shopping'
import  { sumbitOrder  } from '@/api/order'
import { getMenudata } from '@/api/menu'
export default {
    data(){
        return {
            records:[],
            remarkShow:false,
            textarea:''
        }
    },
    name:'Shopping',
    mounted(){   
    this.getMenudata()
    this.queryShopping()
    },
    methods:{
      async getMenudata(){
      let result  =  await getMenudata()
      console.log(result);
      },
    /**
     * 确定备注信息
     */
    async btnOk(){
     this.btnCancel()
     },
      /**
       * 取消备注信息
       */
      async btnCancel(){
        let sum = 0
        this.records.forEach(item => {
          sum+=item.amount
        })
        let result  = await sumbitOrder({amount:sum,remark:this.textarea})
        this.$router.push('/order')
       },
      /**
       * 下订单
       */
       async getOrder(){
      if(this.records.length == 0){
        this.$message.error('购物车不能为空!')
      }else{
        this.remarkShow = true
      }
   
      //  let result  = await sumbitOrder({amount:132,remark:'微辣,不要香菜'})
      //  if(result.code == 1){
      //   this.$message.success('下单成功')
      //  }else{
      //   this.$message.error(result.msg)
      //  }
      //  console.log(result);
       },
        /**
         * 查询购物车商品
         */
        async queryShopping(){
         let result =   await queryShopping()
         console.log(result);
         this.records = result.data
         },
         /**
          * 删除购物车商品  ToDo (删除暂不可用!)
          */
         async deleteSingleShopping(row){
          let result  =  await deleteSingleShopping({dishId:row.id})
         if(result.code === 1){
            this.$message.success('删除成功')
            this.queryShopping()
         }
          },
          /**
           * 清空购物车
           */
          async cleanShoppingCart(){
            let result  =await cleanShoppingCart()
            if(result.code == 1){
                   this.$message.success('清除成功!')
                   this.queryShopping()
            }
           }
    }
}
</script>

<style>

</style>