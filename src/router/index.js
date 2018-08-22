import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import asyncComponent from "../utils/asyncComponent";
import app from "../App";
const parentLifeCycle = asyncComponent(() =>
  import("../components/lifeCycle/parentLifeCycle")
);
const helloWorld = asyncComponent(() =>
  import("../components/helloWorld/helloWorld")
);
const parentTransValue = asyncComponent(() =>
  import("../components/transValue/parent")
);
const list = asyncComponent(() => import("../components/list/list"));
const aboutRedux = asyncComponent(() =>
  import("../components/aboutRedux/wantedMovies")
);
const selectedList = asyncComponent(() =>
  import("../components/aboutRedux/selectedList")
);
const example = asyncComponent(() =>
  import("../components/antiDesign/example")
);
const transitionGroup = asyncComponent(() =>
  import("../components/transitionGroup/transitionGroup")
);
class RouteConfig extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={app} />
          <Route path="/parentLifeCycle" component={parentLifeCycle} />
          <Route path="/parentTransValue/:id" component={parentTransValue} />
          <Route path="/helloWorld" component={helloWorld} />
          <Route path="/list" component={list} />
          <Route path="/aboutRedux" component={aboutRedux} />
          <Route path="/selectedList" component={selectedList} />
          <Route path="/example" component={example} />
          <Route path="/transitionGroup" component={transitionGroup} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
export default RouteConfig;

/**
 * 1、Route组件有以下几个属性：(多数情况下component就可以满足需求，很少用到render和children)
 *    path属性，字符串类型，它的值就是用来匹配url的。
 *    component属性，它的值是一个组件。在path匹配成功之后会绘制这个组件。
 *    exact属性，这个属性用来指明这个路由是不是排他的匹配。
 *    strict属性， 这个属性指明路径只匹配以斜线结尾的路径。
 *    render属性，一个返回React组件的方法。例如：<Route path="/" render={()=><div>HomePage</div>} />
 *    children属性，返回一个React组件的方法。
 *
 * 2、在V4版本中，有一个包含关系，如果匹配path='/users'，则同时会匹配path='/',在页面中两个路由组件就会同时渲染，所以为了避免出现此情况，就用到exact，表示只对当前的路由进行匹配。
 *
 * 3、独立路由Switch，除了用exact只匹配一个路由之外，Switch同时也能只匹配一个路由
 *    采用 <Switch>，只有一个路由会被渲染，并且总是渲染第一个匹配到的组件。因此，在第一个路由中，还是需要使用 exact，否则，当我们渲染 '/users' 或 '/users/add' 时，只会显示匹配 '/' 的组件（PS：如果不使用 <Switch>，当我们不使用 exact 时，会渲染匹配的多个组件）。所以，将 '/user/add' 路由放在 '/users' 之前更好，因为后者包含了前者，当然，我们也可以同样使用 exact，这样就可以不用关注顺序了
 *
 *4、Redirect组件，单独使用时，一旦当路由匹配到的时候，浏览器就会进行重定向跳转；而配合 <Switch> 使用时，只有当没有路由匹配的时候，才会进行重定向。例如，path:'/nopath',没有此路径，跳转到path='/'
 *
 *
 * Route path="/:param" component={Home} />
 * 在Home组件中用this.props.match.params.param来获取匹配的参数；
 * 一旦路径匹配成功，match就会有四个属性，url、path、isExact、params
 * 在没有参数的时候match.url和match.path值是一样的，但是有参数的时候，就会有区别，例如：path="users/:userId",匹配到路径"users/123",match.url为users/123,match.path为users/:userId,所以在写路由路径的时候使用path,避免使用url。
 * 例如：
 * <Route path={`${match.url}/comments`} component={UserComments} />
 * <Route path={`${match.path}/comments`} component={UserComments} />
 *结果是：当访问 '/users/123/comments' 时渲染 'userId: undefined'；当访问 '/users/5/settings' 时渲染 'userId: 123'
 *match.url不能正常渲染，而match.path能正常渲染
 *
 *  match.path 可用于构造嵌套的 <Route>，而 match.url 可用于构造嵌套的 <Link>
 *
 *5、在V4中不再支持this.props.location.query来获取查询字符串，例如/users?bar=raz,但是可以获取到this.props.location.search(即?bar=raz)，若想要获取查询字符串，可采用插件：query-string,通过npm i query-string安装使用
 *
 *
 *<Link
          to={{
            pathname: "/parentTransValue/456",
            search: "?sort=transValue",
            query: { name: "componentTransValue" },
            userDefine:{ define: "user-define" },
            hash: "#the-hash",
            state: { value: 123 }
          }}
        ></Link>
 *
 *this.props分为三部分
 * 1、this.props.history:
 * this.props.history.go(n),
 * this.props.history.goForward(),
 * this.props.history.goBack(),
 * this.props.history.push({path:''}),
 * this.props.history.replace()
 * 
 * 2、this.props.location
 * this.props.location.hash---("the-hash")
 * this.props.location.pathname---("/parentTransValue/456")
 * this.props.location.query---({ name: "componentTransValue" })
 * this.props.location.userDefine---({ define: "user-define" })
 * this.props.location.search---(?sort=transValue)
 * 
 * 
 * 3、this.props.match
 * this.props.match.params---({id:'456'})
 * this.props.match.url---("/parentTransValue/456")
 * this.props.match.path---("/parentTransValue/:id")
 * this.props.match.isExact---(true)
 */
