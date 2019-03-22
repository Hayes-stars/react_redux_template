/*
 * @Author: hehs
 * @Date: 2018-05-18 20:44:53
 * @Last Modified by: cellerchan
 * @Last Modified time: 2018-07-25 20:49:41
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import { sendMsgCode, sendMsgCodeAuth } from './../../actions/common'
import styleLogin from './sendcode.less'

@connect((state, props) => ({}), null, null, { withRef: true })

/* 发送验证码组件 (有倒计时)
 * @classNameType ==btn-verify-none 没有背景色，没有圆角按钮样式值，==btn-verify有背景色，圆角
 * @type 非鉴权 1-注册 2-忘记密码 3-登录，
 *       鉴权   7，实名认证 12-邀请注册会员 13-邀请成为连锁店
 * @phone 手机号
 * @btnStyleType 按钮是否有背景色
 * @pagetype 区分页面  page text
 */
export default class Sendcode extends Component {

  constructor(props){
    super(props);
    this.state = {
      sendBtnstate:false,
      [this.props.pagetype+"countingDone"]:true,//是否显示倒计时
      [this.props.pagetype+"counttext"]:'获取验证码',//按钮文案
    }
  }

  //发送短信
  sendVerify =()=>{
    if(this.props.phone==""){
      Toast.info('请输入手机号码',2);
    }  else if(!(/^1[3456789]\d{9}$/.test(this.props.phone.replace(/\s/g,'')))){
      Toast.info('请输入正确的手机号码',2);
      // this.setState({
      //     btnActive:"",
      //     hasSubState:false
      // });
    }else{
      //实名认证  鉴权  请求发送短信验证码接口
      let _self = this;
      //获取验证码：type:1注册，2忘记密码，3登录；7实名认证 13邀请成为连锁店
      if(this.props.type==7 || this.props.type==13 ){
        console.log(this.props.type);
        this.props.dispatch(sendMsgCodeAuth({phone:this.props.phone.replace(/\s/g, ''),type:this.props.type},(respose)=>{
          // console.log(respose);
          // console.log(respose.headers.gid);
          localStorage.setItem('GID',respose.headers.gid);//存储会话id
          Toast.info('短信发送成功',2);
          _self.setState({
            [this.props.pagetype+"countingDone"]:false,
          })
          //获取验证码倒计时
          localStorage.setItem(this.props.pagetype+"countdown",120);
          _self.countdown();

        }, (err)=>{
          console.log(err);
          Toast.info(err.data.msg,2);
        }));
      } else {
        //登录注册忘记密码 非鉴权  请求发送短信验证码接口
        let _self = this;
        //获取验证码：type:1注册，2忘记密码，3登录
        // console.log(this.props.type);
        this.props.dispatch(sendMsgCode({phone:this.props.phone.replace(/\s/g, ''),type:this.props.type},(respose)=>{
          // console.log(respose);
          // console.log(respose.headers.gid);
          localStorage.setItem('GID',respose.headers.gid);//存储会话id
          Toast.info('短信发送成功',2);
          _self.setState({
            [this.props.pagetype+"countingDone"]:false,
          })
          //获取验证码倒计时
          localStorage.setItem(this.props.pagetype+"countdown",120);
          _self.countdown();

        }, (err)=>{
          console.log(err);
          // console.log(err.headers.gid);
          // localStorage.setItem('GID',err.headers.gid);//存储会话id
          Toast.info(err.data.msg,2);
        }));
      }
    }
  }

  //倒计时
  countdown =()=>{
    let _self = this;
    var timesval = localStorage[this.props.pagetype+"countdown"];
    if (timesval == 0 || isNaN(timesval)) {
      clearTimeout(this.myVar);
      // localStorage.removeItem(this.props.pagetype+"countdown");
      _self.setState({
        [this.props.pagetype+"countingDone"]:false,//是否显示倒计时
        [this.props.pagetype+"counttext"]:'获取验证码',//
      })
      return;
    }else{
      _self.setState({
        [this.props.pagetype+"countingDone"]:true,
        [this.props.pagetype+"counttext"]:timesval+"s",
      })
      timesval--;
      // localStorage.setItem(this.props.pagetype+"countdown",timesval);
    }
    this.myVar = setTimeout(function() {_self.countdown()},1000);
  }
  //组件加载完毕之后立即执行
  componentDidMount (){
    this.myVar = null;//验证码倒计时--时间器
    this.setState({
      [this.props.pagetype+"countingDone"]:false,//是否显示倒计时
      [this.props.pagetype+"counttext"]:'获取验证码',//
    })
    // let _self = this;
    // var timesval = localStorage[this.props.pagetype+"countdown"];
    // if(parseInt(timesval)>0){
    //     _self.countdown();
    // }
  }
  componentWillUnmount (){
    clearTimeout(this.myVar);
  }
  render(){
    let classNameType = this.props.classNameType;
    // let isdisable= this.props.pagetype+"countingDone";
    // let btntext = this.props.pagetype+"counttext";
    // console.log(this.state[this.props.pagetype+"counttext"]);
    return(
      <button type="button" className={`${styleLogin[`${classNameType}`]} ${!this.state[this.props.pagetype+"countingDone"]?"":styleLogin[`${this.props.btnStyleType!="no-bg-style" ? "btn-verify-link" : "btn-verify-forgetpwd-link"}`]}`} onClick={this.sendVerify} disabled={this.state[this.props.pagetype+"countingDone"]}>{this.state[this.props.pagetype+"counttext"]}</button>
    );
  }
}