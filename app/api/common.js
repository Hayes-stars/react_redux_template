import { ajax } from 'utils'

//登录
export const login = ajax.fetchJSONByPost('/user/login.do','','java')

//注册
export const register = ajax.fetchJSONByPost('/user/register.do','','java');

//获取用户信息【鉴权】
export const getUserDatum = ajax.fetchJSONByPost('/userDatum/getUserDatum.do','','java');

//获取用户信息【非鉴权】
export const GetUserInfo = ajax.fetchJSONByPost('/userDatum/getUserInfo.do','','java')

//忘记密码
export const resetPwd = ajax.fetchJSONByPost('/user/forgetPassWord.do','','java');

//未登录获取验证码
export const sendMsgCode = ajax.fetchJSONByPost('/sms/no/login/sendSms.do','','java');

//未登录验证  验证码
export const chkVerifyCode = ajax.fetchJSONByPost('/sms/verifyCode.do','','java');

//已登录情况  获取验证码
export const sendMsgCodeAuth = ajax.fetchJSONByPost('/sms/login/sendSms.do','','java');

//根据微信（支付宝）授权code获取用户信息
export const getAuthConfigInfo = ajax.fetchJSONByPost('/circle.php/Index/getThirdAuthInfo','','php');

//根据授权信息  openid  unionid 获取小蜜用户信息
export const GetUserBindInfo = ajax.fetchJSONByPost('/user/authBind.do','','java');

//获取分享配置信息
export const GetSharesConfigInfo = ajax.fetchJSONByPost('/circle.php/Index/getShareInfo','','php');

// 用户编码执行登录
export const userCodeLogin = ajax.fetchJSONByPost('/user/userCodeLogin.do','','java');

// 动态授权时-用户绑定账号授权登录
export const userAuthLogin = ajax.fetchJSONByPost('/user/authLogin.do','','java');