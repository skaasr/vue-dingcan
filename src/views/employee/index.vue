<template>
    <div class="container">
        <div class="app-container">
            <div class="tableBar">
                <label style="margin-right: 10px;">员工手机号:</label>
                <el-input placeholder="请输入员工手机号" style="width: 15%;margin-right:15px" v-model="value1"></el-input>
                <label style="margin-right: 10px;">员工姓名:</label>
                <el-input placeholder="请输入员工姓名" style="width: 15%;" v-model="value2"></el-input>
                <el-button style="margin-left: 20px;" type="primary" @click="queryEmpByPhone">查询</el-button>
                <el-button style="float: right;" type="primary" @click="addEmp()">+添加员工</el-button>
            </div>
            <el-table :data="empData" style="width: 100%">
                <el-table-column prop="id" label="员工id" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="icon" label="头像">
                </el-table-column>
                <el-table-column prop="nickname" label="用户名">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button size="mini" type="text" @click="setEmpInfO(row)">修改</el-button>
                        <el-popconfirm @onConfirm="deleteEmpById(row)" title="您确定要删除该员工吗？">
                            <el-button size="mini" type="text" slot="reference"
                                style="margin-left: 10px;">删除</el-button>
                        </el-popconfirm>
                        <el-button type="text" size="mini" style="margin-left: 10px;"
                            @click="getRole(row)">角色</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-dialog @close="cancelEmp" :title="showTitle" v-show="dialogShow" :visible.sync="dialogShow" width="30%">
                <el-form :model="empForm" :rules="emprules" ref="empForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="empForm.phone" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="nickname">
                        <el-input v-model="empForm.nickname" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="用户简介">
                        <el-input v-model="empForm.icon" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="confirmEmp">确定</el-button>
                        <el-button size="mini" @click="cancelEmp">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 角色显示页面 -->
            <el-dialog title="分配角色" v-show="dialogRole" :visible.sync="dialogRole" width="30%">
                <el-checkbox-group v-model="assginRoleList">
                    <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.id">{{ item.roleName
                        }}</el-checkbox>
                </el-checkbox-group>
               <el-row slot="footer" type="flex" justify="center">
                
                    <el-button size="mini" type="primary" @click="btnOk">确定</el-button>
                    <el-button size="mini" @click="btncancel">取消</el-button>
               </el-row>
            </el-dialog>
            <el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pageParams.page" :page-sizes="[1, 2, 5]" :page-size="5"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { queryEmpById, queryEmpByPage, addEmployee, updateEmp, deleteEmp, queryRole, assignRole } from '@/api/user'
export default {
    name: 'Employee',
    data() {
        return {
            value1: '',
            value2: '',
            total: 0,
            allRoleList: [],//所有角色
            assginRoleList: [],// 选中角色id集合
            currentUserId: '',//当前选中id
            dialogRole: false,
            dialogShow: false,
            pageParams: {
                page: 1,
                pageSize: 5,
                nickname: '',
                phone: ''
            },
            empData: [],  // 返回的员工数据
            empForm: {
                id: '',
                phone: '',
                nickname: '',
                icon: ''
            },
            emprules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, trigger: 'blur', message: '手机号格式不正确' },
                ],
                nickname: [{ required: true, message: '请输入用户名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }]
            }
        }
    },
    computed: {
        /**
         * 显示部门编辑or新增
         */
        showTitle() {
            return this.empForm.id ? '编辑员工' : '新增员工'
        }
    },
    mounted() {
        this.getEmpInfo()

    },
    methods: {
        /**
         * 确定分配角色
         */
        async btnOk(){
        await  assignRole({userId:this.currentUserId, roleId:this.assginRoleList})
        this.$message.success('分配用户角色成功')
        this.btncancel()
        },
        /**
         * 取消分配角色
         */
         btncancel(){
         this.dialogRole = false
         },
        /**
         * 查询角色和当前用户角色       
         */
        async getRole(row) {
            
            let result = await queryRole({ userId: row.id })
            this.allRoleList = result.data.allRoleList
            this.currentUserId  = row.id     // 当前所选用户id 赋值
            // this.roleArr = result.data.assginRoleList
            // this.roleArr.forEach(item => {
            //     this.assginRoleList.push(item.id)
            // })
            this.assginRoleList = result.data.assginRoleList.map(item => {
                return item.id
            })  
            this.dialogRole = true
        },
        /**
         * 批量删除员工
         */
        async deleteEmpById(row) {
            let result = await deleteEmp(row.id)
            if (result.code === 1) {
                this.$message.success('删除成功(*^▽^*)！')
                this.getEmpInfo()
            }
        },
        /**
         * 根据手机号查询员工
         */
        async queryEmpByPhone() {
            this.pageParams.phone = this.value1
            this.pageParams.nickname = this.value2
            let result = await queryEmpByPage(this.pageParams)
            this.empData = result.data.records
            this.getEmpInfo()
        },

        /**
         * 根据Id显示员工信息
         */
        async setEmpInfO(row) {
            const result = await queryEmpById(row.id)
            this.empForm = result.data
            this.dialogShow = true
        },
        /**
         * 确定新增员工  取消新增员工
         */
        confirmEmp() {
            this.$refs.empForm.validate(async (isOK) => {
                if (isOK) {
                    let msg = '新增'
                    if (this.empForm.id) {
                        msg = '编辑'

                        await updateEmp(this.empForm)
                    } else {
                        await addEmployee(this.empForm)
                    }
                    this.cancelEmp()
                    this.$message.success(`${msg}成功(#^.^#)!`)
                    this.getEmpInfo()
                }
            })
        },
        cancelEmp() {
            this.empForm = {
                phone: '',
                nickname: '',
                icon: '',
                id: ''
            },
                this.$refs.empForm.resetFields()
            this.dialogShow = false
        },
        /**
         * 新增员工
         */
        addEmp() {
            this.dialogShow = true
        },
        /**
         * 当前每页显示多少条数据
         */
        handleSizeChange(val) {
            this.pageParams.pageSize = val
            this.getEmpInfo()
        },

        /**
         * 当前第几页
         * 
         */
        handleCurrentChange(val) {
            this.pageParams.page = val
            this.getEmpInfo()
        },

        /**
         * 获取员工信息
         */
        async getEmpInfo() {
            let result = await queryEmpByPage(this.pageParams)

            // result.data.records.map(item => {
            //     item.createTime = this.dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
            //     item.updateTime = this.dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss")

            // })
            this.total = result.data.total
            this.empData = result.data.records


        },


    }
}
</script>

<style scoped>
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