<template>
    <div class="container">
        <div class="app-container">
            <div class="tableBar">
                <label style="margin-right: 10px;">角色姓名:</label>
                <el-input placeholder="请输入角色姓名" style="width: 15%;" v-model="value"></el-input>
                <el-button style="margin-left: 20px;" type="primary" @click="queryRoleByName()">查询</el-button>
                <el-button style="float: right;" type="primary" @click="addRole" round>+添加角色</el-button>
                <el-button type="danger" style="float: right;margin-right: 15px;" round
                    @click="deleteRoles">批量删除</el-button>
            </div>
            <el-table @selection-change="handleSelectionChange" :data="records" style="width: 100%;margin-top: 15px;">
                <el-table-column type="selection" width="60px">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="180">
                </el-table-column>
                <el-table-column prop="roleCode" label="角色编码" width="180">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template v-slot="{ row }">
                        <span>{{ row.status === 1 ? '启用' : '禁用'
                            }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column label="操作">

                    <template v-slot="{ row }">
                        <el-button type="text" @click="queryRoleById(row)">修改</el-button>
                        <el-button type="text" @click="deleteRoleById(row)">删除</el-button>
                        <el-button type="text" @click="showPermission(row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 15px;"> <el-pagination
  style="float: right;margin-right: 15px; "
  :page-sizes="[2, 5, 10, 20]"
  @size-change="changepageSize"
  @current-change="changepage"
    layout="total,sizes,prev, pager, next"
    :page-size="roleParams.pageSize"
    :current-page="roleParams.page"
    :total="total">
  </el-pagination></div>
            <el-dialog @close="btnCancel" :title=showTitle :visible.sync="dialogShow" width="30%">
                <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="roleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色编码" prop="roleCode">
                        <el-input v-model="roleForm.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="description">
                        <el-input v-model="roleForm.description" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="角色状态">
                        <el-switch v-model="roleForm.status"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="btnOk">确定</el-button>
                        <el-button style="margin-left: 40px;" @click="btnCancel"> 取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { queryRole, addRole, queryRoleById, deleteRoleById, updateRole } from '@/api/role'
export default {
    name: 'role',
    data() {
        return {
            roleForm: {
                id: '', // 角色id
                roleName: "", // 角色名字
                roleCode: '', //状态码
                description: '', //描述
                status: true //状态
            },
            roleRules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                roleCode: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' },
                ]
            },
            roleParams: {
                page: 1,
                pageSize: 10,
                roleName: '',
                status: ''
            },
            deleteArray:[],
            dialogShow: false,
            total: 0, //总条数
            value: '', // 角色姓名
            records: []  // 角色数据
        }
    },
    created() {
        this.queryRole()
    },
    computed: {
        /**
         * 显示部门编辑or新增
         */
        showTitle() {
            return this.roleForm.id ? '编辑角色' : '新增角色'
        }
    },

    methods: {
        /**
         * 跳转到权限页面
         */
        async showPermission(row){
            console.log(row);
         this.$router.push({path:'/role/assignpermission',query:{id:row.id,name:row.roleName}})
        },
        /**
         * 改变条数
         */
         changepageSize(val){
            this.roleParams.pageSize = val
            this.queryRole()
         },
         /**
          * 改变页数
          */
          changepage(val){
            this.roleParams.page = val
            this.queryRole()
          },
        /**
         * 批量删除
         */
        async deleteRoles(){
            this.deleteArray.forEach( async item => {
      await deleteRoleById({ids:item.id})
     })
            this.$message.success('删除成功')
            this.queryRole()
         },
         /**
          * 获取要删除的数组元素 
          */
         handleSelectionChange(val) {
            this.deleteArray = val
      },
        /**
         * 删除角色
         */
        async deleteRoleById(row) {
            let result = await deleteRoleById({ ids: row.id })
            this.queryRole()
            if (result.code == 1) {
                this.$message.success('删除成功')
                this.queryRole()
            }
        },
        /**
         * 根据id查询用户
         */
        async queryRoleById(row) {
            let result = await queryRoleById({id:row.id})
             
            this.roleForm = result.data
            
            this.dialogShow = true
        },
        /**
         * 新增角色确
         */
        btnOk() {
            this.$refs.roleForm.validate(async (isOK) => {
                if (isOK) {
                    let msg = '新增'
                    this.roleForm.status = this.roleForm.status === false ? '0' : '1'
                    if (this.roleForm.id) {
                        let result = await updateRole(this.roleForm)

                        msg = '编辑'
                    }
                    let result = await addRole(this.roleForm)



                    if (result.code == 1) {
                        this.btnCancel()
                        this.queryRole()
                        this.$message.success(`${msg}成功O(∩_∩)O`)
                    } else {
                        this.$message.warning(result.msg)
                    }
                }
            })
        },
        /**
         * 新增角色取消
         */
        btnCancel() {
            this.roleForm = {
                roleName: "", // 角色名字
                roleCode: '', //状态码
                description: '', //描述
                status: false //状态
            }

            this.$refs.roleForm.resetFields(),
                this.dialogShow = false
        },
        /**
         * 新增校色
         */
        addRole() {
            this.dialogShow = true
        },
        /**
         * 分页查询角色
         */
        async queryRole() {
            let result = await queryRole(this.roleParams)
            this.records = result.data.records
            this.total = result.data.total
        },
        /**
         * 查询角色通过名字
         */
        async queryRoleByName() {
            this.roleParams.roleName = this.value
            let result = await queryRole(this.roleParams)
            this.records = result.data.records
        }
    }
}
</script>

<style></style>