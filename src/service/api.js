import { instance, loginUrl } from './apiConfig';
// import fetch from './fetch'
export const visitCount = (data) => {
    return instance.post('/appsetting/activityVisit', data)
};
export const movieList = (type) => {
    return instance.get('/v2/movie/' + type)
};
export const songList = () => {
    return instance.get('/cloudmusic/?type=song&id=446875807')
};
export const top250 = () => {
    return instance.get('/v2/movie/top250')
};

export const commingSoon = () => {
    return instance.get('/v2/movie/coming_soon')
};

export const searchBook = (bookName) => {
    return instance.get('/v2/book/search?q=' + bookName)
};

export const login = (data) => {
    return loginUrl.post('/app/login', data)
}
    // export const login = (data) => {//通过fetch方式
    //     return fetch('/app/login', data, 'POST', 'application/x-www-form-urlencoded')
    // };
