export default (() => {
  window.gconfig = {};
  (function (global) {
    // 本地开发打开的路径以及端口  服务器路径
    global.linkUrlJava = 'https://mapi.58wld.com/weleadin-web-mapi';//李伟组 UAT

    global.linkUrlJavaPOS = 'https://uatmapi.58wld.com/weleadin-web-mapi';//李伟组  pos端新接口

    global.linkUrlShop = 'https://mall.58wld.com'; //周立波组，商城 UAT

    global.linkUrlShopAgent = 'https://agent.58wld.com'  // 周立波组，商城 店铺相关 UAT

    global.linkUrlPHP = 'https://wldoperation.58wld.com';//PHP组 UAT

    global.linkUrlPHPAct = 'https://newactivity.58wld.com';//PHP组, 活动

    global.linkUrlPython = 'https://exhibition.58wld.com'  // 场景电商 展会列表

    global.linkUrl = 'http://192.168.1.143:3033';//本地mock


    //静态资源，特卖商品图片地址
    global.GetHostCDN = "https://cdn.haoyiku.com.cn/";
    // 获取小蜜-蜜管家-蜜购host
    global.GetHost = "https://ceshiapi.58wld.com";
    // 支付系统host
    global.GetPayHost = "https://ceshiapi.iweilingdi.com";

    // 测试环境
    global.WXAPPID = 'wx6a609b3984079e1a';
    global.ALIPAYID = '2018050302628013'

    if (process.env.NODE_ENV === 'production') { //生产环境用不同的接口地址

      global.linkUrlJava = 'https://mapi.58wld.com/weleadin-web-mapi';// 李伟组 UAT
      global.linkUrlShop = 'https://mall.58wld.com'; // 周立波组，商城 UAT
      global.linkUrlPHP = 'https://wldoperation.58wld.com';// PHP组 UAT
      global.linkUrlPHPAct = 'https://newactivity.58wld.com';// PHP组, 活动 UAT
      global.linkUrlPython = 'https://exhibition.58wld.com'  // 场景电商 展会列表 UAT

      // 获取小蜜-蜜管家-蜜购host
      global.GetHost = "https://ceshiapi.58wld.com";
      // 支付系统host
      global.GetPayHost = "https://ceshiapi.iweilingdi.com";

      // // 生产环境
      // global.linkUrlJava = 'https://xapi.weilingdi.com/weleadin-web-mapi';//李伟组 生产
      // global.linkUrlShop = 'https://mall.weilingdi.com'; //周立波组，商城 生产
      // global.linkUrlPHP = 'https://wldoperation.weilingdi.com';//PHP 生产
      // global.linkUrlPHPAct = 'https://newactivity.weilingdi.com';//PHP组, 活动 生产
      // global.linkUrlPython = 'https://exhibition41.weilingdi.com'  // 场景电商 生产

      // global.GetHost = "https://front.weilingdi.com"; // 获取Host 生产
      // global.GetPayHost = "https://m.weilingdi.com"; // 支付入口链接 生产

      // // 生产环境
      // global.WXAPPID = 'wx862dd3d79978e035';
      // global.ALIPAYID = '2016042201325227';

    }

  }(window.gconfig));
})()

export const prefix = global.gconfig.linkUrl;

export const prefixJava = global.gconfig.linkUrlJava;

export const prefixJavaPOS = global.gconfig.linkUrlJavaPOS;

export const prefixShop = global.gconfig.linkUrlShop;

export const prefixShopAgent = global.gconfig.linkUrlShopAgent

export const prefixPHP = global.gconfig.linkUrlPHP;

export const prefixPHPAct = global.gconfig.linkUrlPHPAct;

export const prefixPython = global.gconfig.linkUrlPython

export const suffix = ''; //接口后缀

//微信APPID
export const AUTHWXAPPIDSTR = global.gconfig.WXAPPID;
//支付宝APPID
export const AUTHALIPAYIDSTR = global.gconfig.ALIPAYID;

// host获取
export const GetHost = global.gconfig.GetHost
export const GetPayHost = global.gconfig.GetPayHost
