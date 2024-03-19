<template>
    <div class="container">
        <div class="app-container">
            <div class="tableBar" style="margin-bottom: 15px;">
                <label style="margin-right: 10px;">分类名称:</label>
                <el-input placeholder="请输入分类名称" style="width: 15%;" v-model="categoryParams.name"></el-input>
                <el-button style="margin-left: 20px;" type="primary" round @click="queryCateByname">查询</el-button>
                <el-button style="float: right;" type="primary" round @click="addCategory">+添加分类</el-button>
            </div>
            <el-table :data="records" style="width: 100% ;">
                <el-table-column prop="id" label="分类id">
                </el-table-column>
                <el-table-column prop="name" label="分类名称">
                </el-table-column>
                <el-table-column prop="status" label="分类状态">
                    <template v-slot="{ row }">
                        <span :class="{ 'stop-use': String(row.status) === '0' }">{{ row.status === 1 ? '启用' : '禁用'
                            }}</span>
                    </template>

                </el-table-column>
                <el-table-column label="分类状操作态">

                    <template v-slot="{ row }">
                        <el-button type="text" size="mini" @click="qeuryCateById(row)">修改</el-button>
                        <el-popconfirm @onConfirm="deleteCategory(row)" title="您确定要删除该分类吗？">
                            <el-button type="text" size="mini" slot="reference"
                                style="margin-right: 5px;margin-left: 5px;">删除</el-button>
                        </el-popconfirm>


                        <el-button type="text" size="mini" @click="handleStarOrStop(row)">{{ row.status === 1 ? '禁用' :
                    '启用' }}</el-button></template>
                </el-table-column>
            </el-table>
            <el-dialog title="编辑分类" v-show="dialogShow" :visible.sync="dialogShow" width="30%" @close="btnCancel" >
                <el-form :model="cateObjById" :rules="categoryRules" ref="cateObjById" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="cateObjById.name" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="分类状态">
                        <el-switch v-model="cateObjById.status "></el-switch>
                    </el-form-item>
                    <el-form-item label="创建分类用户">
                        <el-input v-model="cateObjById.createName" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="更新分类用户">
                        <el-input v-model="cateObjById.updateName" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="btnOk">确定</el-button>
                        <el-button @click="btnCancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.categoryParams.page" :page-sizes="[1, 2]" :page-size="2"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { qeuryCateByPage, startOrStopCate, deleteCategory, qeuryCateById,setCategory } from '@/api/category'
export default {
    name: 'category',
    data() {
        return {
            dialogShow: false,
            cateObjById: {},
            records: [],
            total:0,
            categoryParams: {
                name: '',//分类名称
                page: 1,
                pageSize: 5,
            },
            categoryRules: {
                name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
                ],
            }

        }
    },
    created() {
        this.qeuryCateByPage()
    },
    methods: {
        /**
         * 改变页数
         */
         handleCurrentChange(val){
             this.categoryParams.page = val
             this.qeuryCateByPage()
         },
        /**
         * 改变条数 
         */
         handleSizeChange(val){
          
            this.categoryParams.pageSize = val

             this.qeuryCateByPage()
         },
        /**
     * 新增分类成功
     */
    btnOk(){
        this.$refs.cateObjById.validate( async (isOK) =>{
            if(isOK){
                this.cateObjById.status =  this.cateObjById.status === 1?'0':'1'
                let result = await  setCategory(this.cateObjById)
               if(result.code == 1){
                this.qeuryCateByPage()
                this.btnCancel()
                this.$message.success('修改成功O(∩_∩)O')
             }
            }
        })
    },

        /**
         * 新增分类取消
         */
        btnCancel(){
            this.$refs.cateObjById.resetFields(),
            this.dialogShow = false
        },
        /**
         * 根据id查询分类
         */
        async qeuryCateById(row) {
            this.dialogShow = true
            let result = await qeuryCateById(row.id)
            result.data.status = result.data.status == 1?'true':'false'
            this.cateObjById = result.data   
        },
        /**
         * 删除分类
         */
        async deleteCategory(row) {
            let result = await deleteCategory({ id: row.id })
            if (result.code == 1) {
                this.$message.success('删除成功(*^_^*)!')
                this.qeuryCateByPage()
            }
        },



        /**
         * 新建分类
         */
        addCategory() {
            this.$router.push('/addcategory')
        },
        /**
         * 根据分类名称查询
         */
        async queryCateByname() {
            let result = await qeuryCateByPage(this.categoryParams)
            this.records = result.data.records
        },
        /**
         * 启用/禁用分类
         */
        async handleStarOrStop(row) {
            const cateParams = { id: row.id, status: !row.status ? '1' : '0' }
            let result = await startOrStopCate(cateParams)
            if (result.code == 1) {
                this.qeuryCateByPage()
                this.$message.success('修改成功')
            }
        },
        /**
         * 分页查询分类
         */
        async qeuryCateByPage() {
            let result = await qeuryCateByPage(
                this.categoryParams
            )
            this.total = result.data.total
            this.records = result.data.records
        },
    }
}
</script>

<style scoped>
.stop-use {
    color: red;
}
</style>