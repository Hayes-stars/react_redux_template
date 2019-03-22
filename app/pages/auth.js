import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { Toast } from 'antd-mobile';
import { encryptByDES, decryptByDES, LoginRegist, returnset, getOS } from 'utils/public.js'
import { getUserDatum } from 'actions/common'

import 'style/auth.less'
import { jump } from '../utils/common';
@connect((state, props) => ({
    config: state.config
}))
class Auth extends Component {
    constructor(props, context) {

			// Toast.loading('',0)

        super(props)
				let isAuth = false
				var dynamicparam = this.props.location.query.dynamicparam;

        const _key = 'MaigTil28hVETWTssFHGtYDxzeKc2PkT'
				const _password = '123456'

				if( typeof dynamicparam === 'undefined' || dynamicparam === '' || dynamicparam === null){
					LoginRegist(this);
					isAuth = false
				} else {

					console.log('dynamicparam', dynamicparam)
					//加密
					console.log('加密', encryptByDES(_password,_key))
					//解密
					console.log('解密', decryptByDES(dynamicparam.toString().replace(/[ ]/g,"+"),_key))

					console.log('解密-JSON', JSON.parse(decryptByDES(dynamicparam.toString().replace(/[ ]/g,"+"),_key)));

					var resultParams = JSON.parse(decryptByDES(dynamicparam.toString().replace(/[ ]/g,"+"),_key));
					console.log('页面传参',resultParams.param)

					var token = resultParams.openid;//GID
					var apptype = resultParams.apptype;//客户端标识
					var osVersion = resultParams.osVersion;//设备系统版本标识
					var version = resultParams.version;// 设备系统版本标识
					var jumpurl = resultParams.jumpurl.toString();//跳转地址
					var islogionstate = resultParams.isloginstate;//区分是否需要登录的路由 1需要登录  0不需要登录
					var switchroles = resultParams.switchroles;//switchroles==1商家 switchroles==0个人
					var channelId = resultParams.channelId;// 0所有平台 1小蜜app 2经销商app 3硬件平台 4蜜购 5蜜餐 6蜜零
					var param = JSON.parse(resultParams.param);//页面按需传参

					localStorage.backjumpUrl = jumpurl
					localStorage.backjumpUrlParams = resultParams.param
					
					//存储客户端标识apptype  1安卓  2 ios 8 特卖小程序 9蜜铺小程序
					localStorage.setItem("apptype",apptype);

					//存储客户端设备系统版本标识
					localStorage.setItem("osVersion",osVersion);

					// 客户端应用版本标识
					localStorage.setItem("version",version);

					//交互原生商家切换个人标识
					localStorage.setItem('switchroles',switchroles);

					//客户端平台标识
					localStorage.setItem('channelId', channelId)

					if( islogionstate==1 ){
						//需授权的路由跳转
						if (typeof token == "undefined" || token == "" || token == null) {
							LoginRegist(this);
							isAuth = false
						} else {
							if(param.c_acode == 'wldf42e8ee7ef752309'){
								jump(this,'/'+jumpurl,param);
							} else {
								localStorage.setItem('GID',token);
								isAuth = true
								//获取用户信息
								this.props.dispatch(getUserDatum({},(res)=>{
									let data = res.data.data
									let RetUserInfo = {};
									RetUserInfo.cisagent = data.cIsagent;//判断是否是经销商，0不是,1销售经理,2经销商
									RetUserInfo.cisfixed1 = data.cisfixed1;//判断是否为实体商家1,0
									RetUserInfo.cnickname = data.cNickname;
									RetUserInfo.cshop = data.cShop;//判断是否为商家1,0
									RetUserInfo.cucode = data.cUcode;//用户ucode
									RetUserInfo.realNameFlag = data.realNameFlag;//是否实名认证N否
									RetUserInfo.cheadimg = data.cHeadimg;//用户头像
									RetUserInfo.cphone = data.cPhone;
									RetUserInfo.incode = data.inCode  // 邀请码 会员管理邀请注册需要用到
									RetUserInfo.payFlag = data.payFlag.code; // 1已设置支付密码，0未设置
									RetUserInfo.isUnionMember = data.isUnionMember.code; // 1是联盟会员，0否联盟会员
									RetUserInfo.unionMemberTerm = data.unionMemberTerm; // 会员过期时间
									// RetUserInfo.roles = data.roles;//角色
									// 1	person	个人
									// 2	online_merchant	线上商家
									// 3	online_merchant	线下商家
									// 4	agent	经销商
									// 5	region_agent	销售经理
									// 6	privilege	特权
									// console.log(data)
									// console.log(RetUserInfo)
									localStorage.setItem('RetUserInfo',JSON.stringify(RetUserInfo));
									if( param ){
										jump(this,'/'+jumpurl,param);
									} else {
										jump(this,'/'+jumpurl);
									}
								},(err)=>{
									Toast.fail(err.data.msg,1.2)
									setTimeout(() => {
										if (getOS() === 8) {

										} else {
											returnset(this);
										}
									}, 1500);
								}));
							}
						}

					} else {
						//无需登录的路由跳转

						if (typeof token == "undefined" || token == "" || token == null) {
							if( param ){
								jump(this,'/'+jumpurl,param);
							} else {
								//没有参数
								jump(this,'/'+jumpurl);
							}
						} else {
							localStorage.setItem('GID',token);
							isAuth = true
							//获取用户信息
							this.props.dispatch(getUserDatum({},(res)=>{
								let data = res.data.data
								let RetUserInfo = {};
								RetUserInfo.cisagent = data.cIsagent;//判断是否是经销商，0不是,1销售经理,2经销商
								RetUserInfo.cisfixed1 = data.cisfixed1;//判断是否为实体商家1,0
								RetUserInfo.cnickname = data.cNickname;
								RetUserInfo.cshop = data.cShop;//判断是否为商家1,0
								RetUserInfo.cucode = data.cUcode;//用户ucode
								RetUserInfo.realNameFlag = data.realNameFlag;//是否实名认证N否
								RetUserInfo.cheadimg = data.cHeadimg;//用户头像
								RetUserInfo.cphone = data.cPhone;
								RetUserInfo.incode = data.inCode  // 邀请码 会员管理邀请注册需要用到
								RetUserInfo.payFlag = data.payFlag.code; // 1已设置支付密码，0未设置
								RetUserInfo.isUnionMember = data.isUnionMember.code; // 1是联盟会员，0否联盟会员
								RetUserInfo.unionMemberTerm = data.unionMemberTerm; // 会员过期时间
								// RetUserInfo.roles = data.roles;//角色
								// 1	person	个人
								// 2	online_merchant	线上商家
								// 3	online_merchant	线下商家
								// 4	agent	经销商
								// 5	region_agent	销售经理
								// 6	privilege	特权
								localStorage.setItem('RetUserInfo',JSON.stringify(RetUserInfo));
								if( param ){
									jump(this,'/'+jumpurl,param);
								} else {
									//没有参数
									jump(this,'/'+jumpurl);
								}
							},(err)=>{
								Toast.fail(err.data.msg,1.2)
								setTimeout(() => {
									if (getOS() === 8) {
										// wx.miniProgram.navigateBack()
      									// wx.miniProgram.postMessage({data: {jumpUrl:jumpurl, jumpUrlParams: param}})
									} else {
										returnset(this);
									}
								}, 1500);
							}));

						}
					}
				}

        this.state = {
            isAuth
        }
		}
		//组件将要挂载 组件刚经历constructor,初始完数据  组件还未进入render，组件还未渲染完成，dom还未渲染
		componentWillMount(){
			if(sessionStorage.getItem('isClosedWebview')){
				//执行APP关闭webview的方法
				if (getOS() !== 8) returnset(this);
				// if(localStorage.getItem('apptype')==1) {
				// 	javaScript: resultData.webFinish();
				// } else if(localStorage.getItem('apptype')==2) {
				// 	window.webkit.messageHandlers.AppModel.postMessage({
				// 		"popSet": ""
				// 	});
				// }
			}
		}

		//组件渲染完成
    componentDidMount(){
				sessionStorage.setItem('isClosedWebview',true);
		}

		// 组件卸载时隐藏toast
		componentWillUnmount(){
			// Toast.hide()
		}

    render() {
        return (
					<div className="tipmsg" >
						{
							this.state.isAuth ? `` : ``
						}
					</div>
        )
    }

}

export default Auth