/*
 * @Author: hehs
 * @Date: 2018-05-18 20:44:53
 * @Last Modified by: hehs
 * @Last Modified time: 2018-10-25 16:31:32
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import { sendMsgCode, sendMsgCodeAuth } from './../../actions/common'
import styles from './sendcode.less'

@connect((state, props) => ({}), null, null, { withRef: true })

/* 发送验证码组件 (有倒计时)
 * @type 非鉴权 1-注册 2-忘记密码 3-登录 12-邀请注册会员
 *       鉴权   7，实名认证 13-邀请成为连锁店
 * @phone 手机号
 * @btnClassName 按钮
 * @disabledClassName 非激活状态类名
 * @text 激活状态按钮文字
 * @disabledText 非激活状态时间后拼接的文字
 * @verifyRef 父组件的验证码输入框DOM
 */
export default class Sendcode extends Component {

  constructor(props){
    super(props);
    this.state = {
      active: true,   // 按钮激活状态 true可以点击
      // leftTime: 120   // 剩余时间
    }
	}

  componentDidMount(){

    let path = this.props.parentProps.location.pathname
    // 进入页面判断localStorage中是否有值
    // 如果有 计算剩余时间是否大于0 如果是 剩余时间开始倒计时
    // 如果没有 不做任何操作
    if ( localStorage[`${path}lastTime`] ) {
      if ( this.calculateTime() > 0 ) {
        this.cutDown()
      }
    }
	}

  componentWillUnmount (){
		// 清除定时器
    clearTimeout(this.myVar);
  }

  // 计算当前时间与上一次发送验证码的时间差是否大于120s 返回时间差
  calculateTime = () => {
    let path = this.props.parentProps.location.pathname
    return Math.round(120 - (new Date() - parseInt(localStorage[`${path}lastTime`])) / 1000)
  }

  // 重置时间 开始倒计时
  startCountDown = () => {
    let path = this.props.parentProps.location.pathname
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
    // Toast.info('开始倒计时2')
    let { leftTime } = this.state
    let path = this.props.parentProps.location.pathname

    this.setState({
      active: false
    },()=>{

      // 开始倒计时
      this.intervalId = setInterval(()=>{
        let storageTime = parseInt(localStorage[`${path}lastTime`])
        // 小于0时删除localstorage
        if ( this.state.leftTime <= 0 ) {
          clearInterval(this.intervalId)
          this.setState({
            active: true
          })
        }
        else {
          this.setState({
            leftTime: Math.round(120 - (new Date() - parseInt(localStorage[`${path}lastTime`])) / 1000)
          },()=>{

          })
        }
      },1000)
    })
  }

  // 发送验证码
  sendVerifyCode = () => {

    // Toast.info('点了一下',2)

    let { active } = this.state
    let { phone, type } = this.props
    let path = this.props.parentProps.location.pathname
    // 如果正在倒计时 不做任何操作 否则验证手机号

    if ( active ) {

      // setTimeout(() => {
      //   Toast.info('点第二下',1)
      // }, 2000);
      if ( type != 9 ) {
        phone = phone.replace(/\s/g,'')
      }


      // setTimeout(() => {
      //   Toast.info('third',1)
      //   Toast.info(phone,2)
      // }, 3000);

      // Toast.info(phone,2)

      // 手机号验证不通过
      if (!(/^1[123456789]\d{9}$/.test(phone))) {
        Toast.info('请输入正确的手机号码',1,null,false);
      }
      // if ( phone.length != 11 ) {
      //   setTimeout(() => {
      //     Toast.info('请输入正确的号码',1)
      //   }, 1000);

      // }
      // 手机号验证通过请求接口
      else {

        // setTimeout(() => {
        //   Toast.info('第三下',2,null,false)
        // }, 4000);
        // 鉴权获取验证码
        if ( type == 7 || type == 9 || type == 13 ) {
          this.props.dispatch(sendMsgCodeAuth({
            phone,
            type
          }, res => {
            // 请求成功 保存GID 给出提示 开始倒计时
            Toast.success('短信发送成功',1,null,false);
            localStorage.setItem('GID',res.headers.gid)
            this.startCountDown()
            this.props.verifyRef.current.focus()

          }, err => {
            Toast.info(err.data.msg,1.2,null,false)
          }));
        }
        // 非鉴权获取验证码
        else {
          // 如果是登录或注册 清除localStorage
          if ( type == 1 || type == 3 ) {
            localStorage.removeItem('GID')
            localStorage.removeItem('RetUserInfo')
            // localStorage.removeItem('ThirdAuthInfo')
            // localStorage.removeItem('AuthGetUserInfo')
            // localStorage.removeItem('isAuthsuccess')
            // localStorage.clear()
            sessionStorage.clear()
          }
          this.props.dispatch(sendMsgCode({
            phone,
            type
          }, res => {
            console.log(111)
            // 验证码输入框聚焦
            this.props.verifyRef.current.focus()
            console.log(222)
            // 请求成功 保存GID 给出提示 开始倒计时
            localStorage.setItem('GID',res.headers.gid)
            Toast.success('短信发送成功',1.2,null,false);
            this.startCountDown()

          }, err => {
            Toast.info(err.data.msg,1.2,null,false);
          }));
        }

      }
    }
  }

  // 离开组件清除定时器
  componentWillUnmount (){
    clearTimeout(this.intervalId);
    let path = this.props.parentProps.location.pathname
    localStorage.removeItem(`${path}lastTime`)
  }

  render(){

    let { active, leftTime } = this.state
    let { text, btnClassName, disabledClassName, disabledText } = this.props
    return(
      <div
        className={`${styles[`send-verify-btn-container`]} ${btnClassName} ${!active?disabledClassName:null}`}
        onClick={this.sendVerifyCode}
      >
        {/* 激活状态显示文字 非激活状态显示剩余时间 */}
        {
          active ?
          // text
          '获取验证码'  // 统一改成 "获取验证码"
          :
          leftTime ?
          `${leftTime}${disabledText}`
          :null
        }
      </div>
    );
  }
}