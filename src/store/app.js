/**
 * Created by superman on 2016/12/23.
 */

// 通过vue的axios插件来进行ajax请求
import axios from 'axios';

// 使用代理
const HOST = 'api/';

// 常量一般用全大写
export const API_TYPE = {
    movie: {
        in_theaters: 'in_theaters', // 正在上映
        coming_soon: 'coming_soon' // 即将上映
    }
};

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

export function fetchItemByType(url) {
    return fetch(`${url}`);
}

// 通过电影的类型获取数据，其中俩个参数有默认值
export function fetchMoviesByType(type, start=0, count=20) {
    // 通过字符串模板``(es6)拼接出了一条带参数的api
    return fetchItemByType(`movie/${type}?start=${start}&count=${count}`);
}

// 通过id获取电影的详情
export function fetchSubjectById(id) {
    return fetch(`movie/subject/${id}`);
}

// 通过关键字搜索电影
export function fetchSearchMovie(query,start=0) {
    // encodeURI() 函数可把字符串作为 URI 进行编码。
    // 如空格，中文都需要被转义为十六进制序列
    let url = encodeURI(`movie/search?q=${query}&start=${start}`);
    return fetch(url);
}