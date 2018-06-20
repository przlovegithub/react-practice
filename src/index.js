import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import store from './store/store';
import Route from './router/';
import FastClick from 'fastclick';
import './utils/rem';
import './style/base.scss';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
// import VConsole from 'vconsole/dist/vconsole.min.js' //若是不引入，则不打包到app.js中
FastClick.attach(document.body);
// 初始化vConsole
// new VConsole({
//     defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
//     maxLogNumber: 1000,
//     // disableLogScrolling: true,
//     onReady: function() {
//         console.log('vConsole is ready!');
//     },
//     onClearLog: function() {
//         console.log('on clearLog');
//     }
// });

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    // Provider作为顶层组件，提供数据源，然后可以源源不断的从它向下流到各级子孙节点上去，所以Redux把store注册到Provider中
    // Provider接受一个属性store，这就是我们全局的数据store。我们要根据reducer函数来创建它
       <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}
registerServiceWorker();