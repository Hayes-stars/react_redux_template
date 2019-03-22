/**
 * @version 4.0.0 微信分享 分享朋友圈，分享好友，分享到QQ，分享到QQ空间
 * @author hehs
 * @Date: 2018-06-03
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-26 16:50:41
 */
import { Toast } from 'antd-mobile';
import { GetSharesConfigInfo } from './../actions/common'

// var wx = require('./jweixin');
// var wx = require('weixin-js-sdk');
// import wx from 'weixin-js-sdk'


// console.log('wx', wx)
/**
 * 唤起微信分享
 * @param {object} options 分享显示标题，分享显示描述，分享显示地址，分享显示图片
 * @param {object} _self 当前页面
 * @param {string} _href 当前分享页面地址
 * @param {Boolean} isHideWXMenu 是否隐藏微信菜单 有值隐藏  没有值不隐藏
 */
export const evokeShareJs = (options, _self, _href, isHideWXMenu) => {
	_self.props.dispatch(GetSharesConfigInfo({
		"url": _href,
	}, (res) => {
		console.log('分享配置信息res', res);
		if (res.data.data) {
			if (isHideWXMenu) {
				hideOptionMenu(res.data.data)
			} else {
				shareJs(res.data.data, options);
			}
		}
	}, (err) => {
		Toast.info(err.data.msg, 2)
		console.log('分享配置信息err', err);
	}))
}

/**
 * 
 * @param {object} jssdk jsapi配置信息
 */
export const wxconfigInfo = (jssdk) => {	
	wx.config({
		// debug: true,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: jssdk.appId,
		timestamp: parseInt(jssdk.timestamp),
		nonceStr: jssdk.nonceStr,
		signature: jssdk.signature,
		jsApiList: [
			'onMenuShareAppMessage',
			'onMenuShareTimeline',
			// 'onMenuShareQQ',
			// 'onMenuShareQZone',
			'hideMenuItems',
			'hideOptionMenu'
		]
	});
}

/**
 * 微信分享朋友，朋友圈等
 * @param {object} jssdk 微信分享配置信息
 * @param {object} options 分享内容信息 
 */
export const shareJs = function (jssdk, options) {
	wxconfigInfo(jssdk)
	var defaults = {
		title: "分享的标题",
		desc: "分享的描述",
		link: window.location.href, //分享页面地址,不能为空
		imgUrl: './../images/common/login.png', //分享是封面图片，不能为空
		success: function () { }, //分享成功触发
		cancel: function () { } //分享取消触发，需要时可以调用
	}
	options = Object.assign({}, defaults, options);
	console.log(options);
	wx.ready(function () {
		// alert('进入微信分享')
		var thatopts = options;
		//分享到朋友圈
		wx.onMenuShareTimeline({
			debug: false,
			title: thatopts.title, // 分享标题
			desc: thatopts.desc, // 分享描述
			link: thatopts.link, // 分享链接
			imgUrl: thatopts.imgUrl, // 分享图标
			success: function () {
				thatopts.success()
			},
			cancel: function () {
			}
		});
		//分享给朋友
		// WeixinJSBridge.invoke('sendAppMessage', {
		// 	title: thatopts.title, // 分享标题
		// 	desc: thatopts.desc, // 分享描述
		// 	link: thatopts.link, // 分享链接
		// 	imgUrl: thatopts.imgUrl, // 分享图标

		// }, function(res) {        
		// 		console.log(res.err_msg);
		// })				

		wx.onMenuShareAppMessage({
			title: thatopts.title, // 分享标题
			desc: thatopts.desc, // 分享描述
			link: thatopts.link, // 分享链接
			imgUrl: thatopts.imgUrl, // 分享图标
			success: function () {
				thatopts.success()
			},
			cancel: function () {
			}
		});

		// 批量隐藏菜单
		wx.hideMenuItems({
			menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});

		//分享到QQ
		// wx.onMenuShareQQ({
		// 	title: thatopts.title, // 分享标题
		// 	desc: thatopts.desc, // 分享描述
		// 	link: thatopts.link, // 分享链接
		// 	imgUrl: thatopts.imgUrl, // 分享图标
		// 	success: function () {
		// 		thatopts.success()
		// 	},
		// 	cancel: function () {
		// 		// 用户取消分享后执行的回调函数
		// 	}
		// });
		//分享到QQ空间
		// wx.onMenuShareQZone({
		// 	title: thatopts.title, // 分享标题
		// 	desc: thatopts.desc, // 分享描述
		// 	link: thatopts.link, // 分享链接
		// 	imgUrl: thatopts.imgUrl, // 分享图标
		// 	success: function () {
		// 		thatopts.success()
		// 	},
		// 	cancel: function () {
		// 		// 用户取消分享后执行的回调函数
		// 	}
		// });

		// 

	});

	// wx.error(function(res){ 
	// 	// config信息验证失败会执行error函数，如签名过期导致验证失败，
	//  // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
	// 	//对于SPA可以在这里更新签名。 
	//  alert("好像出错了！！");
	//  console.log(res.err_msg);
	// }) 
}

/**
 * 隐藏微信面版菜单
 */
export const hideOptionMenu = (jssdk) => {
	wxconfigInfo(jssdk)
	wx.ready(function () {
		wx.hideOptionMenu();
	})
}

// export const shareFriend =(objdata)=> {
//     //分享给好友
//     var imgUrl = objdata.imgUrl;//图标
//     var lineLink = objdata.lineLink;//分享链接
//     var descContent = objdata.descContent;//描述
//     var shareTitle = objdata.shareTitle;//分享标题
//     var returnurl =  objdata.returnurl;//回调地址
//     if (!shareTitle) {
//         shareTitle = document.title;
//     }
//     if (!descContent) {
//         var meta = document.getElementsByTagName('meta');       
//         for (i in meta) {
//             if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
//                 descContent = meta[i].content;
//             }
//         }       
//     }

//     if(imgUrl.indexOf('.png')>=0 || imgUrl.indexOf('.jpg')>=0 || imgUrl.indexOf('.gif')>=0 || imgUrl.indexOf('.jpeg')>=0){
//     } else {
//         imgUrl = 'https://123.myshiyue.com/APP/Home/View/Public/img/logo.png';
//     }
//     if (!lineLink) {
//         lineLink = 'https://m.weilingdi.com';
//     }
//     WeixinJSBridge.invoke('sendAppMessage', {        
//          "title": shareTitle,
//          "link": lineLink,
//          "desc": descContent,
//         "img_url": imgUrl,

//     }, function(res) {        
//         // if (res.err_msg.indexOf("confirm") > 0) {
//         //     shareReturn(returnurl);
//         // } 
//         console.log(res.err_msg);
//     })
// }

// export const shareTimeline =(objdata)=> {
//     //分享到朋友圈
//     var imgUrl = objdata.imgUrl;//图标
//     var lineLink = objdata.lineLink;//分享链接
//     var descContent = objdata.descContent;//描述
//     var shareTitle = objdata.shareTitle;//分享标题
//     var returnurl =  objdata.returnurl;//回调地址

//     if (!shareTitle) {
//         shareTitle = document.title;
//     }
//     if (!descContent) {
//         var meta = document.getElementsByTagName('meta');       
//         for (i in meta) {
//             if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
//                 descContent = meta[i].content;
//             }
//         }       
//     }

//     if(imgUrl.indexOf('.png')>=0 || imgUrl.indexOf('.jpg')>=0 || imgUrl.indexOf('.gif')>=0 || imgUrl.indexOf('.jpeg')>=0){
//     } else {
//         imgUrl = 'https://wldappimg.iweilingdi.com/apppathimg/login/nlogo.png';
//     }
//     if (!lineLink) {
//         lineLink = 'https://m.weilingdi.com';
//     }
//     WeixinJSBridge.invoke('shareTimeline', {
//          "title": shareTitle,
//          "link": lineLink,
//          "desc": descContent,
//         "img_url": imgUrl,
//     }, function(res) {   
//         // if (res.err_msg.indexOf("ok") > 0) {
//         //     shareReturn(returnurl);
//         // }         
//     });
// }

// // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
// document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//     // 发送给好友
//     WeixinJSBridge.on('menu:share:appmessage', function(argv) {
//         alert('分享给好友')
//     });

//     // 分享到朋友圈
//     WeixinJSBridge.on('menu:share:timeline', function(argv) {
// 			alert('分享到朋友圈')
//     });

// }, false);


//分享回调方法
// function shareReturn(returnurl) {
//     if (returnurl) {
//        $.get(returnurl, function(obj) {
//         /*optional stuff to do after success */
//         }); 
//     }
// }

