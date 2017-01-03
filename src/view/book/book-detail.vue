<template>
    <!-- 如果数据还未请求到，以下全不渲染 -->
    <div>
        <section v-if="subjectDetail.title">
            <div class="title">{{subjectDetail.title}}</div>
            <div class="post"><img :src="subjectDetail.images.large" alt=""></div>

            <div class="movieInfo">
                <p class="score">评分：<b>{{subjectDetail.rating.average}}</b></p>
                <div class="player">
                    {{subjectDetail.countries.join(' / ')}} {{subjectDetail.genres.join(' / ')}}
                    <template v-for="item in subjectDetail.casts">
                        {{item.name}} /
                    </template>
                </div>
                <ul class="wantoSee">
                    <li>想看{{subjectDetail.wish_count}}</li>
                    <li>评论{{subjectDetail.reviews_count}}</li>
                </ul>
                <p class="intro">{{subjectDetail.original_title}}的剧情介绍</p>
                <summary>
                    {{subjectDetail.summary}}
                </summary>
            </div>
        </section>
        <spinner :show="show"></spinner>
    </div>
</template>
<script>
// 从这个模块中暴露方法较多,要用括号表示调用哪几个方法
import {fetchSubjectById} from '../../store/app.js';
import spinner from '../../components/Spinner'

export default {
    data() {
        return {
            id: '',
            show: true,
            subjectDetail: {}
        }
    },
    components: {
        spinner
    },
    mounted() {
        this.id = this.$route.params.id;
        fetchSubjectById(this.id)
            .then((response) => {
                this.subjectDetail = response;
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
