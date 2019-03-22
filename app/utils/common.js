/* JS公用方法
 * @Author: cellerchan
 * @Date: 2018-07-09 20:24:16
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-19 16:52:45
 */
import { push } from 'react-router-redux'
import { returnset, returnsetRefresh } from 'utils/public'
import moment from 'moment'

/**
 * 页面跳转
 * @param {组件对象} self
 * @param {跳转路由} pathname
 * @param {跳转路由参数} params
 */
export const jump = ( self, pathname, params, type = 'query' ) => {

  let path = {}
  if (type === 'state') {
    path = {
      pathname: `${BASENAME}${pathname}`,
      state: params
    }
  } else {
    path = {
      pathname: `${BASENAME}${pathname}`,
      query: params
    }
  }
  self.props.dispatch(push(path))
}

export const jumpQuery = ( self, pathname, params ) => {
  let path = {
    pathname,
    query: params
  }
  localStorage.setItem(`${pathname}queryParams`,JSON.stringify(params))
  self.props.dispatch(push(path))
  // self.props.dispatch(push(`${pathname}`))
}

/**
 * 开启弹窗
 * @param {组件对象} self
 * @param {弹窗标志} key
 */
export const modalOpen = ( self, key ) => {
  self.setState({
    [key]: true
  })
}

/**
 * 关闭弹窗
 * @param {组件对象} self
 * @param {弹窗标志} key
 */
export const modalClose = ( self, key ) => {
  self.setState({
    [key]: false
  })
}

/**
 * 获取时间段
 */
export const getTimeDuration = () => {
  let now = moment().format('YYYY-MM-DD')
  let dayOfWeek = parseInt(moment().format('E'))
  let dayOfMonth = parseInt(moment().format('D'))
  let aYearBefore = moment().subtract(365, 'days').format('YYYY-MM-DD')

  let firstDayOfWeek = dayOfWeek > 0 ?
                      moment().subtract(dayOfWeek-1, 'days').format('YYYY-MM-DD') //周一日期
                      :
                      moment().subtract(6, 'days').format('YYYY-MM-DD') //周一日期
  let firstDayOfMonth = dayOfMonth > 0 ?
                      moment().subtract(dayOfMonth-1, 'days').format('YYYY-MM-DD')
                      :
                      moment().subtract(0, 'days').format('YYYY-MM-DD')
  let latestPrev30 = moment().subtract(29, 'days').format('YYYY-MM-DD')
  return {
    now,
    firstDayOfWeek,
    firstDayOfMonth,
    latestPrev30,
    aYearBefore
  }
}

/**
 * 格式化金额数值
 */
export const formatPrice = ( num ) => {
  if ( num ) {
    let mainText = Number(num).toFixed(2) + ''
    let dotIndex = mainText.indexOf('.')
    let mainNum = mainText.slice(0, dotIndex)
    let subNum = mainText.slice(dotIndex+1)
    return mainNum + '.' + subNum
  }
  else {
    return '0.00'
  }
}

/**
 * 获取用户类型 merchant user
 */
export const getUserType = () => {
  let userInfo = JSON.parse(localStorage.getItem('RetUserInfo'))
  let isWebView = localStorage.getItem('apptype')
  let userType = localStorage.getItem('switchroles')
  if ( isWebView ) {
    if ( userType == '1' ) {
      return 'merchant'
    }
    else {
      return 'user'
    }
  }
  else {
    if ( userInfo.cshop.code == '1' ) {
      return 'merchant'
    }
    else {
      return 'user'
    }
  }
}

/**
 *  免费商家激活成为实力商家接口公用方法
 */

//获取激活码的值
export const activeCodeValue = (self, e) => {
  self.setState({
    codeValue: e
  })
}

