import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './base'
import { useBasename, createHistory } from 'history'
import { RightBarEmpty } from 'utils/public.js'


// index 首页
const Index = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/index/index').default)
  }, 'index')
}

// 授权页面
const Auth = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/auth').default)
  }, 'auth')
}


/*注册*/
const register = (location,cb) => {
  require.ensure([],(require) => {
    cb(null,require('./pages/login/register').default)
  },"register");
}

/*登录*/
const login = (location,cb) => {
  require.ensure([],(require) => {
    cb(null,require('./pages/login/login').default)
  },"login");
}

/*忘记密码*/ 
const forgetpwd = (location,cb) => {
  require.ensure([],(require) => {
    cb(null,require('./pages/login/forgetpwd').default)
  },"forgetpwd");
}

/*忘记密码*/
const surepwd = (location,cb) => {
  require.ensure([],(require) => {
    cb(null,require('./pages/login/surepwd').default)
  },"surepwd");
}

//帮助-用户使用协议
const UserRead = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/helpdoc/userRead').default)
    }, 'userRead')
}

/*  进入判断授权 */
function isLogin(nextState, replaceState) {
  const token = localStorage.getItem('GID');
  if (!token) {
    console.log(nextState);
    replaceState('/login')
  }else{
    // replaceState('/');
  }
}

//404页面
const NotFound = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/common/notFound').default)
  }, 'notFound')
}

// 尊享联盟会员大转盘
const BagWheel = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/bagWheel/bagWheel').default)
    }, 'bagWheel')
}

/* 按需加载   如果需要index.php访问，路由跳转链接上加上index.php即可*/
export default () => (
    <Router history={useBasename(() => browserHistory)({ basename: BASENAME })}>
    <Route path="/" component={App}>
      {/* 商城首页 */}
      <IndexRoute getComponent={Index} />
      <Route path="/index" getComponent={Index}/>

      {/* 用户协议 */}
      <Route path="/userRead" getComponent={UserRead}></Route>
      {/* 尊享联盟会员大转盘 */}
      <Route path="/bagWheel" getComponent={BagWheel} onEnter={() => {RightBarEmpty()}}></Route>
    </Route>

    {/* 登录注册 */}
    <Route path="/login" >
      <IndexRoute getComponent={login} />
      <Route path="/register">
        <IndexRoute getComponent={register} />
        <Route path="/forgetpwd" getComponent={forgetpwd} />
        <Route path="/surepwd" getComponent={surepwd} />
      </Route>
    </Route>

    {/* 授权入口 */}
    <Route path="/auth" getComponent={Auth} />
    {/* 404页面 */}
    <Route path='*' exact={true} getComponent={NotFound} />
  </Router>
)