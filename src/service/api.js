import { instance } from './apiConfig';

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