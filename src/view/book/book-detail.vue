<template>
    <!-- 如果数据还未请求到，以下全不渲染 -->
    <div>
        <section v-if="bookDetail.title">
            <div class="title">{{bookDetail.title}}</div>
            <div class="post"><img :src="bookDetail.images.large" alt=""></div>

            <div class="movieInfo">
                <p class="score">评分：<b>{{bookDetail.rating.average}}</b></p>
                <div class="player">
                    作者：{{bookDetail.author.join(' / ')}} 译者{{bookDetail.translator.join(' / ')}}
                    <p> 图书标签
                        <span v-for="item in bookDetail.tags">
                            {{item.name}} /
                        </span>
                    </p>
                    
                </div>
                <ul class="wantoSee">
                    <li>评论人数{{bookDetail.rating.numRaters}}</li>
                    <li>价格{{bookDetail.price}}</li>
                </ul>
                <p class="intro">{{bookDetail.title}}的剧情介绍</p>
                <summary>
                    {{bookDetail.summary}}
                </summary>
                <a :href="bookDetail.ebook_url">电子书地址</a>
            </div>
        </section>
        <spinner :show="show"></spinner>
    </div>
</template>
<script>
// 从这个模块中暴露方法较多,要用括号表示调用哪几个方法
import {fetchBookById} from '../../store/app.js';
import spinner from '../../components/Spinner'

export default {
    data() {
        return {
            id: '',
            show: true,
            bookDetail: {}
        }
    },
    components: {
        spinner
    },
    mounted() {
        this.id = this.$route.params.id;
        fetchBookById(this.id)
            .then((response) => {
                this.bookDetail = response;
                this.show = false;
            })
    }
}
</script>
<style scoped>
.title {
    padding: 10px 20px;
}
.post img {
    width: 100%;
}
.score {
    margin-bottom: 5px;
}
.player {
    margin-bottom: 10px;
    font-size: 12px;
}
.movieInfo {
    padding: 10px 20px;
}
.wantoSee {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.wantoSee li {
    width: 48%;
    padding: 5px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #FFB712;
    color: #FFB712;
    font-size: 12px;
    border-radius: 4px;
}
.intro {
    font-weight: bold;
    color: #999;
    margin-bottom: 10px;
}
</style>
