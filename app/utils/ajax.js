/* axios ajax请求
 * @Author: hehs
 * @Date: Unknown
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-20 17:57:19
 */

import axios from 'axios'
import * as config from './../config'
import { getXLemonSign } from './public'

/**
 * 生成头部信息
 * @param {*} apitype  请求标识
 * @param {*} params   请求参数
 */
const createHeaders = ( apitype, params ) => {

  let headers = {}

  // apptype 客户端标识 1-安卓 2-ios 3-web 4-pos 8-小程序，
  let apptype = localStorage.getItem('apptype')
  // 区分客户端接口请求来源
  let termTyp = apptype && apptype == 1 ? 'android' : apptype && apptype == 2 ? 'ios' : apptype && apptype == 8 ||  apptype == 9 ? 'applet' : 'web';
  // 设备版本号
  let osVersion = apptype && apptype == 1 || apptype == 2 ? localStorage.getItem('osVersion') : 'v1.0.0';
  // 设备id
  let deviceId = apptype && apptype == 1 ? 'ANDROID' : apptype && apptype == 2 ? '123456789' : '';
  // 通道标识 0-所有平台 1-小蜜app 2-经销商app 3-硬件平台 4-蜜购 5-蜜餐 6-蜜零
  let channelId = localStorage.getItem('channelId') && localStorage.getItem('channelId') != 'undefined' ? localStorage.getItem('channelId') : 4;

  let GID = localStorage.getItem('GID'); // 用户openid

  headers['Content-Type'] = 'application/json'
  headers['termTyp'] = termTyp
  headers['appVersion'] = 'v1.2.0'
  headers['channelId'] = channelId
  headers['MD5'] = getXLemonSign(params)

  if ( GID ) {
    if( apitype == "python" ){
      headers['GID'] = GID;
      // headers['U'] = GID+'!'+ JSON.parse(localStorage.getItem('RetUserInfo')).cucode;
      headers['U'] = JSON.parse(localStorage.getItem('RetUserInfo')) ? `${GID}!${JSON.parse(localStorage.getItem('RetUserInfo')).cucode}`: GID;
    } else {
      headers['GID'] = GID
    }
  }
  if ( apitype == 'java' ) {
    headers['osVersion'] = osVersion
    headers['deviceId'] = deviceId
  }


  return {headers};
}


/**
 * 创建axios请求
 * @param {*} url     接口地址
 * @param {*} target  target
 * @param {*} apitype 请求目标地址标识
 * @param {*} headers 头部信息
 * @param {*} params  请求参数
 * @param {*} method  请求方式 String post/get
 */
const axiosFetch = ( url, target, apitype, params, method ) => {
  let prefixJSON = {
    java: config.prefixJava,
    javapos: config.prefixJavaPOS,
    php: config.prefixPHP,
    shop: config.prefixShop,
    shopAgent: config.prefixShopAgent,
    phpAct: config.prefixPHPAct,
    python: config.prefixPython,
    default: config.prefix
  }

  let headers = createHeaders(apitype, params)

  // 接口地址
  let newUrl = ''
  if ( target ) {
    newUrl = `${target}${url}${config.suffix}`
  }
  else {
    if ( apitype ) {
      newUrl = `${prefixJSON[apitype]}${url}${config.suffix}`
      return method == 'post' ? axios.post(newUrl, params, headers) : axios.get(newUrl, params, headers)
    }
    else {
      newUrl = `${prefixJSON['default']}${url}${config.suffix}`
      return method == 'post' ? axios.post(newUrl, params) : axios.get(newUrl, params)
    }
  }
}

// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = (url, target, apitype) => query => axiosFetch( url, target, apitype, query, 'post' )

export const fetchJSONByGet = (url, target, apitype) => query => axiosFetch( url, target, apitype, query, 'get' )