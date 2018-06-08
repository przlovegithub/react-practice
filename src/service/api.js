import { instance } from './apiConfig';

export const visitCount = (data) => {
    return instance.post('/appsetting/activityVisit', data)
};
export const movieList = (type) => {
    return instance.get('/v2/movie/' + type)
};