import React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
import app from '../App'
const parentLifeCycle = asyncComponent(() => import('../components/lifeCycle/parentLifeCycle'))
const helloWorld = asyncComponent(()=>import('../components/helloWorld/helloWorld'))
const parentTransValue = asyncComponent(()=>import('../components/transValue/parent'))
const list = asyncComponent(() => import('../components/list/list'))
const aboutRedux = asyncComponent(() => import('../components/aboutRedux/wantedMovies'))
const selectedList = asyncComponent(() => import('../components/aboutRedux/selectedList'))
const example = asyncComponent(() => import('../components/antiDesign/example'))
class RouteConfig extends React.Component{
    render(){
        return <HashRouter>
            <Switch>
              <Route path="/" exact component={app} />
              <Route path="/parentLifeCycle" component={parentLifeCycle} />
              <Route path="/parentTransValue/:id" component={parentTransValue} />
              <Route path="/helloWorld" component={helloWorld} />
              <Route path="/list" component={list} />
              <Route path="/aboutRedux" component={aboutRedux} />
              <Route path="/selectedList" component={selectedList} />
              <Route path="/example" component={example} />
              <Redirect to="/" />
            </Switch>
          </HashRouter>;
    }
}
export default RouteConfig;