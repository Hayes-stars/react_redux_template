/* 公用方法类-md5 app端交互方法
 */

import MD5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js'
import { Toast } from 'antd-mobile';
import * as config from './../config'
import { GetAuthorization } from './helper.js'


/**
 * 3DES加密
 */
//DES加密 Pkcs7填充方式
export const encryptByDES = (message, signature) => {
  const keyHex = CryptoJS.enc.Utf8.parse(signature);
  const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

//DES解密
export const decryptByDES = (ciphertext, signature) => {
  const keyHex = CryptoJS.enc.Utf8.parse(signature);
  // direct decrypt ciphertext
  const decrypted = CryptoJS.TripleDES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}


/**
 * toFixed兼容重写
 *
 */
export const TOFIXED = () => {
  Number.prototype.toFixed = function (s) {
    var that = this, changenum, index;
    // 负数
    if (this < 0) {
      that = -that;
    }
    changenum = (parseInt(that * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
    index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
      changenum = changenum + ".";
      for (var i = 0; i < s; i++) {
        changenum = changenum + "0";
      }
    } else {
      index = changenum.length - index;
      for (var i = 0; i < (s - index) + 1; i++) {
        changenum = changenum + "0";
      }
    }
    if (this < 0) {
      return -changenum;
    } else {
      return changenum;
    }
  }
}

/**
 * MD5密码加密
 * @param  {arg}
 * @return {[sign]}
 *
 */
export const getXLemonSign = (arg) => {
  const str = JSON.stringify(arg);
  // const sign = MD5(`${str}wld20181010`).toString();
  const sign = MD5(`${str}123456`).toString();
  return sign;
};

/**
 * MD5密码加密
 * @param  {arg}
 * @return {[sign]}
 *
 */
export const getXLemonParams = (arg) => {
  const str = JSON.stringify(arg);
  const sign = MD5(`${str}`).toString();
  return sign;
};

/**
 * 订单状态管理
 * @param  {arg}
 * @return {[sign]}
 *
 */
export const FilterOrdSts = (ordSts) => {
  const newOrdSts = {
    'INIT': '待付款',
    'WPAY': '待付款',
    'SUCC': '待发货',
    'DELI': '待收货',
    'RECE': '待评价',
    'FAIL': '失败',
    'REFU': '已退款',
    'WAIT': '待付款',
    'CLEA': '已取消',
    'FINI': '已完成'
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 商品售后状态
 * @param  {arg}
 * @return {[sign]}
 *
 */
export const FilterGoodsSts = (ordSts) => {
  const newOrdSts = {
    'init': '申请售后',
    'pending': '退款中',
    'refund': '已退款',
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 订单状态提示管理
 * @param  {ordSts}
 * @return {ordSts}
 *
 */
export const FilterOrdStsTip = (ordSts) => {
  const newOrdSts = {
    'INIT': '订单将于**小时**分钟**秒自动取消，请尽快完成支付',
    'WPAY': '订单将于**小时**分钟**秒自动取消，请尽快完成支付',
    'SUCC': '买家已支付，等待商家发货或提醒发货',
    'DELI': '商家已发货，请及时确认收货申请售后',
    'RECE': '订单完成请您对本次交易作出评价',
    'FAIL': '支付失败，等待买家重新支付',
    'REFU': '已退款',
    'WAIT': '支付结果确认中请等待支付平台反馈结果',
    'CLEA': '订单已取消',
    'FINI': '订单完成感谢您对本次交易作出的评价',
    'DELETE': '订单已删除',
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 退款售后订单状态管理
 * @param  {arg}
 * @return {[sign]}
 *
 */
export const FilterRefundOrdSts = (type, ordSts) => {
  let newOrdSts = {}
  if (type === 'drawback') {
    newOrdSts = {
      'init': '退款中',
      'pending': '退款中',
      'approve': '退款中',
      'disagree': '退款失败',
      'fail': '退款失败',
      'received': '已收货',
      'cancel': '退款取消',
      'success': '退款完成'
    };
  } else {
    newOrdSts = {
      'init': '退款退货中',
      'pending': '退款退货中',
      'approve': '退款退货中',
      'disagree': '退款失败',
      'fail': '退款失败',
      'received': '已收货',
      'cancel': '退款取消',
      'success': '退款完成'
    };
  }


  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};


/**
 * 退款售后订单状态提示管理
 * @param  {ordSts}
 * @return {newOrdSts}
 *
 */
export const FilterRefundOrdStsTip = (ordSts) => {
  const newOrdSts = {
    'init': '退款中 请联系商家处理退款',
    'pending': '退款中 请联系商家处理退款',
    'approve': '退款中 请联系商家处理退款',
    'disagree': '商家已拒绝了您的退款申请',
    'fail': '商家已拒绝了您的退款申请',
    'received': '已收货',
    'cancel': '买家已取消售后申请',
    'success': '商家已同意退款，退款将转至您的账户中',
    // 'DELETE': '订单已删除'
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 收银记录支付方式
 * @param  {ordSts}
 * @return {newOrdSts}
 *
 */
export const FilterCashierPaySts = (ordSts) => {
  const newOrdSts = {
    'ALIPAY': '支付宝支付',
    'WXPAY': '微信支付',
    'BLA': '余额支付'
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

export const FilterCashierPayImg = (ordSts) => {
  const newOrdSts = {
    'ALIPAY': '1',
    'WXPAY': '2',
    'BLA': '3'
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 日期转星期
 * @param  {ordSts}
 * @return {newOrdSts}
 *
 */
export const FilterDateToWeek = (ordSts) => {
  const newOrdSts = {
    'Monday': '周一',
    'Tuesday': '周二',
    'Wednesday': '周三',
    'Thursday': '周四',
    'Friday': '周五',
    'Saturday': '周六',
    'Sunday': '周日',
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};

/**
 * 活动类型
 * @param  {ordSts}
 * @return {newOrdSts}
 *
 */
export const FilterActType = (ordSts) => {
  const newOrdSts = {
    'collage': '拼团',
    'bargain': '砍价',
    'seckill': '秒杀',
    'other': '其他',
    'none': ''
  };

  return newOrdSts[ordSts] ? newOrdSts[ordSts] : ordSts;
};
// apptype 客户端类型  1安卓，2 ios 3 网页
// 获取当前操作系统
// export const getOS = () => {
//   let apptype;
//   if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
//     apptype = 1;
//   } else if (navigator.userAgent.indexOf('iPhone') > -1) {
//     apptype = 2;
//   } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
//     apptype = 3;
//   } else {
//     apptype = null;
//   }
//   return apptype
// }

// apptype 客户端类型  1安卓，2 ios 3 网页 8小程序
// 获取当前操作系统
export const getOS = () => {
  // let apptype;
  // if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
  //   apptype = 1;
  // } else if (navigator.userAgent.indexOf('iPhone') > -1) {
  //   apptype = 2;
  // } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
  //   apptype = 3;
  // } else {
  //   apptype = null;
  // }
  // return apptype

  let ua = window.navigator.userAgent.toLowerCase()
  // 小程序环境下交互处理
  let miniprogram
  if ( /MicroMessenger/i.test(navigator.userAgent)) {
    wx.miniProgram.getEnv(function(res) {
      console.log('miniprogram', res.miniprogram) 
      miniprogram = res.miniprogram // true
    })
  }
  // console.log('客户端'+ua)
	if ( ua.indexOf('cswldxiaomi') > -1 ) {
		if ( ua.indexOf('android') > -1 ) {
			return 1
		}
		else if ( ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
			return 2
		}
  }
  else if (miniprogram){
    return 8 // 小程序环境
  } 
  else {
		return null
	}
}


/**
 * 通用调用app聊天  比如联系卖家
 * @param {string} code 用户信息ucode
 * @param {string} nkname 用户信息昵称
 */
export const fchat = (code, nkname, self) => {
  const apptype = getOS()
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.contactBuyer(code, nkname);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "chat": {
        "code": "" + code + "",
        "nkname": "" + nkname + ""
      }
    });
  } else if( apptype === 8 ){
    Toast.info('请下载蜜购APP',1.2,null,false)
    return
  } else {
    // //下载地址
    // if(localStorage.getItem('switchroles')==0){
    //   // 蜜购
      window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.wld.migo");
    // } else if(localStorage.getItem('switchroles')==1){
    //   // 小蜜
    //   window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.wld.net");
    // } else {
    //   window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wld.net";
    // }
  }
}


/**
 * 通用调APP个人动态 比如会员管理点头像
 * @param {string} ucode 当前头像触发跳转人的ucode
 * @param {int} isshop 是否是商家0个人  1商家
 */
export const goSpaceDynamics =(ucode, isshop)=>{
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript:resultData.goUserDetails(''+ucode+'',''+isshop+'');
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({"space":{"ucode":""+ucode+"","isshop":""+isshop+""}});
  } else {

  }
}


/**
 * 跳转app店铺
 * @param {int} storeId 店铺id
 * @param {string} ucode 商家ucode
 */
export const goShopDetail = (_this,ucode, spec) => {
  const apptype = getOS();
  const Ucode = spec === 'spec' ? 'T10035' : ucode
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.goShopDetail(Ucode);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "goShopDetail": {
        // "storeId": "" + storeId + "",
        "ucode": "" + Ucode + ""
      }
    });
  } 
  else if(apptype === 8){
    Toast.info('请下载蜜购APP',1.2,null,false)
    return;
  } else {
    //网页店铺首页
    jump(_this,'/shopIndex',{c_acode:Ucode});
  }
}

/**
 * 跳转全部商品评论
 * @param {int} pcode 商品id
 * @param {string} acode 商家ucode
 */
export const goGoodsAllComment = (_this,pcode, acode) => {
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.goGoodsAllComment(pcode, acode);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "goGoodsAllComment": {
        "pcode": "" + pcode + "",
        "acode": "" + acode + ""
      }
    });
  } else {
    //商品全部评论跳转
    // let path = {
    //   pathname: '/goodsEvaluation',
    //   state: {
    //     ucode: pcode
    //   }
    // }
    jump(_this,'/goodsEvaluation',{pcode:pcode});
  }
}


/**
 * 保存文件到本地
 * @param {string} ljsrc 文件路径
 */
export const saveFilesLocal = (ljsrc) => {
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.saveFilesLocal(ljsrc);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "saveFilesLocal": {
        "ljsrc": "" + ljsrc + ""
      }
    });
  } else {

  }

}

/**
 * 查看商品详情
 * @param {string} pcode 商品pcode
 * @param {string} generalizeBalanceType 推广账户类型:PER 个人推广账户,MER商家账号推广类型
 * @param {string} pucode 推广人ucode
 */
export const shopGoodsDetails = (_this,pcode, pucode, generalizeBalanceType) => {
  const apptype = getOS();
  if (apptype === 1) { //source 1线上商家,2线下
    javaScript: resultData.shopGoodsDetails(pcode);
  }
  else if (apptype === 2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "shopGoodsDetails": {
        "pcode": "" + pcode + ""
      }
    });
  } 
  else if(apptype === 8){
    return;
  }
   else {
    //网页的商品详情跳转
    jump(_this,'/goodsDetail',{pcode:pcode});

  }
}

/**
 * 资讯中心留言
 * @param {int} type 资讯中心入口
 * @param {int} cid 资讯详情id
 */
export const subNewsMsgInfo =(_this,type,cid, title)=> {
  const apptype = getOS();
  if(apptype ===1){
    javaScript:resultData.goPublishMsg(type,cid,title);
  }else if(apptype ===2){
    window.webkit.messageHandlers.AppModel.postMessage({"goPublishMsg":{"type":""+type+"","cid":""+cid+""}});
  }else{
    jump(_this,'/comments',{type,cid});
  }
}


/**
 * 返回APP首页
 *
 */
export const returnset =(_this)=> {
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.webFinish();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "popSet": ""
    });
  } else {
    jump(_this,`/index`);
  }
}

/**
 * 返回APP首页--刷新的情况
 *
 */
export const returnsetRefresh =(_this)=> {
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.webFinishAndRefreshMineList();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "popSet": ""
    });
  } else {
    jump(_this,`/index`);
  }
}


/**
 * 返回APP商城首页
 *
 */
export const Mallhomepage =(_this)=> {
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.Mallhomepage();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "Mallhomepage": ""
    });
  } else {
    jump(_this,`/index`);
  }
}

/**
 * 返回特卖商城首页
 *
 */
export const exhibitionHomePage =(_this)=> {
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.exhibitionHomePage();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "exhibitionHomePage": ""
    });
  } else {
    console.log('this.props.config.GetHost', _this.props.config.GetHost)
    window.location.href = `${_this.props.config.GetHost}/me/index`
  }
}

/**
 * 跳转花粉记录
 *
 */
export const goPollenPage =(_this)=> {
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.goPollenPage();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "goPollenPage": ""
    });
  } else {
    
  }
}

/**
 * 跳转原生发货物流
 *
 */
export const appEditLogitics =(logiticsData)=> {
  // Toast.info(JSON.stringify(logiticsData),1.2, null, true)
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.editLogitics(JSON.stringify(logiticsData));
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "editLogitics": {"logiticsData": JSON.stringify(logiticsData)}
    });
  }
}

/**
 * 如果没有登录的情况，原生的入口则跳原生的登录，否则跳网页的登录
 */
export const LoginRegist =(_this)=>{
  const apptype = getOS();
  if(apptype===1) {
    javaScript: resultData.LoginRegist();
  }
  else if(apptype===2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "LoginRegist": ""
    });
  }
  else {
    // setTimeout(() => {
      console.log('host', config.GetHost)
      window.location.href = `${config.GetHost}${BASENAME}/login?isgoback=1`
    // }, 10000);
    // browserHistory.push(`${BASENAME}/login`)
    // jump(_this,'/login',{isgoback:1})
  }
}

// 校验登录
/*  进入判断授权 */
export const  isLogin = (_this) =>  {
  const token = localStorage.getItem('GID');
  if (!token) {
    // jump(_this,'/login',{isgoback:1})
    LoginRegist(_this)
    return
  }
}

/**
 * 改变导航栏右边文字与改变app导航调用
 * @param {string} txt 右上角显示文案
 * @param {function} cb 网页的右上角事件
 */
export const ChRightText =(txt,cb)=> {
  const apptype = getOS();
  var act = 'rightoption';
  if (apptype === 1) {		//小蜜安卓软件
    javaScript:resultData.RightBarOption(txt,act);
  } else if (apptype === 2) {		//小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({"RightBarOption":{"text":""+txt+"","action":""+act+""}});
  } else {
    //网页右上角事件
    // cb()
  }
}
/**
 * 改变导航栏右边图标与改变app导航调用
 * @param {string} txt 右上角显示图片Icon
 * @param {function} cb 网页的右上角事件
 */
export const ChRightIcon =(txt,cb)=> {
  const apptype = getOS();
  var act = 'rightoption';
  if (apptype === 1) {		//小蜜安卓软件
    javaScript:resultData.RightImgBarOption(txt,act);
  } else if (apptype === 2) {		//小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({"RightImgBarOption":{"text":""+txt+"","action":""+act+""}});
  } else {
    //网页右上角事件
    // cb()
  }
}

/**
 * 改变导航栏右边事件，如果退出页面则清空右上角事件
 */
export const RightBarEmpty = ()=>{
  const apptype = getOS();
  if (apptype === 1) {		//小蜜安卓软件
    javaScript:resultData.RightBarOption("","");
  } else if (apptype === 2) {		//小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({"RightBarEmpty":""});
    // window.webkit.messageHandlers.AppModel.postMessage({"RightBarOption":{"text":'',"action":""}});
  } else {

  }
}

/**
* 判断两个版本字符串的大小
* @param  {string} v1 原始版本
* @param  {string} v2 目标版本
* @return {number}    如果原始版本大于目标版本，则返回大于0的数值, 如果原始小于目标版本则返回小于0的数值。0当然是两个版本都相等拉。
*/
export const compareVersion = (v1, v2) => {
  var _v1 = v1.split("."),
  _v2 = v2.split("."),
  _r = _v1[0] - _v2[0];
  return _r == 0 && v1 != v2 ? compareVersion(_v1.splice(1).join("."), _v2.splice(1).join(".")) : _r;
  }

/**
 * 确认支付，与原生交互，原生调支付宝
 * @param {string} payurl 支付链接
 */
export const AppCallbackPay =(payurl)=>{
  const apptype = getOS();
  if (apptype === 1) {		//小蜜安卓软件
    javaScript:resultData.AppCallbackPay(payurl);
  } else if (apptype === 2) {		//小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({"alipayPayUrl":{"payUrl":""+payurl+""}});
  } else {
    // let newWin=window.open();
    // newWin.location.href = payurl
  }
}

/**
 *  app 内唤起支付宝
 * @param {string} url 支付url
 */
export const callAlipay = (url) => {
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.callAlipay(url);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "callAlipay": {
        "url": "" + url + ""
      }
    });
  } else {

  }

}

/**
 *  头部颜色原生交互
 * @param {string} url 支付url
 */
export const setHeaderColor = (color) => {
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.setHeaderColor(color);
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "setHeaderColor": {
        "color": "" + color + ""
      }
    });
  } else {

  }

}

/**
 *  获取原生通讯录
 * @param {string} 
 */
export const requestContact = () => {
  const apptype = getOS();
  if (apptype === 1) { //小蜜安卓软件
    javaScript: resultData.requestContact();
  }
  else if (apptype === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "requestContact": ""
    });
  } else {

  }

}



/**
 * 特卖下单成功  订单列表，订单详情跳支付界面的交互
 * @param {object} this 跳转支付链接
 * @param {object} paydata 订单数据json
 * @param {string} busType 区分订单
 * @param {string} source 订单来源
 * @param {string} isConfirmOrder 是否是下单的入口，为了区分订单列表，订单详情
 */
export const appPayMethod =(_this,paydata, busType, source, isConfirmOrder)=>{  
  console.log('busType', busType)
  console.log('isConfirmOrder', isConfirmOrder)
  const apptype = getOS();//localStorage.getItem('apptype');
  if (apptype === 1) {
    javaScript: resultData.clickorderpay( JSON.stringify(paydata) );
  }
  else if (apptype === 2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "paySpecOrder": {
        "orderId": "" + paydata.orderId + "",
        "orderAmount": "" + paydata.orderAmount + "",
        "proFree": "" + paydata.proFree + "",
        "isSpecOrder": "" + paydata.isSpecOrder + ""
      }
    });
  } 
  else if(apptype === 8){
    if(isConfirmOrder == 'confirmOrder'){ 
      // 小程序环境蜜铺下单跳小程序支付
        let appletData = {
          orderId: paydata.orderId,
          orderAmount: paydata.orderAmount,
          proFree: paydata.proFree,
          isSpecOrder: paydata.isSpecOrder ? paydata.isSpecOrder:'',
          busType: busType,
          source
        }     
        wx.miniProgram.redirectTo({url: `payMent`})
        wx.miniProgram.postMessage({data:{paydata:appletData}})   
    } else {
      // 订单列表筛选跳转-只有小程序生成的订单才可进行小程序支付
      if(source == 'MINI_SPEC' || source == 'MINI_MIPU'){
        let appletData = {
          orderId: paydata.orderId,
          orderAmount: paydata.orderAmount,
          proFree: paydata.proFree,
          isSpecOrder: paydata.isSpecOrder ? paydata.isSpecOrder:'',
          busType: busType,
          source
        }     
        wx.miniProgram.redirectTo({url: `payMent`})
        wx.miniProgram.postMessage({data:{paydata:appletData}}) 
      } else {            
        Toast.info('亲，当前订单需下载蜜购APP进行支付！')     
      }    
    }
  } 
  else {
    jump(_this,'/payMethods',{data: paydata}, 'state')
    // setTimeout(function () {
      // window.location.href = url;
    // }, 2000);
  }
}



/**
 * 营销活动商品下单成功  跳支付界面的交互
 * @param {object} this 跳转支付链接
 * @param {object} paydata 订单数据
 * @param {string} busType 区分订单
 * @param {string} source 订单来源
 */
export const appGoodsPayMethod =(_this,paydata, busType, source)=>{
  const apptype = getOS();
  if(apptype == 8){    
    let appletData = {...paydata, busType, source} 
    wx.miniProgram.redirectTo({url: `payMent`})
    wx.miniProgram.postMessage({data:{paydata:appletData}})    
  } 
  else {
    jump(_this,'/payMethods',{data: paydata}, 'state')
  }
}

/**
 * 营销活动商品待支付  跳支付界面的交互
 * @param {object} this 跳转支付链接
 * @param {object} paydata 订单号
 * @param {string} busType 订单类型
 */
export const webAppletPayMethod =(_this, paydata, busType, source)=>{
  let miniprogram
  wx.miniProgram.getEnv(function(res) {
    console.log('miniprogram', res.miniprogram) 
    miniprogram = res.miniprogram // true
  }) 
  if(miniprogram){   
    let appletData = {...paydata, busType, source}  
    if(source == 'MINI_SPEC' || source == 'MINI_MIPU'){
      wx.miniProgram.redirectTo({url: `payMent`})
      wx.miniProgram.postMessage({data:{paydata:appletData}})
    } else {
      Toast.info('亲，当前订单需下载蜜购APP进行支付！')
    }
  } else {
    jump(_this,'/paymethods', { data: paydata }, 'state')
  }
}


/**
 * 实时动态强制更改用户录入
 * arg1 inputObject
 **/
export const amount = (value) => {
  if (value === '.') {
    value = '0.'
  }
  value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    value = parseFloat(value);
  }
  return value.toString();
}



/**
 * js 判断当前操作系统是ios还是android
 * arg1 inputObject
 **/
export const isuserAgent = function () {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //这个是安卓操作系统
    return 'ANDROID'
  }
  if (isIOS) {　　　　 //这个是ios操作系统
    return 'IOS'
  }
}

/**
 * 判断浏览器是微信还是支付宝
 */
export const isAlipayOrWechat = () => {
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.match(/Alipay/i) == "alipay") {
    return "ALIPAY";
  } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
    return "WXPAY";
  }
}


/**
 * 特卖客服
 */
export const SaleCustomerService = ()=> {
  // if(localStorage.getItem('version' === '4.0.6')){
    if (getOS() === 1) { //小蜜安卓软件
      javaScript: resultData.SaleCustomerService();
    }
    else if (getOS() === 2) { //小蜜ios软件
      window.webkit.messageHandlers.AppModel.postMessage({
        "SaleCustomerService": {}
      });
    } else if(getOS() === 8){
      Toast.info('请下载蜜购APP',1.2,null,false)
      return
    }else {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => {
        ysf.config({
          uid:"", 
          name:'',
          email:'',
          mobile:'',
          staffid:'', // 客服id-1342925
          groupid: '', // 客服组id
        });
        ysf.open()
      }
      // script.src = 'https://qiyukf.com/script/6e66fd44d0fb1b024d4130cb42d75c52.js?hidden=1'
      script.src = 'https://qiyukf.com/script/4f732e11ef97d6e1d3b42732f45cf4c9.js?hidden=1'
      document.body.appendChild(script)
    }
  // } else {
    // Toast.info('亲，在线客服需更新至最新版本',1.5);
  // }
}


/**
 * 特卖商品客服
 * @param {string} goodsname 商品名称
 * @param {string} goodsimg 商品图片
 * @param {float} goodsprice 商品价格
 */
export const serviceProduct = (goodsname, goodsimg, goodsprice) => {
  if (getOS() === 1) { //小蜜安卓软件
    javaScript: resultData.serviceProduct(goodsname, goodsimg, goodsprice, window.location.href);
  }
  else if (getOS() === 2) { //小蜜ios软件
    window.webkit.messageHandlers.AppModel.postMessage({
      "serviceProduct": {
        "goodsname": "" + goodsname + "",
        "goodsimg": "" + goodsimg + "",
        "goodsprice": ""+goodsprice+"",
        "goodsurl": ""+window.location.href+""
      }
    });
    } else {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => {
        ysf.config({
          uid:"", 
          name:'',
          email:'',
          mobile:'',
          staffid:'', // 客服id-1342925
          groupid: '', // 客服组id
        });
        ysf.product({
          show : 1, // 1为打开， 其他参数为隐藏（包括非零元素）
          title : goodsname,
          picture : goodsimg,
          note : goodsprice,
          url : window.location.href,
        })
        ysf.open()
      }
      // script.src = 'https://qiyukf.com/script/6e66fd44d0fb1b024d4130cb42d75c52.js?hidden=1'
      script.src = 'https://qiyukf.com/script/4f732e11ef97d6e1d3b42732f45cf4c9.js?hidden=1'
      document.body.appendChild(script)
      console.log('url', window.location.href)
  }
}


/**
 * 分享图片交互
 * @param {Array} imgArr 图片数据
 */
export const appShareImage =(imgArr)=>{
  // var jsonImg = {}
  // jsonImg = JSON.parse(imgArr)
  console.log(imgArr)
  var apptype = getOS();
  if (apptype == 1) {
    javaScript: resultData.EbusinessShareImage(imgArr);
  }
  else if (apptype == 2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "ShareImage": {
        "ShareImageArray": "" + imgArr + ""
      }
    });
  } else {
    Toast.info('暂不支持小蜜APP外分享图片',3)
  }
}


//JavaScript实现PHP的urlencode与urldecode函数
export const urlencode = function (clearString) {
  var output = '';
  var x = 0;

  clearString = utf16to8(clearString.toString());
  var regex = /(^[a-zA-Z0-9-_.]*)/;

  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
      output += match[1];
      x += match[1].length;
    }
    else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
      }
      x++;
    }
  }

  function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      }
      else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
      else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }

  return output;
}


export const urldecode = function (encodedString) {
  var output = encodedString;
  var binVal, thisString;
  var myregexp = /(%[^%]{2})/;
  function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          out += str.charAt(i - 1);
          break;
        case 12: case 13:
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }
  while ((match = myregexp.exec(output)) != null
    && match.length > 1
    && match[1] != '') {
    binVal = parseInt(match[1].substr(1), 16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }

  output = output.replace(/\\+/g, " ");
  output = utf8to16(output);
  return output;
}

//JavaScript实现PHP的urlencode与urldecode函数  结束

/**
 * indexof截取字符串  获取链接拼接参数
 * @param {string} str 需截取的字符
 * @param {int} len str的长度
 */
export const GetParamValue = (href, str, len) => {
  let currentHref = href;
  console.log(currentHref);
  let startIndex = currentHref.indexOf(str) + len
  let endIndex = currentHref.indexOf('&', startIndex)
  let valstr = ''
  if (startIndex != -1 && endIndex != -1) {
    if (endIndex != -1) {
      valstr = currentHref.slice(startIndex, endIndex)
    }
    else {
      valstr = currentHref.slice(startIndex)
    }
    console.log(valstr);
    return valstr;
  }
  else {
    return null
  }
}

/**
 * 判断运行环境
 */
export const getOSSign = () => {

	let ua = window.navigator.userAgent.toLowerCase()

	if ( ua.indexOf('cswldxiaomi') > -1 ) {
		if ( ua.indexOf('android') > -1 ) {
			return 'android'
		}
		else if ( ua.indexOf('iphone') > -1 ) {
			return 'iphone'
		}
	}
	else {
		return 'web'
	}
}

/**
 * 弹出层，阻止body 滑动
 *
 */
export const DivScroll = (_this, layerNode) => {
  //如果没有这个元素的话，那么将不再执行下去
  if ( !document.querySelector( layerNode ) ) return ;

  _this.popupLayer = document.querySelector( layerNode ) ;
  _this.startX = 0 ;
  _this.startY = 0 ;

  _this.popupLayer.addEventListener('touchstart', function (e) {
      _this.startX = e.changedTouches[0].pageX;
      _this.startY = e.changedTouches[0].pageY;
  }, false);

  // 仿innerScroll方法
  _this.popupLayer.addEventListener('touchmove', function (e) {

      e.stopPropagation();

      var deltaX = e.changedTouches[0].pageX - _this.startX;
      var deltaY = e.changedTouches[0].pageY - _this.startY;

      // 只能纵向滚
      if(Math.abs(deltaY) < Math.abs(deltaX)){
          e.preventDefault();
          return false;
      }

      if( _this.offsetHeight + _this.scrollTop >= _this.scrollHeight){
          if(deltaY < 0) {
              e.preventDefault();
              return false;
          }
      }
      if(_this.scrollTop === 0){
          if(deltaY > 0) {
              e.preventDefault();
              return false;
          }
      }
      // 会阻止原生滚动
      // return false;
  },false);
}

/**
 * 获取当前经纬度
 * url 链接
 * callback 回调
 */
export const loadScript = (url, callback) => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  // script.onload = () => {
  //   callback()
  // }
  // script.src = url

  if(script.readyState){
    script.onreadystatechange=function(){
     if(script.readyState == "loaded" || script.readyState == "complete"){
     script.onreadystatechange=null;
     callback();
     }
    }
  }else{
    script.onload=function(){
    //  callback();
     if(callback!=undefined){
      callback();
      }
    }
  }
  script.src=url;
  document.body.appendChild(script)

}

/**
 * 登录失效重新授权
 * url 链接
 * callback 回调
 */
export const renewWXAuth = (_this,params) => {
  if (params === 30002 && isAlipayOrWechat() == 'WXPAY') {
    console.log("come ing")
    localStorage.clear()
    sessionStorage.clear()
    localStorage.WXLOSE = true
     // 页面动态授权
    let auth_way = isAlipayOrWechat() == 'ALIPAY' ? 2 : 1;//授权方式 1微信 2支付宝
    let code; //获取授权链接返回的code
    let scope = ''; //授权类型：静态授权

    code = auth_way == 2 ? _this.props.location.query.auth_code : _this.props.location.query.code;
    scope = auth_way == 2 ? 'auth_user' : 'snsapi_userinfo';
    console.log("授权code-state", code);
    GetAuthorization(code, scope, window.location.href, this, () => {
    });
    return
  }
}
