/* 忘记密码 验证页面
 * @Author: hehs
 * @Date: 2018-05-07 16:28:28
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-10-08 11:16:14
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'//跳转页面 dispatch push
import { goBack } from 'react-router-redux'//返回上一页
import {
	InputItem,
	Flex,
	Button,
	Toast
} from 'antd-mobile';

import {
	CommonHeader,
	SendcodeBtn
} from 'components'

import { browserHistory } from 'react-router'

import { chkVerifyCode } from './../../actions/common'

import styles from 'style/login/login.less';
import { jump } from '../../utils/common';

@connect((state, props) => ({
  config: state.config
}), null, null, { withRef: true })

class Forgetpwd extends Component{

  constructor(props){
    super(props);

    this.verifyRef = React.createRef()

    this.state = {
      hasPhoneError: false,  //手机号码错误
      phone: '',  //手机号码值
      verify: '',  //验证码
      btnActive:"",  //按钮显示样式
      hasSubState:false,  //按钮操作状态
    }
	}

	// 组件加载完毕之后立即执行
  componentDidMount (){
    let _self = this;
    document.title = "重置登录密码";
	}

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
	}

  goBack=()=>{
    this.props.dispatch(goBack())
	}

	// 下一步确认修改密码
  nextStation=()=>{
    let _self = this;
    this.updateBtnStyles();
    if(this.state.hasSubState){
      _self.props.dispatch(chkVerifyCode({
				phone:_self.state.phone.replace(/\s/g, ''),
				type:2,verifyCode:_self.state.verify
			},(respose)=>{
        localStorage.setItem('GID',respose.headers.gid);  //存储会话id
        jump(this,'/surepwd');
      },(err)=>{
        // console.dir(err);
        // console.log(err.headers.gid);
        localStorage.setItem('GID',err.headers.gid);//存储会话id
      }));

    }
  }
  onPhoneErrorClick = () => {
    if (this.state.hasPhoneError) {
      Toast.info('请输入正确的手机号码',2);
    }
  }
  onPhoneChange = (value) => {
    //手机号码
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasPhoneError: true
      });
    } else {
      this.setState({
        hasPhoneError: false
      });
    }
    this.setState({
      phone:value
    },function(){
      this.updateBtnStyles();
    });

  }
  onVerifyChange =(value) =>{
    //验证码
    this.setState({
      verify:value
    },function(){
      this.updateBtnStyles();
    });
  }
  //如果输入框验证通过改变按钮样式
  updateBtnStyles = () => {
    if(this.state.phone=="" || this.state.verify=="" || this.state.verify.length!=6){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
    }  else if(!(/^1[3456789]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
    }else{
      this.setState({
        btnActive:"btn-reg-Active",
        hasSubState:true
      });
    }

  }

  // //发送短信
  // sendVerify =()=>{
  //     if(this.state.phone==""){
  //         Toast.info('请输入手机号码',2);
  //         this.setState({
  //             btnActive:"",
  //             hasSubState:false
  //         });
  //     }  else if(!(/^1[3456789]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))){
  //         Toast.info('请输入正确的手机号码',2);
  //         this.setState({
  //             btnActive:"",
  //             hasSubState:false
  //         });
  //     }else{
  //         let _self = this;
  //         //获取验证码：type:1注册，2忘记密码，3登录
  //         this.props.dispatch(sendMsgCode({phone:_self.state.phone.replace(/\s/g, ''),type:2},(respose)=>{
  //             console.log(respose);
  //             console.log(respose.headers.gid);
  //             localStorage.setItem('GID',respose.headers.gid);//存储会话id
  //             Toast.info('短信发送成功',2);
  //             _self.setState({
  //                 countingDone:false,
  //             });
  //             //获取验证码 倒计时
  //             localStorage.setItem('countdown',20);
  //             _self.countdown();

  //         }, (err)=>{
  //             console.log(err);
  //             // console.log(err.headers.gid);
  //             localStorage.setItem('GID',err.headers.gid);//存储会话id
  //             Toast.info(err.data.msg,2);
  //         }));
  //     }
  // }
  // //倒计时
  // countdown =()=>{
  //     let _self = this;
  //     var timesval = localStorage.countdown;
  //     let myVar;
  //     if (timesval == 0 || isNaN(timesval)) {
  //         clearTimeout(myVar);
  //         localStorage.removeItem("countdown");
  //         _self.setState({
  //             countingDone:false,
  //             counttext:"获取验证码"
  //         })
  //         return;
  //     }else{
  //         _self.setState({
  //             countingDone:true,
  //             counttext:timesval+"s"
  //         })
  //         timesval--;
  //         localStorage.setItem("countdown",timesval);
  //     }
  //     myVar = setTimeout(function() {_self.countdown()},1000);
  // }



  render(){

    return(
      <div className={`${styles['wrap-page']} forgetpwd-page`}>

				<CommonHeader
					pageTitle="重置登录密码"
				/>
        <div className={`${styles['pwd-top']}`}>
          <div className={`${styles['pwd-logo']}`}>
            <img src="images/login/Login_icon_phone.png"/>
            <div className={`${styles['pwd-sel-icon']}`}>
              <img src="images/login/Login_icon_choose.png"/>
            </div>
          </div>
        </div>
        <div className={`${styles['pwd-telephone']}`}>手机验证</div>
        {/* <div className="pwd-verify">
          <Button className="verify_btn_pwd">获取验证码</Button>
        </div>
        <div className="pwd-inpt">
          <input type="phone" maxLength="11" value="" placeholder="请输入手机号码"/>
        </div>
        <div className="pwd-inpt">
          <input type="phone" maxLength="6" value="" placeholder="请输入短信验证码"/>
        </div> */}

        <div className={`${styles['forgetpwd-list']}`}>
          <InputItem type="number" maxLength="11" clear placeholder="请输入手机号码" className={`${styles['inpt_txt']} ${styles['forgetpwd_txt']}`} value={this.state.phone} onChange={this.onPhoneChange}></InputItem>
        </div>

        <div className={`${styles['forgetpwd-list']}`}>
					<InputItem
						style={{border:"none"}}
						type="number"
						maxLength="6"
						placeholder="请输入验证码"
						className={`${styles['inpt_txt']} ${styles['forgetpwd_txt']}`}
						value={this.state.verify}
            onChange={this.onVerifyChange}
            ref={this.verifyRef}
					/>
          <SendcodeBtn
            btnClassName={styles['forget-btn-active']}
            disabledClassName={styles["forget-btn-disabled"]}
            parentProps={{...this.props}}
            type="2"
            phone={this.state.phone}
            text="获取验证码"
            disabledText="秒后重发"
            verifyRef={this.verifyRef}
          />

        </div>

        <div className={`${styles['pwd-desc']}`}>
        如果原手机号码已停止使用或者遗失导致无法收到验证码，请拨打人工客服<span>400-8309-092</span>，由客服协助您进行修改
        </div>
        <Flex className={`${styles['flex-btn-reg']}`} justify="center">
          <Button activeStyle={{background:'#FFE400'}} className={`${styles['btn-register']} ${styles[this.state.btnActive]}`} onClick={this.nextStation}>下一步</Button>
        </Flex>
      </div>
    );
  }
}

export default Forgetpwd;