<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules">
        <el-form-item prop="phone">
            <el-input placeholder="输入手机号" v-model="loginForm.phone"></el-input>
          </el-form-item> 
          <el-form-item prop="code">
            <el-input placeholder="输入验证码" v-model="loginForm.code"></el-input>
            <el-button type="primary" style="margin-left: 10px;" size="mini" @click="sendCode">发送验证码</el-button>
          </el-form-item>
          <!-- <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
          </el-form-item> -->
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 350px;" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        phone: '',
        code: '',
        isAgree:false
      },
      loginRules:{
        phone:[
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern:/^1[3-9]\d{9}$/, trigger: 'blur',message:'手机号格式不正确' }
        ],
        code:[
        { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        isAgree:[{
          // 自定义校验协议.
          validator: (rule,value,callback) =>{
            value?callback():callback(new Error('您必须勾选用户平台协议'))
          }
        }
          
        ]
        
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate( async (isOK) =>{
        if(isOK){ 
        await  this.$store.dispatch('userLogin',this.loginForm)
        this.$router.push('/dashboard')
        }
      })
    },
    sendCode(){
      this.$store.dispatch('getCode',{phone:this.loginForm.phone})
    },
   
  }
}
</script>

<style lang="scss">
.login-way{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 160px;
      font-size: 24px;

    }

    .el-input { 
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>