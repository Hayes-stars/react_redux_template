const tableList = require('./datas/tableList')

const prefix = '.json'

module.exports = {
  [`/tableList${prefix}`]: tableList,
  ['/getlist']: {
    code: 0,
    msg: "ok",
    data: {
      page: 1,
      count: 100,
      "list|3-20": [
        {
          img: 'http://imgsrc.baidu.com/imgad/pic/item/ac345982b2b7d0a256f93ab0c0ef76094b369aee.jpg',
          title: 'LX570',
          author: 'jill111',
        }
      ]
    }
  },
  // 商城首页
  ['/index']: {
    code: 0,
    msg: 'ok',
    data: {
      activityImg: '',
      "bannerList|5-8": [
        {
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-principles-flyingsquare_large_mdpi.png',
          link: 'https://www.baidu.com/'
        }
      ],
      'gridList|16': [
        {
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
          text: 'title',
          href: 'https://www.baidu.com'
        }
      ],
      "activityList|3": [
        {
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-principles-flyingsquare_large_mdpi.png',
          price: '288.00',
          originalPrice: '299.99',
          link: 'https://www.baidu.com/'
        }
      ],
      'hotList|4': [
        {
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-principles-flyingsquare_large_mdpi.png',
          goodName: '德国双立人刀具',
          receiptAd: '10.00',
          price: '199.00',
          soldNum: '1234',
          follow: '999'
        }
      ],
      'brandsList|3-5': [
        {
          brandName: '中小蜜',
          goodImg: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-principles-flyingsquare_large_mdpi.png',
          goodName: '德国双立人Style刀具7件套不锈钢菜刀',
          price: '2999.00',
          discountName: '代理价(1级)：',
          discountNum: '￥2385.00',
          applyNum: '233'
        }
      ]
    }
  },
  // 商品详情
  ['/getGoodsDetail']: {
    code: 0,
    msg: 'ok',
    data: {
      price: '14778.00',
      suggestPrice: '19999',
      commentsNum: '1818',
      soldNum: '25000',
      leftGoodsNum: '300',
      goodsName: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
      previewUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-principles-flyingsquare_large_mdpi.png',
      priceList: [
        '1588.00',
        '1399.00',
        '1298.00'
      ],
      imgList: [
        {
          key: 1,
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-goals-landingimage_large_mdpi.png'
        },
        {
          key: 2,
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-goals-landingimage_large_mdpi.png'
        },
        {
          key: 3,
          imgUrl: 'http://wiki.jikexueyuan.com/project/material-design/images/materialdesign-goals-landingimage_large_mdpi.png'
        }
      ],
      typeList: [
        "L12456",
        "L88888",
        "L14245"
      ],
      sizeList: [
        '白色',
        '黑色',
        '蓝色'
      ],
      ticketList: [
        {
          ticketName: '满99元可用（部分商品）',
          ticketType: '折扣券',
          discount: '8.0',
          validStartTime: '2017.01.03',
          validEndTime: '2017.09.10',
          grantedNum: 20,
          getNum: 20,
          usedNum: 2000
        },
        {
          ticketName: '满100元可用（部分商品）',
          ticketType: '折扣券',
          discount: '9.1',
          validStartTime: '2017.01.03',
          validEndTime: '2017.09.10',
          grantedNum: 18,
          getNum: 19,
          usedNum: 99
        },
        {
          ticketName: '满100元可用（部分商品）',
          ticketType: '折扣券',
          discount: '7.7',
          validStartTime: '2017.01.03',
          validEndTime: '2017.09.10',
          grantedNum: 132,
          getNum: 132,
          usedNum: 446
        }
      ],
      tagList: [
        '品牌认证',
        '实力商家',
        '微商供应商'
      ],
      serviceList: [
        '7天包换',
        '一件代发',
        '48小时发货',
        '品牌代理'
      ]
    }
  },
  ['/confirmpay']: {
    code: 0,
    msg: "ok",
    data: {
      orderId: "a1804291615200873",
      orderMoney: "8388",
      'ticketList|3-5': [
        {
          ticketName: '满99元可用（部分商品）',
          ticketType: '折扣券',
          discount: '8.0',
          validStartTime: '2017.01.03',
          validEndTime: '2017.09.10',
          grantedNum: 20,
          getNum: 20,
          usedNum: 2000
        }
      ]
    }
  },
  ['/orderInfo']: {
    code: 0,
    msg: "ok",
    data: {
      list: [
        {
          orderid: "a1804291615200873",
          img:"https://ceshiapi.iweilingdi.com/Uploads/activity/2018-04-29/5ae56b7cc9b87.png",
          price: "8388",
          type: "香槟D款",
          orderName: "blablabla",
          c_deliverystate: "5.00"
        },
        {
          orderid: "a1804291615200873",
          img:"https://ceshiapi.iweilingdi.com/Uploads/activity/2018-04-29/5ae56b7cc9b87.png",
          price: "8388",
          type: "香槟D款",
          orderName: "伴娘小礼服哇哈哈伴娘小礼服哇哈哈伴娘小礼服哇哈哈伴娘小礼服哇哈哈伴娘小礼服哇哈哈",
          c_deliverystate: "5.00"
        },
        {
          orderid: "a1804291615200873",
          img:"https://ceshiapi.iweilingdi.com/Uploads/activity/2018-04-29/5ae56b7cc9b87.png",
          price: "8388",
          type: "香槟D款",
          orderName: "biubiubiu",
          c_deliverystate: "5.00"
        }
      ]
    }
  },
  ['/goodsList' ]: {
    code: 0,
    msg: 'ok',
    "data|3-5": [
      {
        "shopname": "默小宝美妆店1",
        "checked": false,
        "list|3-5": [
          {
            checked: false,
            commodity: '',
            shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
            des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
            money: '2385.00'
          }
        ]
      }
    ]
  },
  ['/confirmOrder']:{
    code: 0,
    msg: 'ok',
    data:{
      "isaddress":false,//是否有地址
      "shopname": "默小宝美妆店1",
      "isexpressage":true,//是否快递
      "allmoney":"2385.00",
      "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
      "name":"彭权艺",
      "phone":"153 9990 9663",
      "list|1-3": [
        {
          checked: false,
          commodity: '',
          shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
          des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
          money: '2385.00'
        }
      ]
    }
  },
  ['/orderList']:{
    code: 0,
    msg: 'ok',
    data: {
      "data|1-3":[
        {
          "status":'待付款',//是否有地址
          "shopname": "默小宝美妆店1",
          "isexpressage":true,//是否快递
          "allmoney":"2385.00",
          "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
          "name":"彭权艺",
          "count":"1",
          "list|1-2": [
            {
              checked: false,
              commodity: '型号：L 规格：黑色',
              shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
              des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
              money: '2385.00',
              num: 1
            }
          ]
        }
      ]
    }
  },
  ['/getAddress']:{
    code: 0,
    msg: 'ok',
    "data|3-15":[
      {
        "isaddress":false,//是否有地址
        "shopname": "默小宝美妆店1",
        "isexpressage":true,//是否快递
        "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
        "name":"彭权艺",
        "phone":"153 9990 9663",
        "id|+1":0
      }
    ]
  },
  ['/myGroup']:{
    code: 0,
    msg: 'ok',
    data: {
      "data|1-3":[
        {
          "status":'待付款',//是否有地址
          "shopname": "默小宝美妆店1",
          "isexpressage":true,//是否快递
          "allmoney":"2385.00",
          "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
          "name":"彭权艺",
          "count":"1",
          "list|1-2": [
            {
              checked: false,
              commodity: '型号：L 规格：黑色',
              shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
              des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
              money: '2385.00',
              num: 1
            }
          ]
        }
      ]
    }
  },
  ['/groupdetail']:{
    code: 0,
    msg: 'ok',
    data: {
      "data|1-3":[
        {
          "status":'待付款',//是否有地址
          "shopname": "默小宝美妆店1",
          "isexpressage":true,//是否快递
          "allmoney":"2385.00",
          "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
          "name":"彭权艺",
          "count":"1",
          "list|1-2": [
            {
              checked: false,
              commodity: '型号：L 规格：黑色',
              shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
              des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
              money: '2385.00',
              num: 1
            }
          ]
        }
      ]
    }
  },
  ['/bargaindetail']:{
    code: 0,
    msg: 'ok',
    data: {
      "data|1-3":[
        {
          "status":'待付款',//是否有地址
          "shopname": "默小宝美妆店1",
          "isexpressage":true,//是否快递
          "allmoney":"2385.00",
          "address":"湖南省长沙市岳麓区梅溪湖街道东方红家 顺园 12栋2单元207",
          "name":"彭权艺",
          "count":"1",
          "list|1-2": [
            {
              checked: false,
              commodity: '型号：L 规格：黑色',
              shopimg: 'https://ceshiapi.iweilingdi.com/Uploads/tempimg/2018-05-04/5aebc332a5056.gif',
              des: '德国双立人Style刀具7件套装不锈钢菜刀砍骨刀水果刀厨房家',
              money: '2385.00',
              num: 1
            }
          ]
        }
      ]
    }
  }
}
