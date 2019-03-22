/**
 * @version 4.1.0  微信，支付宝授权配置文件
 * @author hehs
 * @Date: 2018-06-01
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-20 17:56:18
 */

import { urlencode, isAlipayOrWechat } from './../utils/public'
import { AUTHWXAPPIDSTR, AUTHALIPAYIDSTR } from './../config'
import { getAuthConfigInfo, GetUserBindInfo, fetchUserCodeLogin } from './../actions/common'
import { Toast } from 'antd-mobile';
import moment from 'moment'

/**
 * 作用：微信--可以获得code的url
 * @param {string} redirectUrl 授权url地址
 * @param {string} scope scope:snsapi_base静态授权,snsapi_userinfo需确认授权
 */
export const createWxOauthUrlForCode = (redirectUrl, scope) => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AUTHWXAPPIDSTR}&redirect_uri=${urlencode(redirectUrl)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
}


/**
 * 作用：支付宝--可以获得auth_code的url
 * @param {string} redirectUrl 授权url地址
 * @param {string} scope scope:auth_user获取用户信息（动态授权）,auth_base（用户信息静态授权）
 */
export const createAliOauthUrlForCode = (redirectUrl, scope) => {
  return `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${AUTHALIPAYIDSTR}&scope=${scope}&redirect_uri=${urlencode(redirectUrl)}`
  // return `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?appid=${AUTHALIPAYIDSTR}&redirect_uri=${urlencode(redirectUrl)}&scope=${scope}&state=1`;
}

/**
 * 请求授权链接 获取code
 * @param {string} auth_code 授权code
 * @param {string} auth_scope 授权类型 支付宝scope:auth_user获取用户信息（动态授权）,auth_base（用户信息静态授权） 微信：snsapi_base静态授权,snsapi_userinfo需确认授权
 * @param {string} callBackUrl 授权url地址
 * @param {object} _self 当前授权page  this
 * @param {function} cb 回调方法
 */
export const GetAuthorization = (auth_code, auth_scope, callBackUrl, _self, cb) => {
  var copenid
  var cunionid
  console.log("获取授权用户信息", JSON.parse(localStorage.getItem('ThirdAuthInfo')))
  if (JSON.parse(localStorage.getItem('ThirdAuthInfo'))) {
    // 判断是否已授权
    copenid = JSON.parse(localStorage.getItem('ThirdAuthInfo')).openid;
    cunionid = JSON.parse(localStorage.getItem('ThirdAuthInfo')).unionid;
    console.log("授权用户openid", copenid)
    console.log("授权用户unionid", cunionid)
    if (auth_scope == 'auth_user' || auth_scope == 'snsapi_userinfo') {
      // 如果是动态授权判断unionid是否存在，不存在需重新授权
      if (cunionid === null || cunionid === '' || typeof cunionid === 'undefined') {
        executeAuthOprate(auth_code, auth_scope, callBackUrl, _self, cb)
      }
    } else {
      // 静态授权判断openid是否存在，不存在需重新授权
      if (copenid === null || copenid === '' || typeof copenid === 'undefined') {
        executeAuthOprate(auth_code, auth_scope, callBackUrl, _self, cb)
      }
    }
  } else {
    console.log("授权用户openid--222", copenid)
    console.log("授权用户unionid--222", cunionid)
    if (auth_scope == 'auth_user' || auth_scope == 'snsapi_userinfo') {
      // 动态授权
      executeAuthOprate(auth_code, auth_scope, callBackUrl, _self, cb)
    } else {
      // 静态授权
      executeAuthOprate(auth_code, auth_scope, callBackUrl, _self, cb)
    }
  }
}


/**
 * 执行授权操作
 * @param {string} auth_code 授权code
 * @param {string} auth_scope 授权类型 支付宝scope:auth_user获取用户信息（动态授权）,auth_base（用户信息静态授权） 微信：snsapi_base静态授权,snsapi_userinfo需确认授权
 * @param {string} callBackUrl 授权url地址
 * @param {object} _self 当前授权page  this
 * @param {function} cb 回调方法
 */
export const executeAuthOprate = (auth_code, auth_scope, callBackUrl, _self, cb) => {
  // 判断授权方式 1微信  2支付宝
  var auth_way = isAlipayOrWechat() == 'ALIPAY' ? 2 : 1;
  // 如果有authcode则不需要再请求授权链接
  if (auth_code && typeof auth_code !== 'undefined') {
    let php_auth_type = 1; // php 微信（支付宝）授权code获取用户信息接口  1静态授权  2动态授权
    if (auth_way == 1) {
      php_auth_type = auth_scope == "snsapi_base" ? 1 : 2
    } else {
      php_auth_type = auth_scope == "auth_base" ? 1 : 2
    }
    if (!JSON.parse(localStorage.getItem('ThirdAuthInfo'))) {
      // 请求授权接口
      RequestAuthorization(auth_code, php_auth_type, auth_way, _self, cb);
    }
  } else {
    // 授权链接  获取auth_code
    if (auth_way == 1) {
      // 微信授权
      console.log(createWxOauthUrlForCode(callBackUrl, auth_scope));
      window.location.href = createWxOauthUrlForCode(callBackUrl, auth_scope);//跳转微信授权链接
    } else {
      // 支付宝授权
      console.log(createAliOauthUrlForCode(callBackUrl, auth_scope));
      // window.open(createAliOauthUrlForCode(callBackUrl,auth_scope));
      window.location.href = createAliOauthUrlForCode(callBackUrl, auth_scope);//跳转支付宝授权链接
    }
  }
}

/**
 * 根据微信（支付宝）授权code获取用户信息
 * @param {string} auth_code 授权code
 * @param {string} auth_scope 授权类型 1静态授权  2动态授权
 * @param {int} auth_way 1微信  2支付宝
 */
export const RequestAuthorization = (auth_code, auth_scope, auth_way, _self, cb) => {
  _self.props.dispatch(getAuthConfigInfo({
    "auth_code": auth_code,
    "auth_type": auth_scope,
    "auth_sign": auth_way
  }, (res) => {
    let data = res.data.data
    data.timeTmp = moment().format('YYYY-MM-DD hh:mm:ss')
    localStorage.setItem('ThirdAuthInfo', JSON.stringify(data));
    RequestGetUserInfo(res.data.data.openid, res.data.data.unionid, auth_scope, auth_way, _self, cb);
  }, (err) => {
    Toast.hide();
    Toast.fail(err.data.msg, 2);
  }))
}

/**
 * 获取用户信息 ucode等
 * @param {string} openid 第三方授权用户openid
 * @param {string} unionid 第三方授权用户unionid
 * @param {string} auth_way 授权方式 1微信 2支付宝
 * @param {int} auth_scope 授权类型 1静态授权 2动态授权
 */
export const RequestGetUserInfo = (openid, unionid, auth_scope, auth_way, _self, cb) => {
  console.log('获取用户户绑定授权关系openid', openid);
  _self.props.dispatch(GetUserBindInfo({
    cUnionid: unionid,
    cType: auth_way,
    cOpenid: openid,
  }, (res) => {
    console.log('授权类型-是否是动态授权', auth_scope)
    //获取的用户信息需保存localStorage
    console.log("获取用户绑定授权关系小蜜用户信息", res);
    // let GID = res.headers.gid;
    let data = res.data.data
    console.log('获取用户绑定授权关系小蜜用户信息-data', data);
    let GetUserInfo = {};
    if (auth_scope == 1) {
      //静态授权
      if (data) {
        GetUserInfo.cisagent = data.cIsagent;//判断是否是经销商，0不是,1销售经理,2经销商
        GetUserInfo.cisfixed1 = data.cisfixed1;//判断是否为实体商家1,0
        GetUserInfo.cnickname = data.cNickname;
        GetUserInfo.cshop = data.cShop;//判断是否为商家1,0
        GetUserInfo.cucode = data.cUcode;//用户ucode
        GetUserInfo.realNameFlag = data.realNameFlag;//是否实名认证N否
        GetUserInfo.cheadimg = data.cHeadimg;//用户头像
        GetUserInfo.cphone = data.cPhone;//手机号码
        GetUserInfo.isUnionMember = data.isUnionMember.code; // 是否是联盟会员1,0
        GetUserInfo.unionMemberTerm = data.unionMemberTerm; // 会员过期时间
        //静态授权
        localStorage.removeItem('AuthGetUserInfo')
        localStorage.removeItem('GID')

        localStorage.setItem('GID', res.headers.gid);//存储会话id
        localStorage.setItem('AuthGetUserInfo', JSON.stringify(GetUserInfo));//存储用户信息
      }      
      //授权成功回调处理
      cb && cb();
    } else {
      //动态授权
      if (data) {
        GetUserInfo.cisagent = data.cIsagent;//判断是否是经销商，0不是,1销售经理,2经销商
        GetUserInfo.cisfixed1 = data.cisfixed1;//判断是否为实体商家1,0
        GetUserInfo.cnickname = data.cNickname;
        GetUserInfo.cshop = data.cShop;//判断是否为商家1,0
        GetUserInfo.cucode = data.cUcode;//用户ucode
        GetUserInfo.realNameFlag = data.realNameFlag;//是否实名认证N否
        GetUserInfo.cheadimg = data.cHeadimg;//用户头像
        GetUserInfo.cphone = data.cPhone;//手机号码
        GetUserInfo.payFlag = data.payFlag.code; // 1已设置支付密码，0未设置
        GetUserInfo.isUnionMember = data.isUnionMember.code; // 是否是联盟会员1,0
        GetUserInfo.unionMemberTerm = data.unionMemberTerm; // 会员过期时间
        // GetUserInfo.roles = data.roles;//角色
        // 1	person	个人
        // 2	online_merchant	线上商家
        // 3	online_merchant	线下商家
        // 4	agent	经销商
        // 5	region_agent	销售经理
        // 6	privilege	特权

        console.log('获取用户动态小蜜用户信息-data', data);
        console.log('获取用户动态小蜜用户信息-GetUserInfo', GetUserInfo);
        //判断是否授权成功并获取到用户信息
        localStorage.removeItem('isAuthsuccess');
        localStorage.setItem('isAuthsuccess', 'YES');

        //授权信息成功获取到cUcode时后台执行登录
        _self.props.dispatch(fetchUserCodeLogin({
          cUcode: GetUserInfo.cucode,
        }, (success) => {  
          console.log('ucode执行登录', success)
          if (localStorage.getItem('RetUserInfo')) {
            //如果有存在用户信息则清空再存值
            localStorage.removeItem('RetUserInfo');
            localStorage.removeItem('GID');


            localStorage.setItem('GID', success.headers.gid);//存储会话id
            localStorage.setItem('RetUserInfo', JSON.stringify(GetUserInfo));//存储用户信息
          } else {
            localStorage.setItem('GID', success.headers.gid);//存储会话id
            localStorage.setItem('RetUserInfo', JSON.stringify(GetUserInfo));//存储用户信息
          }    

          //授权成功回调处理
          cb && cb();

        }, (error) => {
          console.log('ucode执行登录Err', error)
          Toast.hide();
          Toast.fail(error.data.msg, 2);
        }))

      } else {        
        //判断是否授权成功并没有获取到用户信息
        localStorage.removeItem('isAuthsuccess');
        localStorage.setItem('isAuthsuccess', 'NO');
        //授权成功回调处理
        cb && cb();
      }
    }

    Toast.hide();

  }, (err) => {
    Toast.hide();
    Toast.fail(err.data.msg, 2);
  }))
}

