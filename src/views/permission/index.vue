<template>
    <div class="container">
        <div class="app-container">
            <el-button type="primary" size="mini" @click="addPermission">添加权限</el-button>
            <el-table :data="permissionData" style="width: 100%" row-key="id" default-expand-all>
                <el-table-column prop="name" label="菜单名称" width="180">
                </el-table-column>
                <el-table-column prop="perms" label="权限标识" width="180">
                </el-table-column>
                <el-table-column prop="path" label="路由地址">
                </el-table-column>
                <el-table-column prop="component" label="组件路径">
                </el-table-column>
                <el-table-column prop="sortValue" label="排序">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template v-slot="{ row }">
                        <el-switch v-model="row.status === 1" disabled="true">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template v-slot="{ row }">
                        <el-row type="flex" justify="center">

                            <el-col>
                                <el-button v-if="row.type !== 2" icon="el-icon-plus" type="primary" size="mini"
                                    @click="add(row)">添加</el-button>
                                <el-button icon="el-icon-edit" size="mini" @click="edit(row)" style="margin-right: 10px;">修改</el-button>
                                <el-popconfirm title="您确定要删除吗?" @onConfirm="removeDataById(row)">
                                    <el-button icon="el-icon-delete" type="danger" size="mini" slot="reference"
                                        :disabled="row.children.length > 0">删除</el-button>
                                </el-popconfirm>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
                <el-form ref="dataForm" :model="sysMenu" label-width="150px" size="small" style="padding-right: 40px;">
                    <el-form-item label="上级部门" v-if="sysMenu.id === ''">
                        <el-input v-model="sysMenu.parentName" disabled="true" />
                    </el-form-item>
                    <el-form-item label="菜单类型" prop="type">
                        <el-radio-group v-model="sysMenu.type" :disabled=typeDisabled>
                            <el-radio :label="1" :disabled=type1Disabled>菜单</el-radio>
                            <el-radio :label="2" :disabled=type2Disabled>按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="sysMenu.name" />
                    </el-form-item>
                    <!-- 排序 属性查看 -->
                    <el-form-item label="排序">
                        <el-input-number v-model="sysMenu.sortValue" controls-position="right" :min="0" />
                    </el-form-item>
                    <!-- 路由地址 属性查看 -->
                    <el-form-item prop="path">
                        <span slot="label">
                            <el-tooltip content="访问的路由地址，如：`sysUser`" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            路由地址
                        </span>
                        <el-input v-model="sysMenu.path" placeholder="请输入路由地址" />
                    </el-form-item>
                    <!-- 组件路径 -->
                    <el-form-item prop="component" v-if="sysMenu.type !== 0">
                        <span slot="label">
                            <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            组件路径
                        </span>
                        <el-input v-model="sysMenu.component" placeholder="请输入组件路径" />
                    </el-form-item>
                    <!-- 权限标识 -->
                    <el-form-item v-if="sysMenu.type === 2">
                        <el-input v-model="sysMenu.perms" placeholder="请输入权限标识" maxlength="100" />
                        <span slot="label">
                            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(hasAuthority('bnt.sysRole.list'))"
                                placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            权限字符
                        </span>
                    </el-form-item>
                    <!-- 状态 -->
                    <el-form-item label="状态" prop="type">
                        <el-radio-group v-model="sysMenu.status">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="0">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
                    <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { findPermission, addMenu, deleteMenu, updateMenu } from '@/api/permission'
const defaultForm = {
    id: '',
    parentId: '',
    name: '',
    type: 0,
    path: '',
    component: '',
    perms: '',
    icon: '',
    sortValue: 1,
    status: 1
}
export default {
    name: 'Permission',
    data() {
        return {
            permissionData: [],
            //dialog 名字
            dialogTitle: '',
            dialogVisible: false,
            // 菜单类型选项框
            typeDisabled: false,
            // 目录 菜单 按钮 是否禁用
            type1Disabled: false,
            type2Disabled: false,
            saveBtnDisabled: false,
            //form表单数据
            sysMenu: defaultForm

        }
    },
    created() {
        this.findPermission()
    },
    methods: {
        async findPermission() {
            let result = await findPermission()
            console.log(result);
            this.permissionData = result.data
        },
        /**
         * 添加菜单
         */
        addPermission() {
            this.dialogTitle = '添加菜单节点'
            this.dialogVisible = true
            this.sysMenu.type = 1
            this.sysMenu.component = 'Layout'
            this.sysMenu.parentId = 0
            this.typeDisabled = true
        },


        /**
         * 菜单回显
         */
        edit(row) {
            this.dialogTitle = '修改节点'
            this.dialogVisible = true
            this.sysMenu = Object.assign({}, row)
            this.typeDisabled = true

        },
        /**
         * 删除菜单
         */
        async removeDataById(row) {
            let result = await deleteMenu({ ids: row.id })
            if (result.code === 1) {
                this.$message.success('删除成功')
                this.findPermission()
            }
        },
        /**
         * 添加菜单
         */
        add(row) {
            this.dialogVisible = true
            this.typeDisabled = false
            this.dialogTitle = '添加下级节点'
            //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
            // 它将返回目标对象。
            this.sysMenu = Object.assign({}, defaultForm)
            this.sysMenu.id = ''
            this.sysMenu.parentId = row.id
            this.sysMenu.parentName = row.name
            if (row.type === 1) {
                this.sysMenu.type = 2
                this.typeDisabled = true
                this.type1Disabled = false
                this.type2Disabled = true
            }
        },
        /**
         * 提交数据
         */
        saveOrUpdate() {
            if (this.sysMenu.type === 0 && this.sysMenu.parentId !== 0) {
                this.sysMenu.component = 'ParentView'
            }
            this.$refs.dataForm.validate(valid => {
                if (valid) {
                    this.saveBtnDisabled = true // 防止表单重复提交
                    if (!this.sysMenu.id) {
                        this.saveData()
                    } else {
                        this.updateData()
                    }
                }
            })
        },
        /**
         * 新增数据
         */
        async saveData() {
            let result = await addMenu(this.sysMenu)
            console.log(result);
            if (result.code === 1) {
                this.$message.success('操作成功')
                this.dialogVisible = false
                this.findPermission()
            }
        },
        /**
         * 修改数据
         */
        async updateData() {
            let result = await updateMenu(this.sysMenu)
            if (result.code == 1) {
                this.$message.success('修改成功')
                this.dialogVisible = false
                this.findPermission()
            }
        }
    },

}
</script>

<style></style>