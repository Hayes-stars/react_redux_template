/* 重置登录密码 提交页面
 * @Author: hehs
 * @Date: 2018-05-07 14:23:50
 * @Last Modified by: hehs
 * @Last Modified time: 2018-10-26 14:47:41
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { InputItem, Flex, Button, Toast } from 'antd-mobile';
import { goBack } from 'react-router-redux'

import { CommonHeader } from './../../components/CommonHeader/index'
import { resetPwd } from './../../actions/common'

import styleLogin from 'style/login/login.less';

@connect((state, props) => ({
  config: state.config
  }), null, null, { withRef: true })
class Surepwd extends Component{
  constructor(props){
    super(props);
    this.state = {
      pwd:"",
      surepwd:"",
      btnActive:"",//按钮显示样式
      hasSubState:false,//按钮操作状态
    }
  }
  goBack=()=>{
    this.props.dispatch(goBack())
  }

  onPwdChagen =(value)=>{
    //密码
    this.setState({
      pwd:value
    },function(){
      this.updateBtnStyles();
    });
  }
  onSurePwdChagen =(value)=>{
    //确认密码
    this.setState({
      surepwd:value
    },function(){
      this.updateBtnStyles();
    });
  }
  //如果输入框验证通过改变按钮样式
  updateBtnStyles = (clickflag) => {
    console.log(this.state.btnActive);
    if(this.state.pwd=="" || this.state.pwd.length<6 || this.state.pwd.length>20){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
      if(clickflag){
        Toast.info('请输入新密码（6-20位）',2);
      }
    } else if(this.state.surepwd=="" || this.state.surepwd.length<6 || this.state.surepwd.length>20){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
      if(clickflag){
        Toast.info('再次输入新密码',2);
      }
    } else if(this.state.pwd!=this.state.surepwd){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
      if(clickflag){
        Toast.info('密码输入不一致',2);
      }
    } else{
      this.setState({
        btnActive:"btn-reg-Active",
        hasSubState:true
      });
      console.log(this.state.btnActive);
    }

  }
  updatePwd=()=>{
    //确认修改密码
    let _self = this;
    this.updateBtnStyles(1);
    if(this.state.hasSubState){      
      Toast.loading('', 0, null, true);
      let parameters = {
				confirmPassWord:_self.state.surepwd,
				cPassWord:_self.state.pwd
			}
      _self.props.dispatch(resetPwd(parameters,(respose)=>{
        Toast.hide();
        // console.log(respose);
        Toast.info("密码修改成功",1.2);
        setTimeout(function(){
          _self.props.dispatch(push("/login"));
        },1200)
      }, (err)=>{
        Toast.hide();
        console.log(err);
        Toast.info(err.data.msg,2);
      }));
    }
  }
  render(){
    return(
      <div className={`${styleLogin['wrap-page']} surepwd-page`}>
        <CommonHeader pageTitle="重置登录密码" shopCart={false} moreActions={false} goBack={this.goBack}/>
        <div className={`${styleLogin['pwd-top']}`}>
          <div className={`${styleLogin['pwd-logo']}`}>
            <img src="images/login/Login_icon_password.png"/>
            <div className={`${styleLogin['pwd-sel-icon']}`}>
              <img src="images/login/Login_icon_choose.png"/>
            </div>
          </div>
        </div>
        <div className={`${styleLogin['pwd-telephone']}`}>重置登录密码</div>
        <Flex className={`${styleLogin['flex-reg-inpt']}`} justify="center">
          <Flex.Item>
            <div className={`${styleLogin['list-space']}`}>
              <InputItem type="password" maxLength="20" minLength="6" placeholder="请输入新密码（6-20位）" value={this.state.pwd} onChange={this.onPwdChagen} className={`${styleLogin['inpt_txt']} ${styleLogin['surepwd_txt']}`}><label className={`${styleLogin['inpt-tit']}`}>新密码</label></InputItem>
            </div>

            <div className={`${styleLogin['list-space']}`}>
              <InputItem type="password" maxLength="20" minLength="6" placeholder="再次输入新密码" value={this.state.surepwd} onChange={this.onSurePwdChagen} className={`${styleLogin['inpt_txt']} ${styleLogin['surepwd_txt']}`}><label className={`${styleLogin['inpt-tit']}`}>确认密码</label></InputItem>
            </div>
          </Flex.Item>
        </Flex>
        <Flex className={`${styleLogin['flex-btn-reg']} ${styleLogin['surepwd-btn']}`} justify="center">
          <Button activeStyle={{background:'#FFE400'}} className={`${styleLogin['btn-register']} ${styleLogin[this.state.btnActive]}`} onClick={this.updatePwd}>确认</Button>
        </Flex>
      </div>
    );
  }
}

export default Surepwd;