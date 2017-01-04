
import App from './App'

export default [
    // 给路由命名，为了可以通过名称来调用路由的地址
    {
        path: '/',
        component: App.components.vMovie,
        name: 'index'
    },
    {
        path: '/movies',
        component: App.components.vMovie,
        name: 'movies'
    },
    {
        path: '/movies/list',
        component: App.components.movieList,
        name: 'movie-list'
    },
    {
        path: '/movies/subjects/:id',
        component: App.components.movieDetail,
        name: 'movie-detail'
    },
    {
        path: '/movies/search',
        component: App.components.searchList,
        name: 'search-list'
    },
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
    
]