import fetch from './fetch'
export const visitCount = (data) => fetch('/appsetting/activityVisit', data, 'POST')
export const comments = (data) => fetch('', data, 'GET')