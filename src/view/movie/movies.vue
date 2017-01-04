<template>
    <!-- 承载俩个电影分类的列表，1、正在上映，2、即将上映 -->
    <div>
        <section class="movies" v-show="inTheater.title">
            <div class="onNow movieList">
                <h2>{{inTheater.title}} <router-link :to="{name: 'movie-list', query: {type: inTheater.type}}">更多 >></router-link></h2>
                <ul>
                    <li v-for="item in inTheater.subjects">
                    <!-- router-link中的链接来自router的配置(配置可以放在单独文件，也可直接在创建router中写入) -->
                        <router-link :to="{name: 'movie-detail', params: {id: item.id}}">
                            <img :src="item.images.medium" alt="">
                            <span class="title">{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="comingSoon movieList">
                <h2>{{comingSoon.title}} <router-link :to="{name: 'movie-list', query: {type: comingSoon.type}}">更多 >> </router-link></h2>
                <ul>
                    <li v-for="item in comingSoon.subjects">
                    <!-- router-link中的链接来自router的配置(配置可以放在单独文件，也可直接在创建router中写入) -->
                        <router-link :to="{name: 'movie-detail', params: {id: item.id}}">
                            <img :src="item.images.medium" alt="">
                            <span class="title">{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="movieList">
                <h2>{{top250.title}} <router-link :to="{name: 'movie-list', query: {type: top250.type}}">更多 >> </router-link></h2>
                <ul>
                    <li v-for="item in top250.subjects">
                    <!-- router-link中的链接来自router的配置(配置可以放在单独文件，也可直接在创建router中写入) -->
                        <router-link :to="{name: 'movie-detail', params: {id: item.id}}">
                            <img :src="item.images.medium" alt="">
                            <span class="title">{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
        <spinner :show="show"></spinner>
    </div>
</template>
<script>
// 从这个模块中获取操作数据增删改查的方法
import {API_TYPE, fetchMoviesByType} from '../../store/app.js';
import spinner from '../../components/Spinner'

export default {
    data() {
        return {
            show: true,
            // 这俩个数据保存电影列表
            // 当他们发生变化时，页面要重绘
            inTheater:{}, 
            comingSoon: {},
            top250: {}
        }
    },
    components: {
        spinner
    },
    mounted() {
        var start = 0, count = 15;
        // 调用获取电影数据的方法，其中这里面有一个异步请求
        // 数据获得后，调用then，进行数据的处理
        fetchMoviesByType(API_TYPE.movie.in_theaters, start, count)
            .then((data) => {
                this.inTheater = data;
                this.inTheater.type = API_TYPE.movie.in_theaters;
                this.show = false;
            });
        fetchMoviesByType(API_TYPE.movie.coming_soon, start, count)
            .then((data) => {
                this.comingSoon = data;
                this.comingSoon.type = API_TYPE.movie.coming_soon;
                this.show = false;
            });
        fetchMoviesByType(API_TYPE.movie.top250, start, count)
            .then((data) => {
                this.top250 = data;
                this.top250.type = API_TYPE.movie.top250;
                this.show = false;
            })
    }
}
</script>
<style scoped>
a {
    color: #555;
}
.movies {
    background: #eee;
}
.movieList {
    padding: 0 5%;
    padding-top: 20px;
}
.movieList h2 {
    position: relative;
}
.movieList ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fff;
    padding: 5%;
    border-radius: 20px;
    margin-top: 5%;
}
.movieList li {
    width: 30%;
    margin-bottom: 15px;
    text-align: center;
    font-size: 12px;
}
.movieList img{
    width: 100%;
    max-width: 100%;
}
</style>
