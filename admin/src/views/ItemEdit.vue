<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 上传地址  成功之后做什么   一个图片一个上传图标（默认+号） -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props:{
      id:{}
    },
    data() {
      return {
        model:{},
      }
    },
    methods: {
      afterUpload(res){
        // 显示赋值
        this.$set(this.model,'icon',res.url)
        // res传入数据
        // this.model.icon = res.url

      },
      async save(){
        let res //eslint-disable-line no-unused-vars
        if(this.id){
          // 有id是编辑
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
        }else{
          // 没有是新增
        res = await this.$http.post('rest/items',this.model)
        }
        // 跳转页面
        this.$router.push('/items/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      // 自动获取id值
      async fetch(){
        const res = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
    },
    //有了id才执行
    created(){
      this.id && this.fetch()
    }
  };
</script>

<style>
  
</style>