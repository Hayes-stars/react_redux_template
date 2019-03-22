import {
  createAction,
} from 'redux-actions'
import {
  common,
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


// export const requestAmList = createAction('request am list')
// export const recevieAmList = createAction('receive am list')
// export const fetchAmList = createAjaxAction(common.amList, requestAmList, recevieAmList)
// export const resetAmList = createAction('reset am list')
//登录
export const fetchLogin = createAjaxAction(common.login);

//注册
export const fetchRegister = createAjaxAction(common.register);

//获取用户信息【鉴权】
export const getUserDatum = createAjaxAction(common.getUserDatum);

//获取用户信息【非鉴权】
export const GetUserInfo = createAjaxAction(common.GetUserInfo);

//忘记密码
export const resetPwd = createAjaxAction(common.resetPwd);

//未登录获取验证码
export const sendMsgCode = createAjaxAction(common.sendMsgCode);

//未登录验证  验证码
export const chkVerifyCode = createAjaxAction(common.chkVerifyCode);

//已登录情况  获取验证码
export const sendMsgCodeAuth = createAjaxAction(common.sendMsgCodeAuth);

//根据微信（支付宝）授权code获取用户信息
export const getAuthConfigInfo = createAjaxAction(common.getAuthConfigInfo);

//根据授权信息  openid  unionid 获取小蜜用户信息
export const GetUserBindInfo = createAjaxAction(common.GetUserBindInfo);

//获取分享配置信息
export const GetSharesConfigInfo = createAjaxAction(common.GetSharesConfigInfo);

// 用户编码执行登录
export const fetchUserCodeLogin = createAjaxAction(common.userCodeLogin);

// 动态授权时-用户绑定账号授权登录
export const fetchUserAuthLogin = createAjaxAction(common.userAuthLogin);