<template>
    <div class="container">
      <div class="app-container">
    <div>
        <div style="margin-bottom: 20px;margin-left: 50px;">新建分类</div>
        <el-form :model="categoryForm" :rules="categoryrules" ref="categoryForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="name">
    <el-input v-model="categoryForm.name" style="width: 15%;"></el-input>
  </el-form-item>
  <el-form-item label="分类状态" prop="delivery">
    <el-switch v-model="categoryForm.status"></el-switch>
  </el-form-item>
  <el-form-item label="创建分类用户" prop="createName">
    <el-input v-model="categoryForm.createName" style="width: 20%;"></el-input>
  </el-form-item>
  <el-form-item label="更新分类用户" prop="updateName">
    <el-input v-model="categoryForm.updateName" style="width: 20%;"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="btnOk">确定</el-button>
    <el-button @click="btnCancel">取消</el-button>
  </el-form-item>
</el-form>
    </div>
      </div>
    </div>
  </template> 
  
  <script>
  import { addCategory } from '@/api/category'
  export default {
          name:'addCategory',
          data() {
      return {
        categoryForm: {
          name:'',// 分类名称
          status:false,// 分类状态
          createName:'',//创建人名字
          updateName:''
        },
        categoryrules: {
            name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
        }
    }
},
methods:{
    /**
     * 新增分类成功
     */
    btnOk(){
        this.$refs.categoryForm.validate( async (isOK) =>{
            if(isOK){
                this.categoryForm.status =  this.categoryForm.status === false?'0':'1'
                let result = await  addCategory(this.categoryForm)
               if(result.code == 1){
                this.btnCancel()
                this.$message.success('新增成功O(∩_∩)O')
             }
            }
        })
    },
    /**
     * 新增分类取消
     */
    btnCancel(){
        this.$refs.categoryForm.resetFields(),
        this.$router.push('/category')
    }
}
  }
  </script>
  
  <style>
  
  </style>