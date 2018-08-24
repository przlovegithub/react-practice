import asyncComponent from "../utils/asyncComponent";
import app from "../App";
const parentLifeCycle = asyncComponent(() =>
    import ("../components/lifeCycle/parentLifeCycle")
);
const helloWorld = asyncComponent(() =>
    import ("../components/helloWorld/helloWorld")
);
const parentTransValue = asyncComponent(() =>
    import ("../components/transValue/parent")
);
const list = asyncComponent(() =>
    import ("../components/list/list"));
const aboutRedux = asyncComponent(() =>
    import ("../components/aboutRedux/wantedMovies")
);
const selectedList = asyncComponent(() =>
    import ("../components/aboutRedux/selectedList")
);
const example = asyncComponent(() =>
    import ("../components/antiDesign/example")
);
const transitionGroup = asyncComponent(() =>
    import ("../components/transitionGroup/transitionGroup")
);
const login = asyncComponent(() =>
    import ("../components/login/login"));
const noMatch = asyncComponent(() =>
    import ("../components/noMatch/noMatch"));
let routeMap = [
    { path: '/', component: app },
    { path: '/parentLifeCycle', component: parentLifeCycle },
    { path: '/parentTransValue/:id', component: parentTransValue },
    { path: '/helloWorld', component: helloWorld, needLogin: true },
    { path: '/list', component: list },
    { path: '/aboutRedux', component: aboutRedux },
    { path: '/selectedList', component: selectedList },
    { path: '/example', component: example, needLogin: true },
    { path: '/transitionGroup', component: transitionGroup },
    { path: '/login', component: login }
];
export { routeMap, noMatch };