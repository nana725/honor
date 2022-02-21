<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
    </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <Vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></Vue-editor>
      </el-form-item>

       <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
  export default {
    props:{
      id:{}
    },
    components: { VueEditor },
    data() {
      return {
        model:{},
        categories:[],
      }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
      async save(){
        let res //eslint-disable-line no-unused-vars
        if(this.id){
          // 有id是编辑
        res = await this.$http.put(`rest/articles/${this.id}`,this.model)
        }else{
          // 没有是新增
        res = await this.$http.post('rest/articles',this.model)
        }
        // 跳转页面
        this.$router.push('/articles/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      // 自动获取id值
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
      // 获取parents数组
      async fetchCategories(){
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      }
    },
    //有了id才执行
    created(){
      this.fetchCategories()
      this.id && this.fetch()
    }
  };
</script>