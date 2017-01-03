// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import routes from './router' // 路由规则写在router文件中
/* eslint-disable no-new */

// 使用vue的router功能
Vue.use(vueRouter);
const router = new vueRouter({
    routes
})

new Vue({
    router,
    el: '#app',
    template: '<App/>',
    components: { App }
})
