# y

> vue2.x

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9988
npm run dev

# build for production with minification
npm run build
```
## 主要使用豆瓣api制作的搜索电影和图书
###### 使用工具为 vue-cli，不需要额外配置webpack
编写的代码是十分简单的，但自身水平有限还是参照别人源码来做。下面是开发时遇到的问题

1、proxyTable是一个映射表，webpack将我们使用的api重新指向接口地址。提供的options可以解决跨域
``` bash
  proxyTable: {
      '/api' : {
          target: 'https://api.douban.com/v2',
          /*参数里有一个changeOrigin参数，接收一个布尔值，如果设置为true,
          那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境*/
          changeOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
      }
  }
```
2、没有使用jquery来进行ajax请求，通过vue的axios插件。所有数据请求相关的操作都放在app.js中
``` bash
import axios from 'axios';
export function fetch(url) {
    // es6 Promise对象代表异步操作，resolve表示成功后的回调
    // then 代替了ajax中的回调嵌套
    return new Promise((resolve, reject) => {
        axios.get(HOST + url)
            .then((response) => {
                resolve(response.data);
            })
    })
}
```
3、相关路由配置全放在router.js中

  ``3-1 为每个路由起好名称，方便组件中通过名称生成路径 ``
  ``` bash
    {
        path: '/movies',
        component: App.components.vMovie,
        name: 'movies'
    },
    {
        path: '/books/search',
        component: App.components.b_searchList,
        name: 'b_search-list'
    }
    <router-link :to="{name: 'movies'}">电影</router-link>
    <router-link :to="{name: 'b_search-list'}">图书</router-link>
  ```
  ``3-2 注意router匹配的原则，如带通配符的路由 ``
  ``` bash
    {
        path: '/books/search',
        component: App.components.b_searchList,
        name: 'b_search-list'
    },
    {
        // 1、这里的:id 有通配符的作用，即使是/search的路径也会被匹配到，所以一定要放在最下面
        // 2、vue的router匹配原则是，一旦符合要求就不会再继续往下寻找
        path: '/books/:id',
        component: App.components.bookDetail,
        name: 'book-detail'
    }
  ```
  ``3-3 router 和 route的区别 ``
  this.$router 是 Router实例，拥有如push(),go(),back()等方法
  this.$route 是路由信息对象，可以查询路由携带的参数、url等。如下
  ``` bash
  this.$route.path: 对应当前路由的路径
  this.$route.params: 接受在路径中使用冒号开头的数字，像'/books/:id'中的id值
  this.$route.query: 表示url查询参数，像'/books/search?q=friend'，即this.$route.query.q==friend
  ```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
