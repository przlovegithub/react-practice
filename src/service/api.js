import { instance } from './apiConfig';

export const visitCount = (data) => {
    return instance.post('/appsetting/activityVisit', data)
};
export const comments = () => {
    return instance.get('?type=comments&id=446875807')
};