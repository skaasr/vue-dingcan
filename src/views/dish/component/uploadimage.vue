<template>
    <!-- action 是否自动上传 必选参数，上传的地址 -->
    <!-- show-file-list 是否显示已上传文件列表 -->
    <!-- before-upload 上传前的时间函数 -->
    <el-upload
  class="avatar-uploader"
  action="#"
  :show-file-list="false"
  :before-upload="beforeAvatarUpload">
  <img v-if="value" :src="value" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<style>
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

<script>
  export default {
    props:["value"],
    data() {
      return {
       
      }
    },
    mounted(){
    this.getImageUrl() 
    },
    methods: {
        /**
         * 获取上传图片名字
         */
        getImageUrl(){
            console.log(this.value);
        },
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      }
    }
  }
</script>