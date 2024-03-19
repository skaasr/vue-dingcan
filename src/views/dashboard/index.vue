<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="Echarts">
     
        <div id="dish"></div>
        
        <div id="order"></div>
      
      
        <div id="monthOrder" ></div>
        <div></div>
        


      </div>
     
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
//  setInterval(() =>{
//   this.initEchartsDish()
//  },1000)
 this.initEchartsOrder()
 this.initEchartsMonthOrder()
  },
  methods:{
    initEchartsDish(){
      // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('dish'));

// 绘制图表
myChart.setOption({
  title: {
    text: '热门菜品销量'
  },
  tooltip: {},
  xAxis: {
    data: ['鱼香肉丝', '糖醋里脊', '红烧茄子', '醋溜土豆丝', '韭菜炒蛋']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]
    }
  ]
});
    },
    initEchartsOrder(){
      var myChart = echarts.init(document.getElementById('order'));
      myChart.setOption({
        tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '上周订单记录表',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },  
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '星期日' },
        { value: 735, name: '星期六' },
        { value: 580, name: '星期五' },
        { value: 484, name: '星期四' },
        { value: 300, name: '星期三' },
        { value: 484, name: '星期二' },
        { value: 300, name: '星期一' }
      ]
    }
  ]
})
    },
    /**
     * 每月总订单数销量
     */
    initEchartsMonthOrder(){
      var myChart = echarts.init(document.getElementById('monthOrder'));
      myChart.setOption( {
        title: {
    text: '每月订单总销量'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320,980, 330, 150, 890, 460],
      type: 'line',
      smooth: true
    }
  ]
})
    }
  }
 
}
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
.Echarts{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
   align-content: space-between;
   
  div{
    margin-bottom: 30px;
    width: 800px;
    height: 350px;
    // background: pink;
  }
   
   
}

</style>
