<template>
  <div>
    <!-- 头部，包括标题和搜索 -->
    <v-header></v-header>
    <!-- 中间内容，需要根据路由的不同进行改变 -->
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from './components/Header'
import vMovie from './view/movie/movies'
import movieList from './view/movie/movie-list'
import movieDetail from './view/movie/movie-detail'
import searchList from './view/movie/search-list'
import  './assets/css/reset.css'

export default {
  components: {
    vHeader,
    vMovie,
    movieList,
    movieDetail,
    searchList
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
