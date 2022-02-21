<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
      async save(){
        let res //eslint-disable-line no-unused-vars
        if(this.id){
          // 有id是编辑
        res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
        }else{
          // 没有是新增
        res = await this.$http.post('rest/admin_users',this.model)
        }
        // 跳转页面
        this.$router.push('/admin_users/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      // 自动获取id值
      async fetch(){
        const res = await this.$http.get(`rest/admin_users/${this.id}`)
        this.model = res.data
      },
    },
    //有了id才执行
    created(){
      this.id && this.fetch()
    }
  };
</script>