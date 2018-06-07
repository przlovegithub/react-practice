//  import 'es5-shim' //由于 IE8 是 ES3，需要引入 ES5 的 polyfill
import { baseUrl } from './env'

import 'whatwg-fetch' //解决移动浏览器兼容性问题
import 'fetch-detector' //引入 fetch 探测库
import 'fetch-ie8' //引入 fetch 的 polyfill
require('es6-promise').polyfill() //支持IE浏览器,引入 Promise 的 polyfill




//  API:基于window.fetch的封装
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type === 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include', //Fetch请求默认是不带cookie,需要设置{credentials: 'include'}
            method: type,
            headers: {
                'Accept': 'application/json', // 用户代理可处理的媒体类型
                'Content-Type': 'application/json' // 报文主体对象类型
            },
            mode: "cors", // 跨域
            cache: "force-cache"
        }

        if (type === 'POST') {
            //  https://segmentfault.com/a/1190000007434923
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) { // code for all new browsers
                requestObj = new XMLHttpRequest();
            } else { // code for IE5 and IE6
                // requestObj = new ActiveXObject("Microsoft.XMLHTTP");
            }

            let sendData = '';
            if (type === 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}