<template>
  <div class="container">
    <div class="app-container">
      <div class="tableBar">
        <div class="content-left">
          <label style="margin-right: 10px;">菜品名称:</label>
          <el-input placeholder="请输入菜品名称" style="width: 15%;margin-right:15px" v-model="dishPageParams.name"></el-input>
          <label style="margin-right: 10px;">菜品分类:</label>
          <el-select v-model="value1" placeholder="请选择" style="margin-right: 15px;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
          <label style="margin-right: 10px;">售卖状态:</label>
          <el-select v-model="value2" placeholder="请选择" style="margin-right: 15px;">
            <el-option v-for="item in statusArray" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
          <el-button type="primary" @click="conditionQuery()">查询</el-button>
        </div>
        <div class="conten-right">
          <el-button type="danger" style="float: right;margin-right: 15px;" round @click="deleteDishs">批量删除</el-button>
          <el-button type="primary" style="float: right; margin-right: 15px;" round @click="addDish">+添加菜品</el-button>
        </div>
      </div>
      <el-table
    :data="records"
    stripe
    @selection-change="handleSelectionChange"
    class="tableBox">
    <el-table-column
    type="selection"
      width="60px">
    </el-table-column>
    <el-table-column
      prop="id"
      label="菜品id">
    </el-table-column>
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
<!--      
      <img :src="require(' @/assets/common/' + image)" alt="" style="height: 80px; width: 80px;"> -->
      <!-- <template v-slot="{row}">
        <el-image style="width: 80px; height: 40px; border: none;" :src="row.image" @click="P(row)" ></el-image></template> -->
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="菜品分类"
      style="margin-left: 5px;">
    </el-table-column>
    <el-table-column
      prop="price"
      label="菜品价格">
    </el-table-column>
    <el-table-column
      prop="status"
      label="售卖状态">
      <template v-slot="{ row }">
                        <span :class="{ 'stop-use': String(row.status) === '0' }">{{ row.status === 1 ? '启售' : '停售'
                            }}</span>
                    </template>
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="最后操作时间">
    </el-table-column>
  <el-table-column
      label="操作" >
      <template v-slot="{ row }">
      <el-button type="text" @click="queryDishById(row)">修改</el-button>
      <el-button type="text" @click="deleteDishById(row)" >删除</el-button>
      <el-button type="text" @click="startOrStop(row)" >{{ row.status === 1 ? '停售' : '启售'
                           }}</el-button>
    </template>
    </el-table-column>
  </el-table>
 <div style="margin-top: 15px;"> <el-pagination
  style="float: right;margin-right: 15px; "
  :page-sizes="[2, 5, 10, 20]"
  @size-change="changepageSize"
  @current-change="changepage"
    layout="total,sizes,prev, pager, next"
    :page-size="dishPageParams.pageSize"
    :current-page="dishPageParams.page"
    :total="total">
  </el-pagination></div>
  <el-drawer
  :title="showTitle"
  @close="btnCancel"
  :visible.sync="drawer"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  >
  <div class="demo-drawer__content">
    <el-form :model="dishForm" :rules="dishRules" ref="dishForm">
      <el-form-item label="菜品名称" prop="name">
        <el-input v-model="dishForm.name" placeholder="请输入菜品名称" ></el-input>
      </el-form-item>
      <el-form-item label="菜品价格" prop="price" >
        <el-input v-model="dishForm.price" placeholder="请输入菜品价格" ></el-input>
      </el-form-item>
      <el-form-item label="菜品图片" >
      <UploadImage :value="dishForm.image"></UploadImage>
      </el-form-item>
      <el-form-item label="菜品状态">
    <el-switch v-model="dishForm.status"></el-switch>
  </el-form-item>
  <el-form-item label="菜品分类" prop="categoryId">
    <el-select v-model="dishForm.categoryId" placeholder="请选择菜品分类">
      <el-option label="荤菜" value="1"></el-option>
      <el-option label="素菜" value="2"></el-option>
    </el-select>
  </el-form-item>
 <div style="margin-left: 50px;margin-top: 100px;">
  <el-form-item  >
        <el-button type="primary" @click="btnOk">确定</el-button>
        <el-button style="margin-left: 40px;" @click="btnCancel"> 取消</el-button>
      </el-form-item>
 </div>
    </el-form>
  </div>
</el-drawer>


    </div>
  </div>
</template>

<script>
import { queryDishByPage, addDish, deleteDish, setDish, queryDishById } from '@/api/dish'
import { qeuryCateByPage } from '@/api/category'
import UploadImage from '@/views/dish/component/uploadimage.vue'
export default {
  name: 'Setmeal',
  components:{
    UploadImage
  },
  data(){
    return{
      // showTitle:dishForm.id?'编辑':'新增',
      deleteArray:[],//批量删除数组
      drawer:false, // 控制抽屉
      dishForm:{
        id:'',
        categoryId:'',
        image:'',
        name:'',
        price:'',
        status:'true'
      },
      dishRules:{
        name: [
            { required: true, message: '请输入菜品名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入菜品价格', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在1-5', trigger: 'blur' }
          ],
          categoryId:[      
            { required: true, message: '请选择菜品分类', trigger: 'change' }      
          ]
      },
      dishPageParams:{
          name:'',
          status:'',
          categoryId:'',
          page:1,
          pageSize:10
      },
      total:0,
      records:[],
      options: [],
      value1: '',// 菜品分类
      value2:'',//起售，禁售
      statusArray:[
      {
          value: '1',
          label: '起售'
        }, {
          value: '0',
          label: '禁售'
        }
      ]
    }
  },
  name: '',//菜品名称
  created() {
    this.queryDishByPage()
    this.qeuryCateByPage()
  },
  computed:{
    /**
     * 标题展示 新增 Or 编辑
     */
    showTitle() {
      return this.dishForm.id? '编辑菜品':'新增菜品'
    }
  },
  methods: {
    P(row){
      console.log(row);
    },
     /**
      * 根据id查询菜品
      */
    async   queryDishById(row){
      this.drawer = true
    let result =   await  queryDishById(row.id)
    this.dishForm = result.data
      },    
    /**
     * 批量删除菜品
     * 
     */
     deleteDishs(){
    
     this.deleteArray.forEach( async item => {
      await deleteDish({ids:item.id})
     })
     this.$message.success('删除成功')
     this.queryDishByPage()
     
     },
     handleSelectionChange(val) {
       this.deleteArray = val
      },
    
    /**
     * 删除菜品
     */
    async deleteDishById(row){
    let result  = await deleteDish({ids:row.id})
    if(result.code == 1){
      this.$message.success('删除成功(*^_^*)')
      this.queryDishByPage()
    }else if(result.code == 0){
      this.$message.warning(result.msg)
    }else{
      this.$message.warning('网路出现问题，请稍后尝试/(ㄒoㄒ)/~~')
    }
     },
    /**
     * 新增菜品确定 /菜品名重复问题
     */
     btnOk(){
      this.$refs.dishForm.validate( async (isOK) =>{
            if(isOK){    
              let msg = '新增'      
                this.dishForm.status =  this.dishForm.status === false?'0':'1'
               if(this.dishForm.id){
                let result =  await setDish(this.dishForm)
                
                 msg = '编辑'
               } 
                let result = await  addDish(this.dishForm)
               
                
              
               if(result.code == 1){
                this.btnCancel()
                this.queryDishByPage()
                this.$message.success(`${msg}成功O(∩_∩)O`)
             }else{
              this.$message.warning(result.msg)
             }
            }
        })
     },
    /**
     * 新增菜品取消
     */
      btnCancel(){
        this.dishForm ={
          categoryId:'',
          image:'',
          name:'',
          price:'',
          status:'true'
        }
       
        this.$refs.dishForm.resetFields(),
        this.drawer = false
    },
    /**
     * 添加菜品
     */
     addDish(){
      this.drawer = true
     },
    /**
     * 起售/停售 TODO
     *   startOrStop(row){
         console.log(row);
         },
     */
   
    /**
     * 根据菜品名称/菜品状态/菜品分类进行模糊查询
     */
    conditionQuery(){
      let tempCate = this.value1 == '素菜'?"2":"1"
      this.dishPageParams.categoryId = tempCate
      this.dishPageParams.status = this.value2
      this.queryDishByPage()
    },
    /**
     * 当前条数
     */
     changepageSize(val){
      this.dishPageParams.pageSize = val
      this.queryDishByPage()
     },
    /**
     * 当前页数
     */
     changepage(val){
      this.dishPageParams.page = val
      this.queryDishByPage()
     },
    /**
     * 查询菜品分类
     */
     async qeuryCateByPage(){
      let result  = await qeuryCateByPage({
        page: 1,
        pageSize: 2,
      })
      this.options = result.data.records
     },
    /**
     * 分页查询菜品
     */
    async queryDishByPage() {
      let result = await queryDishByPage(this.dishPageParams)
      console.log(result);
      result.data.records.map(item => {
                item.updateTime = this.dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss")

            })
            
      this.total = result.data.total
      this.records = result.data.records
    }
  }
}
</script>

<style scoped>
.stop-use {
    color: red;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>