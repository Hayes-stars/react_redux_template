/* 验证码组件 已废弃
 * @Author: cellerchan
 * @Date: 2018-07-25 20:52:47
 * @Last Modified by: cellerchan
 * @Last Modified time: 2018-08-06 14:56:24
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import { sendMsgCode, sendMsgCodeAuth } from './../../actions/common'
import styles from './sendcode_new.less'

@connect((state, props) => ({}), null, null, { withRef: true })

/** 发送验证码组件
 * @type 非鉴权 1-注册 2-忘记密码 3-登录 12-邀请注册会员   鉴权 7，实名认证 13-邀请成为连锁店
 * @phone 手机号
 * @text 激活状态文字
 */
export default class SendVerifyCodeBtn extends Component {

  constructor(props){
    super(props)
    this.state = {
      active: true,   // 按钮激活状态 true可以点击
      leftTime: 120   // 剩余时间
    }
  }

  componentDidMount(){

    let { path } = this.props.parentProps.route

    // 进入页面判断localStorage中是否有值
    // 如果有 计算剩余时间是否大于0 如果是 剩余时间开始倒计时
    // 如果没有 不做任何操作
    if ( localStorage[`${path}lastTime`] ) {
      if ( this.calculateTime() > 0 ) {
        this.cutDown()
      }
    }
  }

  // 计算当前时间与上一次发送验证码的时间差是否大于120s 返回时间差
  calculateTime = () => {
    let { path } = this.props.parentProps.route
    return Math.round(120 - (new Date() - parseInt(localStorage[`${path}lastTime`])) / 1000)
  }

  // 重置时间 开始倒计时
  startCountDown = () => {
    let { path } = this.props.parentProps.route
    // 设置当前页面localStorage倒计时为120
    localStorage.setItem([`${path}lastTime`], new Date().getTime())
    // 重置页面时间为120 开始倒计时
    this.setState({
      leftTime: 120
    },()=>{
      this.cutDown()
    })
  }

  // 倒计时
  cutDown = () => {
    let { leftTime } = this.state
    let { path } = this.props.parentProps.route

    this.setState({
      active: false
    },()=>{

      // 开始倒计时
      let intervalId = setInterval(()=>{
        let storageTime = parseInt(localStorage[`${path}lastTime`])
        // 小于0时删除localstorage
        if ( this.state.leftTime <= 0 ) {
          clearInterval(intervalId)
          this.setState({
            active: true
          })
        }
        else {
          this.setState({
            leftTime: Math.round(120 - (new Date() - parseInt(localStorage[`${path}lastTime`])) / 1000)
          },()=>{
            console.log(this.state)
          })
        }
      },1000)
    })
  }

  // 发送验证码
  sendVerifyCode = () => {

    let { active } = this.state
    let { phone, type } = this.props
    let { path } = this.props.parentProps.route

    // 如果正在倒计时 不做任何操作 否则验证手机号
    if ( active ) {

      phone = phone.replace(/\s/g,'')

      // 手机号验证不通过
       if (!(/^1[3456789]\d{9}$/.test(phone))) {
        Toast.info('请输入正确的手机号码',1.2,null,false);
      }
      // 手机号验证通过请求接口
      else {
        // 鉴权获取验证码
        if ( type == 7 || type == 13 ) {
          this.props.dispatch(sendMsgCodeAuth({
            phone,
            type
          }, res => {
            // 请求成功 保存GID 给出提示 开始倒计时
            localStorage.setItem('GID',res.headers.gid)
            Toast.success('短信发送成功--鉴权',1.2,null,false);
            this.startCountDown()
          }, err => {
            Toast.info(err.data.msg,1.2,null,false)
          }));
        }
        // 非鉴权获取验证码
        else {
          this.props.dispatch(sendMsgCode({
            phone,
            type
          }, res => {
            // 请求成功 保存GID 给出提示 开始倒计时
            localStorage.setItem('GID',res.headers.gid)
            Toast.success('短信发送成功--非鉴权',1.2,null,false);
            this.startCountDown()

          }, err => {
            Toast.info(err.data.msg,1.2,null,false);
          }));
        }

      }
    }
  }

  render() {

    let { active, leftTime } = this.state

    let { text } = this.props
    return (
      <div className={`${styles['send-verify-btn-container']} ${active?styles['active']:null}`}
        onClick={this.sendVerifyCode}
      >
        {/* 激活状态显示文字 非激活状态显示剩余时间 */}
        {
          active ?
          text
          :
          `${leftTime}s`
        }
      </div>
    )
  }
}
