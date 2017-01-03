<template>
        <div class="movieList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul v-show="movieList.subjects">
                <li v-for="item in movieList.subjects">
                <!-- router-link中的链接来自router的配置(配置可以放在单独文件，也可直接在创建router中写入) -->
                    <router-link :to="{name: 'movie-detail', params: {id: item.id}}">
                        <img :src="item.images.medium" alt="">
                        <span class="title">{{item.title}}</span>
                    </router-link>
                </li>
            </ul>
            <spinner :show="show"></spinner>
        </div>
</template>
<script>
// 从这个模块中获取操作数据增删改查的方法
import {API_TYPE, fetchMoviesByType} from '../../store/app.js';
import spinner from '../../components/Spinner'
import infiniteScroll from 'vue-infinite-scroll'

export default {
    data() {
        return {
            show: true,
            movieList: {
                subjects: []
            },
            busy: false
        }
    },
    components: {
        spinner
    },
    directives: {
        infiniteScroll
    },
    mounted() {

    },
    methods: {
        // 本质上是router的滚动加载。待补充
        loadMore() {
            var start = this.movieList.subjects.length;
            // 通过组件路由上的方法，获取url上带的参数
            this.type = this.$route.query.type;
            this.busy = true;  // 表示关闭滚动加载
            fetchMoviesByType(this.type, start)
                .then((response => {
                    this.movieList.subjects = this.movieList.subjects.concat(response.subjects);
                    this.movieList.total = response.total;
                    this.movieList.title = response.title;
                    this.show = false;
                    // 当展示长度小于总长度时，设置为false，表示开启滚动加载
                    if(this.movieList.subjects.length < this.movieList.total) {
                        this.busy = false;
                    }
                }))
        }
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
    padding: 3% 5%;
    border-radius: 20px;
    margin-top: 5%;
    font-size: 12px;
}
.movieList li {
    width: 30%;
    margin-bottom: 15px;
    text-align: center;
}
.movieList img{
    width: 100%;
    max-width: 100%;
}
</style>
