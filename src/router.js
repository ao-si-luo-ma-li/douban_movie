
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
    }
]