import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import './utils/rem';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    // Provider作为顶层组件，提供数据源，然后可以源源不断的从它向下流到各级子孙节点上去，所以Redux把store注册到Provider中
    // Provider接受一个属性store，这就是我们全局的数据store。我们要根据reducer函数来创建它
      <AppContainer>
        <Component />
      </AppContainer>,
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