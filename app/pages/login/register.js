/* 注册
 * @Author: hehs
 * @Date: 2018-05-07 15:32:12
 * @Last Modified by: hehs
 * @Last Modified time: 2018-10-26 14:47:14
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { fetchRegister,sendMsgCode } from './../../actions/common'
import { Carousel, Tag, List, InputItem, Modal, WingBlank, Flex, Button, ActionSheet, WhiteSpace, Toast } from 'antd-mobile';
// import { createForm } from 'rc-form';

import { SendcodeBtn } from 'components'

import styles from 'style/login/login.less';

@connect((state, props) => ({
  config: state.config
  }), null, null, { withRef: true })
class Register extends Component {
  constructor(props){
		super(props);

		this.verifyRef = React.createRef()

		this.state = {
			hasPhoneError: false,//手机号码错误
			phone: '',//手机号码值
			verify: '',//验证码
			pwd:'',//密码
			btnActive:"",//按钮显示样式
			hasSubState:false,//按钮操作状态
			// countingDone:false,//是否显示倒计时
			// counttext:'获取验证码',//
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
  onPwdChange =(value) =>{
    this.setState({
      pwd:value
    },function(){
      this.updateBtnStyles();
    });
  }
  jumpagree(){
    //协议跳转
    // console.dir(this.props.config)
    // window.location.href = this.props.config.GetHost+"Login/Index/read";

    jump(this,'/userRead')
  }

  jumpLogin(){
    //切换登录
    jump(this,"/login")
  }

  //如果输入框验证通过改变按钮样式
  updateBtnStyles = (clickflag) => {
    if(this.state.phone=="" || this.state.verify=="" || this.state.verify.length!=6 || this.state.pwd=="" || this.state.pwd.length<6 || this.state.pwd.length>20){

      this.setState({
        btnActive:"",
        hasSubState:false
      });
      if(clickflag){
        Toast.info('请输入用户信息',2);
      }
    }  else if(!(/^1[3456789]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))){
      this.setState({
        btnActive:"",
        hasSubState:false
      });
      if(clickflag){
        Toast.info('请输入正确的手机号码',2);
      }
    }else{
      this.setState({
        btnActive:"btn-reg-Active",
        hasSubState:true
      });
    }

  }
  subRegister = () =>{
    let _self = this;
    //提交注册
    this.updateBtnStyles(1);
    if(this.state.hasSubState){
    Toast.loading('', 0, null, true);
    this.props.dispatch(fetchRegister({
      verifyCode:this.state.verify,
      cPhone:this.state.phone.replace(/\s/g, ''),
      cPassWord:this.state.pwd
    }, res => {
      Toast.hide();
      Toast.success('注册成功！',1.2,null,true)
      setTimeout(function(){
        _self.props.dispatch(push("/login"));
      },1200);
    }, (err)=>{
      Toast.hide();
      Toast.info(err.data.msg,1.2,null,false);
    }));
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
  //         this.props.dispatch(sendMsgCode({phone:this.state.phone.replace(/\s/g, ''),type:1},(respose)=>{
  //             console.log(respose);
  //             console.log(respose.headers.gid);
  //             localStorage.setItem('GID',respose.headers.gid);//存储会话id
  //             Toast.info('短信发送成功',2);
  //             this.setState({
  //                 countingDone:false,
  //             });
  //             //获取验证码倒计时
  //             localStorage.setItem('countdown',120);
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

  //组件加载完毕之后立即执行
  componentDidMount (){
    document.title = "注册";
  }
  componentWillUnmount = () => {
  this.setState = (state,callback)=>{
    return;
  };
  }
  render() {
  return (
    <div className={`${styles['wrap-page']} register-page`}>
    <form>
      <Flex className={`${styles['reg-header']}`}>
      <div className={`${styles['header-lt']} ${styles['float']}`} onClick={this.jumpLogin.bind(this)}>登录</div>
      <div className={`${styles['header-ct']} ${styles['float']}`}>注册</div>
      {/* <div className={`${styles['header-rt']} ${styles['float']}`} onClick={this.jumpLogin.bind(this)}>×</div> */}
      </Flex>
      <Flex className={`${styles['flex-reg-logo']}`} justify="center">
      <WingBlank>
        <div className={`${styles['register-logo']}`}>
        <img src="images/common/icon_me120px@2x.png"/>
        </div>
      </WingBlank>
      </Flex>
      <div className={`${styles['register-main']}`}>
      {/*注册*/}
      <Flex className={`${styles['flex-reg-inpt']}`} justify="center">
        <Flex.Item>
        <div className={`${styles['list-space']}`}>
          <InputItem type="number" maxLength="11" clear placeholder="请输入手机号码" className={`${styles['inpt_txt']}`} value={this.state.phone} onChange={this.onPhoneChange}></InputItem>
        </div>
        <div className={`${styles['list-space']}`}>
          <InputItem type="num"
						maxLength="6"
						placeholder="请输入验证码"
						className={`${styles['inpt_txt']}`}
						value={this.state.verify}
						onChange={this.onVerifyChange}
            ref={this.verifyRef}
          />
          {/* <SendcodeBtn classNameType="btn-verify" type="1" phone={this.state.phone} pagetype='register' /> */}

          <SendcodeBtn
						btnClassName={styles['btn-verify-active']}
            disabledClassName={styles["btn-verify-disabled"]}
						parentProps={{...this.props}}
						type="1"
						phone={this.state.phone}
						text="获取验证码"
						disabledText="s"
						verifyRef={this.verifyRef}
          />

          {/* <button className={`${styles['btn-verify']}`} onClick={this.sendVerify} disabled={this.state.countingDone}>{this.state.counttext}</button>*/}
        </div>
        <div className={`${styles['list-space']}`}>
          <InputItem type="password" maxLength="20" minLength="6" placeholder="请设置6-20位新登录密码" className={`${styles['inpt_txt']}`} value={this.state.pwd} onChange={this.onPwdChange} ></InputItem>
        </div>
        </Flex.Item>
      </Flex>
      <Flex className={`${styles['flex-reg-agree']}`} justify="center">

        <div className={`${styles['reg-agreement']}`} onClick={this.jumpagree.bind(this)}>注册即代表你同意<span>《微领地服务协议》</span></div>

      </Flex>

      <Flex className={`${styles['flex-btn-reg']}`} justify="center">
        <Button activeStyle={{background:'#FFE400'}} className={`${styles['btn-register']} ${styles[this.state.btnActive]}`} onClick={this.subRegister}>注册</Button>
      </Flex>

      {/* <EllipseButton
        handleClick={this.subRegister.bind(this)}
      /> */}
      </div>
    </form>
    </div>

  )
  }
}
export default Register;