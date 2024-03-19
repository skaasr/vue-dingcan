<template>
  <div class="cotainer">
    <div class="app-container">
        <div class="dishItem">
            <div class="dishimg">
                <img :src="require('@/assets/common/' + this.$route.query.item.image)" alt="美食" style="width: 300px;
                height: 300px;">
            </div>
            <div class="dishdetail">
                <div class="dishname">{{this.$route.query.item.name}}</div>
               <div class="dish-common">
                <div class="dishprice">{{this.$route.query.item.price}}￥ </div>
                <!-- <div>菜品分类:荤菜</div> -->
                <span>评分:</span>
                <el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate>

               </div>
              
              <div class="description" style="margin-top: 15px;"> {{this.$route.query.item.description }}</div>
               <div class="dish-num">
                <el-link icon="el-icon-caret-right
" :underline="false" type="success">月售:500+</el-link>
<!-- <el-link icon="el-icon-caret-right
" :underline="false">配送: 40分钟</el-link> -->
<el-link icon="el-icon-caret-right
" :underline="false" type="success">好评度: 100%</el-link>
<el-link icon="el-icon-caret-right
" :underline="false" type="success">折扣: 6.38折</el-link>
               </div>
               <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" style="margin-top: 50px; margin-left: 15px;"></el-input-number>
               <el-button type="primary" style="margin-top: 30px; " @click="addShoppingCart">加入购物车</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { addShoppingCart } from '@/api/shopping'
import store from '@/store';
export default {
       name:"dishDetail",
       data() {
        return{
            value:5,     // 评分星数
            num:"1" ,     //计数器 
            stepValue:'' // 计数器值
        }
       },
       
    //    computed:{
    //     /**
    //      * 获取菜品详情页信息
    //      */
    //      getDishdetail(){
    //         return this.$route.query
    //      }
    //    },
       created(){
        console.log(this.$route);
       
       },
       methods:{
        handleChange(val){
           this.stepValue = val
        },
        /**
         * 加入购物车
         */
        async addShoppingCart(){
         const { id , price } = this.$route.query.item
         let data = {dishId:id,userId:store.getters.userId,number:this.stepValue}
         console.log(data);
         const result =  await  addShoppingCart(data)
         if(result.code == 1){
            this.$message.success('加入购物车成功')
            this.$router.push('/shopping')
         }
         }
       }
       
}
</script>

<style scoped>

.dishItem{
    width: 600px;
    height: 500px;
    /* border: 1px solid black; */
    display: flex;
    gap: 15px;
}
.dish-common{
    display: flex;
    margin-top: 20px;
    gap: 15px;
}
.dish-num{
    margin-top: 30px;
    font-size: 10px;
    font-weight: 50;
   display: flex;
   /* flex-direction: column; */
  
   
}
.dishdetail{
    display: flex;
    flex-direction: column;
    
}


</style>