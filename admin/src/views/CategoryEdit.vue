<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
    </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        parents:[],
      }
    },
    methods: {
      async save(){
        let res //eslint-disable-line no-unused-vars
        if(this.id){
          // 有id是编辑
        res = await this.$http.put(`rest/categories/${this.id}`,this.model)
        }else{
          // 没有是新增
        res = await this.$http.post('rest/categories',this.model)
        }
        // 跳转页面
        this.$router.push('/categories/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      // 自动获取id值
      async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)
        this.model = res.data
      },
      // 获取parents数组
      async fetchParents(){
        const res = await this.$http.get(`rest/categories`)
        this.parents = res.data
      }
    },
    //有了id才执行
    created(){
      this.fetchParents()
      this.id && this.fetch()
    }
  };
</script>