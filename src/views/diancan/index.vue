<template>
  <div class="container">
    <div class="app-container">
       <div class="buyall">
        <div class="search">
            <div class="search-input" style="margin-top: 20px;">
                <div class="searchdish" style="margin-left: 80px;margin-bottom: 20px;font-weight: 1000;">搜索菜品</div>
                <el-input placeholder="请输入菜名" style="width: 200px;margin-left: 5px;" v-model="dishName"></el-input>
            <el-button type="primary" style="margin-left: 15px;" @click="queryDishByName">搜索</el-button>
            </div>
            </div>
           
        <div class="buy-right">
            <div class="buy-right-item" v-for="(item,index) in records" :key="item.id" >
               <div style="height: 120px; width: 100px; background-color: gray;border-radius:10px ;" @click="$router.push({name:'dishDetail',query:{item:item}})" >
                <img :src="require('@/assets/common/' + item.image)" :alt="item.name" :title="item.name" style="width: 100px;
                height: 100px;"></div>
               <el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate>
<el-link :underline="false">菜名:{{ item.name }}</el-link>
<el-link :underline="false" >价格:{{item.price}}￥</el-link>
                <!-- <span class="dishname" ></span> -->
                <!-- <span class="price"></span> -->
            </div>
        </div> 
       </div>
    </div>
  </div>

</template>

<script>
import { queryDishByPage } from '@/api/dish'

export default {
        name:'buy',
        data(){
            return {
                value:5,
                records:[],
                dishName:'',
                
            }
        },
        methods:{
            
            /**
             * 根据菜名显示菜品
             */
            async queryDishByName(){
            let result =  await  queryDishByPage({page:1,pageSize:100,name:this.dishName})
            this.records = result.data.records
             },
            /**
             * 获取菜品
             */
            async queryDishByPage(){
            let result = await   queryDishByPage({page:1,pageSize:100})
            console.log(result);
            this.records = result.data.records
             }
        },
        created(){
            this.queryDishByPage()
        }

}
</script>

<style scoped>
.buyall{
 display: flex;
 gap: 30px;
}
.search{
    width: 300px;
    height: 600px;
    /* border: 1px solid black; */
}
.buy-right-item{
    align-items: center;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
    width: 150px;
}

.buy-right{
    margin-left: 80px;
    width: 1200px;
    display: flex;
    height: 200px;
    gap: 20px;
    flex-wrap: wrap;
}

</style>