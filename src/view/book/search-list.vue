<template>
    <div class="which">
        <div class="movieList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-show="movieList.books.length">
        <p>搜索 "{{this.query}} " 的结果</p>
        <ul>
            <li v-for="item in movieList.books">
                <router-link :to="{name: 'book-detail', params: {id: item.id}}">
                    <img :src="item.images.medium" alt="">
                    <span class="title">{{item.title}}</span>
                </router-link>
            </li>
        </ul>
        <p class="totals">搜索的结果数：<b>{{movieList.total}}</b></p>
        <spinner :show="show" name="which"></spinner>
        </div>
    </div>

</template>
<script>
// 从这个模块中获取操作数据增删改查的方法
import {fetchSearchBook} from '../../store/app.js';
import spinner from '../../components/Spinner'
import infiniteScroll from 'vue-infinite-scroll'

export default {
    data() {
        return {
            show: true,
            movieList: {
                books: []
            }, // 保存电影列表
            query: '',
            busy: false
        }
    },
    components: {
        spinner
    },
    directives: {
        // 和vue配套的，自定义滚动指令
        infiniteScroll 
    },
    mounted() {
        console.log('mounted')
        this.getPath();
    },
    watch: {
        // 监控$route(路由信息对象) 发生变化时，执行后面的loadAgain函数
        // 比如搜索的关键字没有变，那么就不能触发loadAgain
        '$route': 'loadAgain'
    },
    methods: {
        getPath() {
            this.query = this.$route.query.query?this.$route.query.query:'白夜行';
        },
        // 表示重新输入关键字查询操作
        loadAgain() {
            this.movieList.books = [];
            this.loadMore();
        },
        // 本质上是router的滚动加载。待补充
        loadMore() {
            var start = this.movieList.books.length;
            this.busy = true;  // 表示关闭滚动加载
            this.getPath();
            fetchSearchBook(this.query, start)
                .then((response => {
                    this.movieList.books = this.movieList.books.concat(response.books);
                    this.movieList.total = response.total;
                    this.movieList.title = response.title;
                    this.show = false;
                    // 当展示长度小于总长度时，设置为false，表示开启滚动加载
                    if(this.movieList.books.length < this.movieList.total) {
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
    background: #eee;
}
.movieList h2 {
    position: relative;
}
.totals{
    padding: 5px;
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
