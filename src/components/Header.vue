<template>
  <div class="douTop">
    <div class="title">
      <router-link :to="{name: 'movies'}">电影</router-link>
      <span> / </span>
      <router-link :to="{name: 'b_search-list'}">图书</router-link>
    </div>
    <div class="search">
      <!-- 输入框监听事件，加了按键修饰符，单单指回车按钮 -->
      <input type="text" name="search" placeholder="请输入搜索内容" 
      class="search-input" v-model.trim="query" @keyup.enter="search">
      <button type="" class="search-btn" @click="search"></button>
    </div>
  </div>
</template>

<script>
import spinner from './Spinner'
export default {
  data () {
    return {
      query: '', // 查询的参数
      path: ''  // 查询的路径(基于movie还是book)
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    search() {
      this.getPath()
      // 当触发search函数，通过router方法往实例中push了一个新值(因为每次搜索的参数内容都是不一样的)
      // 通过push方法实现跳转页面
      this.$router.push({path: this.path, query: {query: this.query}});
      this.query = '';
    },
    getPath() {
      // 判断当前是搜索movie列表，还是book列表
      if(this.$route.path.indexOf('movie') != -1) {
        this.path = '/movies/search'
      }else if(this.$route.path.includes('book')) {
        this.path = '/books/search'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.douTop {
  width: 100%;
}
.title{
  height: 47px;
  line-height: 47px;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 20px;
}
.search{ 
  position: relative;
 }
.search-input {
  background: #f5f5f5;
  padding: 10px;
  padding-right: 25px;
  width: 100%;
}
.search-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 18px;
  background: none;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -10px;
  cursor: pointer;
}
.search-btn:before {
  content: '\e655';
  font-family: icomoon;
}
</style>
