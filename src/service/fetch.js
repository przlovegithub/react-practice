// import 'es5-shim' //由于 IE8 是 ES3，需要引入 ES5 的 polyfill
// require('es6-promise').polyfill(); //支持IE浏览器,引入 Promise 的 polyfill
// import 'whatwg-fetch' //解决移动浏览器兼容性问题
// import 'fetch-detector' //引入 fetch 探测库
// import 'fetch-ie8' //引入 fetch 的 polyfill
let baseUrl = 'http://appfwb.faw-mazda.com'
export default async(url = '', data = {}, type = 'GET', contentType = 'application/json', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    contentType = contentType.toLowerCase();
    if (type === 'GET') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr;
    }
    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': contentType
            },
            mode: 'cors',
            cache: 'force-cache'
        }
        if (type === 'POST') {
            if (contentType === 'application/x-www-form-urlencoded') {
                // let formData = new FormData();
                // Object.keys(data).forEach(key => {
                //     formData.append(key, data[key])
                // })
                let dataStr = '';
                Object.keys(data).forEach(key => {
                    dataStr += key + '=' + data[key] + '&'
                })
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                requestConfig.body = dataStr;
            } else if (contentType === 'application/json') {
                requestConfig.body = JSON.stringify(data);
            } else {
                console.log('unkonwn');

            }
        }

        try {
            const res = await fetch(url, requestConfig);
            const dataObj = await res.json();
            return dataObj;
        } catch (error) {
            throw new Error(error)
        }

    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest()
            } else {
                // requestObj = new ActiveXObject('Microsoft.XMLHTTP')
            }
            let dataStr = '';
            if (type === 'POST') {
                if (contentType === 'application/x-www-form-urlencoded') {
                    Object.keys(data).forEach(key => {
                        dataStr += key + '=' + data[key] + '&'
                    })
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                } else if (contentType === 'application/json') {
                    dataStr = JSON.stringify(data);
                } else {
                    console.log('unkonwn');

                }
            }
            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', contentType);
            requestObj.send(dataStr);
            requestObj.onreadystatechange = function(e) {
                if (e.target.readyState === 4) {
                    if (e.target.status === 200) {
                        let obj = e.target.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(e.target.status)
                    }
                }
            }
        })
    }
}