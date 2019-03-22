import { Toast } from 'antd-mobile';
// import { XmToast } from './../components/XmToast/index'
// import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router'
import * as ajaxFun from './ajax'
import { LoginRegist } from './public'

export const ajax = ajaxFun
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const logOut = () => {
  // Toast.info('请重新登录', 1)
  // localStorage.clear();
  localStorage.removeItem('RetUserInfo')
  localStorage.removeItem('GID')
  sessionStorage.clear()
  LoginRegist()
  //退出重新登录
  // browserHistory.push('/login?isgoback=1');
}

export const createAjaxAction = (api, startAction, endAction) => (data, cb, reject) =>
  (dispatch) => {
    // Toast.loading("正在加载...",0)
    let respon
    let newData = data
    startAction && dispatch(startAction())
    // 每个请求带上token
    const token = sessionStorage.getItem('token')
    if (token) {
      if (!newData) {
        newData = {}
      }
      newData.token = token || null
    }
    newData = isArray(newData) ? newData : [newData]
    api(...newData)
      .then((resp) => {
        // Toast.hide()
        respon = resp
        endAction && dispatch(endAction({ req: newData, res: resp }))
      }).then(() => {
        // Toast.hide()
        if (respon.data.code === '00000' || respon.data.code === '0' || respon.data.code === 0) {
          cb && cb(respon)
          // logOut()
          return
        } else if (respon.data.code === '30002' || respon.data.code === -1 || respon.data.code === 30002) {
          // 未授权
          logOut()
          return
        } else if (typeof (reject) == 'function') {
          // Toast.fail(`${respon.data.code}-${respon.data.msg}`, 1)
          reject(respon)
          return
        } else {
          // Toast.fail(respon.data.msg, 1)
        }
      })
      .catch(catchError) // eslint-disable-line no-use-before-define
  }

function catchError(error) {
  const { response } = error
  if (!response) {
    // Toast.fail('请求失败, 请重试', 2, null, false)
    return
  }
  if (response.status === 401) {
    Toast.fail('请重新登录！')
    // 线上环境，刷新页面以重定向到登录页面
    process.env.NODE_ENV === 'production' && location.reload()
  } else if (response.status === 403) {
    Toast.fail('你缺少相关权限，部分功能无法使用')
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
