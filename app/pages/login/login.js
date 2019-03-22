/* 登录
 * @Author: hehs
 * @Date: 2018-05-07 16:01:47
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-25 14:46:45
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { InputItem, WingBlank, Flex, Button, Toast, Modal } from 'antd-mobile';

import { SendcodeBtn } from 'components'
import { fetchLogin } from './../../actions/common'
import styles from 'style/login/login.less'

const alert = Modal.alert;

@connect((state, props) => ({
	config: state.config,
	ReturnLoginInfo: state.loginResponse,
}), null, null, { withRef: true })

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.verifyRef = React.createRef()

		this.state = {
			phone: "",
			verify: "",
			pwd: "",
			changeLoginType: true,//切换登录方式
			LoginTypeTxt: "密码登录",
			btnActive: "",//按钮样式
			hasPhoneError: false,//手机号码错误
			hasSubState: false,//按钮操作状态
		}
	}

	componentWillMount() {
		// localStorage.removeItem('RetUserInfo');
		// localStorage.removeItem('GID');
		// localStorage.removeItem('ThirdAuthInfo');
		// localStorage.removeItem('isAuthsuccess');
		// localStorage.clear();
		// sessionStorage.clear();
	}

	// 组件加载完毕之后立即执行
	componentDidMount() {

		document.title = "登录";


		//登录异常的跳转值
		// if( this.props.location.query.isgoback && typeof this.props.location.query.isgoback != 'undefined'){
		// 	this.setState({
		// 		isgoback: this.props.location.query.isgoback
		// 	})
		// }
	}

	componentWillUnmount = () => {
		this.setState = (state, callback) => {
			return;
		};
	}

	// 错误弹窗
	showAlert = (msg) => {
		const alertInstance = alert('密码错误，是否找回密码？', msg, [
			{ text: '取消', onPress: () => { } },
			{ text: '忘记密码？', onPress: () => jump(this, '/forgetpwd') },
		]);
	};

	// 协议跳转
	jumpagree() {
		jump(this, '/userRead')
	}

	// 切换注册
	jumpRegister() {
		jump(this, "/register");
	}

	// 忘记密码
	forgetPwd() {
		jump(this, "/forgetpwd");
	}

	// 切换登录方式
	switchLogin = () => {
		if (!this.state.changeLoginType) {
			this.setState({
				changeLoginType: true,
				LoginTypeTxt: "密码登录"
			});
		} else {
			this.setState({
				changeLoginType: false,
				LoginTypeTxt: "验证码登录"
			});
		}
	}

	// 手机号码错误提示
	onPhoneErrorClick = () => {
		if (this.state.hasPhoneError) {
			Toast.info('请输入正确的手机号码', 2);
		}
	}

	// 手机号码
	onPhoneChange = (value) => {
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
			phone: value
		}, function () {
			this.updateBtnStyles();
		});
	}

	// 验证码
	onVerifyChange = (value) => {
		this.setState({
			verify: value
		}, function () {
			this.updateBtnStyles();
		});
	}

	// 密码
	onPwdChagen = (value) => {
		this.setState({
			pwd: value
		}, function () {
			this.updateBtnStyles();
		});
	}

	// 根据输入信息 ，处理按钮操作样式及操作效果
	updateBtnStyles = (clickflag) => {
		if (this.state.changeLoginType) {
			if (this.state.phone == "") {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入手机号码', 2);
				}
			}
			else if (!(/^1[123456789]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))) {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入正确的手机号码', 2);
				}
			}
			else if (this.state.verify == "" || this.state.verify.length != 6) {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入验证码', 2);
				}
			}
			else {
				this.setState({
					btnActive: "btn-reg-Active",
					hasSubState: true
				});
			}
		}
		else {
			if (this.state.phone == "") {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入手机号码', 2);
				}
			}
			else if (!(/^1[123456789]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))) {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入正确的手机号码', 2);
				}
			}
			else if (this.state.pwd == "" || this.state.pwd.length < 6 || this.state.pwd.length > 20) {
				this.setState({
					btnActive: "",
					hasSubState: false
				});
				if (clickflag) {
					Toast.info('请输入密码', 2);
				}
			}
			else {
				this.setState({
					btnActive: "btn-reg-Active",
					hasSubState: true
				});
			}
		}
	}

	// 登录
	subLogin = () => {
		Toast.loading('', 0, null, true)
		this.updateBtnStyles(1);
		if (this.state.hasSubState) {
			let parameters = {};
			if (this.state.changeLoginType) {
				//验证码登录
				parameters = {
					cPhone: this.state.phone.replace(/\s/g, ''),
					verifyCode: this.state.verify,
					loginType: 1
				}
			}	else {
				// 密码登录 清除本地存储用户信息
				// Toast.info('清除本地信息')
				localStorage.removeItem('RetUserInfo');
				localStorage.removeItem('GID');
				// localStorage.clear();
				sessionStorage.clear();
				parameters = {
					cPhone: this.state.phone.replace(/\s/g, ''),
					cPassWord: this.state.pwd,
					loginType: 2
				}
			}
			console.dir(parameters);
			// return;
			this.props.dispatch(fetchLogin(parameters, (respose) => {
				Toast.hide();
				console.dir(respose);
				// console.log(respose.headers.gid);
				if (!this.state.changeLoginType) {
					//密码登录存储会话
					localStorage.setItem('GID', respose.headers.gid);//存储会话id
				}
				// console.dir(respose.data);
				let data = respose.data.data
				let RetUserInfo = {};
				// RetUserInfo.cacode = data.cAcode;//上级，code
				RetUserInfo.cisagent = data.cIsagent;//判断是否是经销商，0不是,1销售经理,2经销商
				RetUserInfo.cisfixed1 = data.cisfixed1;//判断是否为实体商家1,0
				RetUserInfo.cnickname = data.cNickname;
				RetUserInfo.cshop = data.cShop;//判断是否为商家1,0
				RetUserInfo.cucode = data.cUcode;//用户ucode
				RetUserInfo.realNameFlag = data.realNameFlag;//是否实名认证N否
				RetUserInfo.cheadimg = data.cHeadimg;//用户头像
				RetUserInfo.cphone = data.cPhone;
				// RetUserInfo.roles = data.roles;//角色
				RetUserInfo.incode = data.inCode;  // 邀请码 会员管理邀请注册需要用到
				RetUserInfo.payFlag = data.payFlag.code; // 1已设置支付密码，0未设置
				RetUserInfo.isUnionMember = data.isUnionMember.code; // 是否是联盟会员
				RetUserInfo.unionMemberTerm = data.unionMemberTerm; // 会员过期时间
				// 1	person	个人
				// 2	online_merchant	线上商家
				// 3	online_merchant	线下商家
				// 4	agent	经销商
				// 5	region_agent	销售经理
				// 6	privilege	特权
				// console.log(data)
				// console.log(RetUserInfo)
				localStorage.setItem('RetUserInfo', JSON.stringify(RetUserInfo));

				if (this.props.location.query.isgoback) {
					// this.props.dispatch(goBack());
					// console.log('referer', document.referrer)
					window.location.href = document.referrer
				} else {
					jump(this, "/index");
				}
			}, (err) => {
				Toast.hide();
				// console.log(err.headers.gid);
				if (!this.state.changeLoginType) {
					//密码登录存储会话
					localStorage.setItem('GID', err.headers.gid);//存储会话id
				}

				if (err.data.code == 'MC0008') {
					this.showAlert(err.data.msg)
				}
				else {
					Toast.info(err.data.msg, 2);
				}

			}));
		}
	}

	// 验证码输入框keyUp
	verifyKeyUp = (e) => {

		// 回车直接登录
		if (e.keyCode == 13) {
			this.subLogin()
		}
	}




	render() {
		return (
			<div className={`${styles['wrap-page']} login-page`}>
				<Flex className={`${styles['reg-header']}`}>
					<div className={`${styles['header-lt']} ${styles['float']}`} onClick={this.jumpRegister.bind(this)}>注册</div>
					<div className={`${styles['header-ct']} ${styles['float']}`}>登录</div>
					{/* <div className={`${styles['header-rt']} ${styles['float']}`} onClick={this.jumpRegister.bind(this)}>×</div> */}
				</Flex>
				<Flex className={`${styles['flex-reg-logo']}`} justify="center">
					<WingBlank>
						<div className={`${styles['register-logo']}`}>
							<img src="../../images/common/icon_me120px@2x.png" />
						</div>
					</WingBlank>
				</Flex>

				<div className={`${styles['login-verify-main']}`}>
					{/*验证码登录*/}
					<Flex className={`${styles['flex-reg-inpt']}`} justify="center">
						<Flex.Item>
							<div className={`${styles['list-space']}`}>
								<InputItem type="number" maxLength="11" clear placeholder="请输入手机号码" onChange={this.onPhoneChange} className={`${styles['inpt_txt']}`} value={this.state.phone}></InputItem>
							</div>
							{
								this.state.changeLoginType ?
									<div>
										<div className={`${styles['list-space']}`}>
											<InputItem type="number"
												ref={this.verifyRef}
												maxLength="6"
												placeholder="请输入验证码"
												onChange={this.onVerifyChange}
												className={`${styles['inpt_txt']}`}
												value={this.state.verify}
												onKeyUp={this.verifyKeyUp}
											/>
											<SendcodeBtn
												btnClassName={styles['btn-verify-active']}
												disabledClassName={styles["btn-verify-disabled"]}
												parentProps={{ ...this.props }}
												type="3"
												phone={this.state.phone}
												text="获取验证码"
												disabledText="s"
												verifyRef={this.verifyRef}
											/>

										</div>
										<div className={`${styles['list-space']}`}>
											<div className={`${styles['jump-forget-pwd']}`}><br /></div>
										</div>
									</div>
									:
									<div>
										<div className={`${styles['list-space']}`}>
											<InputItem type="password" maxLength="20" minLength="6" placeholder="请输入密码" onChange={this.onPwdChagen} className={`${styles['inpt_txt']}`} value={this.state.pwd}></InputItem>
										</div>
										<div className={`${styles['list-space']}`}>
											<div className={`${styles['jump-forget-pwd']}`} onClick={this.forgetPwd.bind(this)}>忘记密码？</div>
										</div>
									</div>
							}
						</Flex.Item>
					</Flex>
					<Flex className={`${styles['flex-reg-agree']}`} justify="center">

						<div className={`${styles['reg-agreement']}`} onClick={this.jumpagree.bind(this)}>登录即代表你同意<span>《微领地服务协议》</span></div>

					</Flex>
					<Flex className={`${styles['flex-btn-reg']}`} justify="center">
						<Button activeStyle={{ background: '#FFE400' }} onClick={this.subLogin} className={`${styles['btn-register']} ${styles[this.state.btnActive]}`} >登录</Button>
					</Flex>

					<div className={`${styles['flex-login-type']}`}>
						<span onClick={this.switchLogin}>{this.state.LoginTypeTxt}</span>

					</div>
				</div>

				{/* <div className="login-pwd-main">
					<Flex className="flex-reg-inpt" justify="center">
					<Flex.Item>
						<div className="list-space">
						<InputItem type="phone" placeholder="请输入手机号码" className="inpt_txt"></InputItem>
						</div>
						<div className="list-space">
						<InputItem type="password" maxLength="24" minLength="6" placeholder="请输入密码" className="inpt_txt"></InputItem>
						</div>
						<div className="list-space">
						<div className="forget-pwd" onClick={this.forgetPwd.bind(this)}>忘记密码？</div>
						</div>
					</Flex.Item>
					</Flex>
					<Flex className="flex-reg-agree" justify="center">

					<div className="reg-agreement" onClick={this.jumpagree.bind(this)}>登录即代表你同意《微领地服务协议》</div>

					</Flex>
					<Flex className="flex-btn-reg" justify="center">
					<Button activeStyle={{background:'#FFE400'}} className="btn-register">登录</Button>
					</Flex>

					<div className="flex-login-type">
					密码登录
					</div>
				</div>                 */}

			</div>
		);
	}
}