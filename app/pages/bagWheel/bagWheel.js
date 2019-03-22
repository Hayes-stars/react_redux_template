/*
 * @Title: 大转盘
 * @Author: shuzhi 
 * @Date: 2018-12-06 11:05:40 
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-26 18:47:52
 */

import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'
import {
    push,
    goBack
} from 'react-router-redux'
import { CommonHeader, XmCityPicker } from 'components'
import {
    Toast,
    Modal,
    NoticeBar
} from 'antd-mobile'
import bagWheelStyle from 'style/bagWheel/bagWheel.less'
import { fetchUserChance, fetchLuckDraw, fetchLuckAddress, fetchReceiveAwards, fetchMyPrize, fetchPrizeRanking, fetchShareCount, fetchSpecialCount, fetchJudgeUnion } from 'actions/activity/index'
import icon_jp00 from 'images/activity/BagWheel/icon_wu1.png'
import icon_jp01 from 'images/activity/BagWheel/icon_jp01.png'
import icon_jp02 from 'images/activity/BagWheel/icon_jp02.png'
import icon_jp03 from 'images/activity/BagWheel/icon_jp03.png'
import icon_jp04 from 'images/activity/BagWheel/icon_jp04.png'
import icon_wu from 'images/activity/BagWheel/icon_wu.png'
import icon_bt_ljlq11 from 'images/activity/BagWheel/icon_bt_ljlq11.png'
import icon_bt_ljlq22 from 'images/activity/BagWheel/icon_bt_ljlq22.png'
import hd_icon_wc from 'images/activity/BagWheel/hd_icon_wc.png'
import shareImg from 'images/activity/BagWheel/icon_dzp_jp.png'
import { evokeShareJs } from 'utils/wxshare'
import { evokeAppshare } from 'utils/appshare.js'
import { LoginRegist, exhibitionHomePage, getOS } from 'utils/public'


@connect((state, props) => ({
    config: state.config,
}), null, null, {
    withRef: true
})

export default class BagWheel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GID: localStorage.GID,
            wheelGoods: [{
                    id: 0,
                    name: '蜜购'
                },
                {
                    id: 1,
                    name: '蜜购'
                },
                {
                    id: 2,
                    name: '蜜购'
                },
                {
                    id: 3,
                    name: '蜜购'
                },
                {
                    id: 4,
                    name: '蜜购'
                },
                {
                    id: 5,
                    name: '蜜购'
                },
                {
                    id: 6,
                    name: '蜜购'
                },
                {
                    id: 7,
                    name: '蜜购'
                },
            ], //大转盘物品列表
            unionCardShow: false, //联盟卡资格弹框 
            getPrizeShow: false, // 抽奖弹框
            getDrawShow: false, // 领取奖品弹框
            prizeListShow: false, // 奖品列表弹窗
            addressShow: false, // 地址弹框 
            btnEnable: true, //防止用户频繁点击
            phoneValue:'',
            consignee:'',
            particular:'',
            citys:[],
            clickFlag:false,// 地址确定按钮
            cProvincename:'',
            cProvince:'',
            cCityname:'',
            cCity:'',
            cDistrictname:'',
            cDistrict:'',
            extra:'',
            userData: null,
            nickname: '', // 用户昵称
            chance: 0, // 抽奖次数
            prize_id: 0, // 奖品ID
            redPaket: 0, // 红包
            prizeRanking: '', // 获奖名单
            myPrizeList: [], // 我的奖品列表
            renewAddress: 1, // 地址修改能否
            filterData: [], // 我的奖品没领取
            reverseFlag: 1, // 1 抽奖直接领取 2 我的奖品列表里领取
        }
    }

    componentDidMount() {
        if (this.state.GID) {
            this.fetchJudgeUnion()
        }
        this.fetchPrizeRanking()
        evokeShareJs({
            title: '蜜购邀请您免费领联盟卡会员，抽iPhone X实物豪礼！',
            desc: '尊享联盟会员，来就有奖，iPhoneX、小米手环，小蜜公仔，红包等你来抽。',
            link: window.location.href,
            imgUrl: 'https://img.weilingdi.com/upload/Other/bd33f3f3e211414e89db92d6187a7976.png',
            success: this.onShareSuccess
        }, this, window.location.href)
    }

//       // props改变生命周期
//   componentWillReceiveProps(nextProps){
//     // let bodyEl = document.body
//     // let top = 0
//     // if (nextProps.visible) {
//     //   // top = window.scrollY
  
//     //   bodyEl.style.position = 'fixed'
//     //   // bodyEl.style.top = -top + 'px'
//     // } else {
//     //   bodyEl.style.position = ''
//     //   // bodyEl.style.top = ''
  
//     //   // window.scrollTo(0, top) // 回到原先的top
//     // }
//     console.log('Receive')
//   }

    // 判断登录用户是否是联盟用户
    fetchJudgeUnion = () => {
        this.props.dispatch(fetchJudgeUnion({}, (res) => {
            // 是联盟卡用户才能参与活动
            if (res.data.data !== '1') {
                this.setState({
                    unionCardShow: true
                })
            } else {
                this.fetchUserChance()
            }
        }))
    }
 
    // 获取用户信息和抽奖机会
    fetchUserChance = () => {
        this.props.dispatch(fetchUserChance({}, (res) => {
            // this.fetchJudgeUnion()
            this.setState({
                nickname: res.data.data.c_nickname,
                chance: Number(res.data.data.chance)
            })
        }))
    }

    // 中奖及旋转角度
    prizeToDeg = (id) => {
        const newObj = {
            38657: [2, 4, 7][Math.round(Math.random()*2)],
            38658: 5,
            38659: 8,
            38660: [1, 6][Math.round(Math.random())],
            38661: 3,
        };

        return newObj[id] ? (newObj[id] * 45-22.5) : id;
    }

    // 中奖对象展示
    prizeToObj = (id, redPaket) => {
        const newObj = {
            38657: {img:icon_jp04, value: `获得现金红包${redPaket}元`, text: '恭喜您！'},
            38658: {img:icon_jp01, value: '获得iphone X 64G一个', text: '恭喜您！'},
            38659: {img:icon_jp02, value: '获得小米手环一个', text: '恭喜您！'},
            38660: {img:icon_jp03, value: '获得小蜜公仔一个', text: '恭喜您！'},
            38661: {img:icon_jp00, value: '再接再厉！', text: '没有获得奖品'},
        };

        return newObj[id] ? newObj[id] : id;
    }

    // 抽奖
    getPrize = () => {
        if (!this.state.GID) {
            // 跳登录
            LoginRegist(this)
            return;
        }
        // if (this.state.chance === 0) {
        //     Toast.info('今日机会已用完', 2)
        // } else {
            // clearTimeout(this.timer);
            //禁止用户连续点击
            if (this.state.btnEnable) {
                this.setState({
                    btnEnable: false
                })
                this.props.dispatch(fetchLuckDraw({}, (res) => {
                    this.fetchUserChance()
                    this.setState({
                        prize_id: res.data.data.c_id,
                        redPaket: res.data.data.c_value,
                        reverseFlag: 1
                    })
                    // 旋转
                    this.animation(this.prizeToDeg(res.data.data.c_id));
                    setTimeout(() => {
                        // 抽奖
                        this.setState({
                            getPrizeShow:true,
                            btnEnable: true
                            // chance: this.state.chance - 1
                        })
                        
                    }, 6000);
                }, (err) =>{
                    Toast.info(err.data.msg, 2)
                    this.setState({
                        btnEnable: true
                    })
                }))
            }
            // this.timer = setTimeout(() => {
            //     this.setState({
            //         btnEnable: true
            //     })
            // }, 3000);
        // }  
    }

    //获取到奖品后执行动画
    animation = (circle)=>{
        let wheel_btn = this.refs.wheel_btn,initDeg=0;  
        if(wheel_btn.style.transform)initDeg = wheel_btn.style.transform.replace(/[^\d\.]/g,"")*1 // 保留数字及小数点
        console.log('circle', circle)
        console.log('initdeg', initDeg-initDeg%360)
        // 缓冲为6圈
        wheel_btn.style.transform = `rotate(${3600+circle+initDeg-initDeg%360}deg)`

    }
    //需留首尾两位，中间字符串由*星号替换
    parseStringToStar = (str) => {
        console.log('str', str.substr(0, 1), new Array(2).join('*'), str.substr(-1))
        return str.length > 2 ? str.substr(0, 1) + new Array(str.length - 1).join('*') + str.substr(-1) : str
    }

    // 获奖名单展示
    fetchPrizeRanking = () => {
        this.props.dispatch(fetchPrizeRanking({}, (res) => {
            this.setState({
                prizeRanking: res.data.data
            })
        }))
    }

    // 领取联盟卡
    getUnionCard = () => {
        this.setState({
            unionCardShow: false
        })
        const phone = JSON.parse(localStorage.RetUserInfo).cphone;
        window.location.href = `${this.props.config.GetHost}/me/unioncardregister?phone=${phone}`
    }

    // 我的奖品列表
    fetchMyPrize = () => {
        this.props.dispatch(fetchMyPrize({}, (res) => {
            this.setState({
                myPrizeList: res.data.data,
                prizeListShow: true,
                reverseFlag: 2
            })
            const filterData = res.data.data.filter((item, index) =>{
                return item.c_state === 0
            })
            console.log('filterData', filterData)
            this.setState({
                filterData
            })
            if (filterData.length !== 0) {
                this.setState({
                    prize_id: filterData[0].c_pid
                })
            } else {
                // Toast.info("奖品已领取，请不要重新领取", 2)
            }
        }))
    }

    // 获取用户地址
    fetchLuckAddress = () => {
        this.props.dispatch(fetchLuckAddress({}, (res) => {
            this.setState({
                citys: [[res.data.data.c_provincename, res.data.data.c_province],[res.data.data.c_cityname, res.data.data.c_city],[res.data.data.c_districtname, res.data.data.c_district]],
                extra: !res.data.data.c_provincename && !res.data.data.c_cityname && !res.data.data.c_districtname ? '' : (res.data.data.c_provincename+','+res.data.data.c_cityname+','+res.data.data.c_districtname),
                consignee: res.data.data.name,
                phoneValue: res.data.data.phone,
                particular: res.data.data.address,
                renewAddress: res.data.data.c_type,
                addressShow:true,
                prizeListShow: false
            }, () => {
                if ((this.state.extra && this.state.consignee && this.state.phoneValue && this.state.particular) || this.state.renewAddress === 2) {
                    this.setState({
                        clickFlag: true
                    })
                }                
            })
        }))
    }

    // 领奖
    fetchReceiveAwards = () => {
        this.props.dispatch(fetchReceiveAwards({
            prizeid: this.state.prize_id,
            name: this.state.consignee,
            phone: this.state.phoneValue,
            site: this.state.extra,
            address: this.state.particular
        }, (res) => {
            this.setState({
                getDrawShow: true,
                addressShow: false,
                getPrizeShow: false,
            })
        }))
    }

    //所在地区
    city(e){
        console.log(e);
        this.setState({
            citys:e,
            cProvincename:e[0][0],
            cProvince:e[0][1],
            cCityname:e[1][0],
            cCity:e[1][1],
            cDistrictname:e[2][0],
            cDistrict:e[2][1],
            extra: e[0][0] + ',' + e[1][0] + ',' + e[2][0]
        })
        
        if(this.state.phoneValue != ''&& this.state.consignee != ''&&this.state.particular != '' && e.length>0){
            this.setState({
                clickFlag:true
            })
        }else{
            this.setState({
                clickFlag:false
            })
        }
    }
    //电话认证
    phones = (e) => {
        if(e.target.value.length<=11){
            this.setState({
                phoneValue:e.target.value
            })
            if(e.target.value != ''&& this.state.consignee != ''&&this.state.particular != ''&&this.state.extra !== ''){
                this.setState({
                    clickFlag:true
                })
            }else{
                this.setState({
                    clickFlag:false
                })
            }
        }
        
    }
    //收货人
    consignee = (e) =>{
        console.log(e.target.value)
        this.setState({
            consignee:e.target.value
        })
        if(this.state.phoneValue != ''&& e.target.value != ''&&this.state.particular != ''&&this.state.extra !== ''){
            console.log(0)
            this.setState({
                clickFlag:true
            })
        }else{
            this.setState({
                clickFlag:false
            })
        }
    }
    //所在地区认证
    particular = (e) => {
        this.setState({
            particular:e.target.value
        })
        if(this.state.phoneValue != ''&& this.state.consignee != ''&&e.target.value != ''&&this.state.extra !== ''){
            this.setState({
                clickFlag:true
            })
        }else{
            this.setState({
                clickFlag:false
            })
        }
    }

    // 地址修改提示
    addressConfrim = () => {
        if (this.state.renewAddress === 1) {
            const alert = Modal.alert;
            alert('提示', '地址保存后将无法再修改', [
                {
                    text: '再想想',
                    onPress: () => {}
                },
                {
                    text: '确定',
                    onPress: () => this.fetchReceiveAwards()
                    // Toast.info('取消售后成功', 1)
                },
            ])
        } else {
            this.fetchReceiveAwards()
        }
		
    }

    // 我的奖品列表领取
    prizeAddressConfrim = () => {
        if (this.state.reverseFlag === 2 && this.state.filterData.length === 0) {
            Toast.info("奖品已领取，请不要重复领取", 2)
        } else {
            this.addressConfrim()
        }
    }

    // 分享
    shareClick = () => {
		console.log('agd')
        // 原生app分享
		const sharedata = {}
		sharedata.imgUrl = 'https://img.weilingdi.com/upload/Other/bd33f3f3e211414e89db92d6187a7976.png'
		sharedata.lineLink = window.location.href
		sharedata.shareTitle = '蜜购邀请您免费领联盟卡会员，抽iPhone X实物豪礼！'
		sharedata.descContent = '尊享联盟会员，来就有奖，iPhoneX、小米手环，小蜜公仔，红包等你来抽。'
		evokeAppshare(sharedata)
        if (getOS()) {
            setTimeout(() => {
                this.onShareSuccess()
            }, 2000);
            
        }

        evokeShareJs({
            title: '蜜购邀请您免费领联盟卡会员，抽iPhone X实物豪礼！',
            desc: '尊享联盟会员，来就有奖，iPhoneX、小米手环，小蜜公仔，红包等你来抽。',
            link: window.location.href,
            imgUrl: 'https://img.weilingdi.com/upload/Other/bd33f3f3e211414e89db92d6187a7976.png',
            success: this.onShareSuccess
        }, this, window.location.href)
        
		// share_set()
        // this.onShareSuccess() 
	}

    // 分享增加机会
    onShareSuccess = () => {
        //分享成功增加抽奖机会
        this.props.dispatch(fetchShareCount({}, (res) => {
            Toast.info('获得1次抽奖机会', 2)
            // 重新获取用户抽奖次数
            this.fetchUserChance()
        }))
    }

    handleFocus = () => {
        window.scrollTo(0, 5)
        // document.body.style.position = 'fixed'
        // document.body.style.height = document.documentElement.clientHeight + 'px'
    }

    handleBlur = () => {
        window.scrollTo(0, 0)
        // document.body.style.position = ''
        // document.body.style.height = ''
    }

    render() {
        const { 
            unionCardShow, 
            getPrizeShow, 
            getDrawShow, 
            prizeListShow, 
            addressShow, 
            clickFlag, 
            nickname, 
            chance, 
            prize_id, 
            redPaket, 
            prizeRanking, 
            myPrizeList,
            renewAddress
        } = this.state
        return ( 
            <div className={bagWheelStyle["main"]}>
                <CommonHeader
                    pageTitle={'尊享联盟会员，抽iPhone X豪礼'}
                />
                <div id="BagWheel" className={bagWheelStyle["BagWheel"]}>
                    {
                        nickname ?
                        <div className={bagWheelStyle["wheel_title"]}>
                            <img src="../../images/activity/BagWheel/icon_hg.png" alt=""/>
                            <p>欢迎您，联盟卡会员{nickname}</p>
                        </div>
                        :null
                    }
                    
                    
                    <div className={bagWheelStyle["wheel_box"]}>
                        {/*转盘闪环*/}
                        <div className={bagWheelStyle["wheel-loop"]}></div>
                        {/*转盘物品*/}
                        <div className={bagWheelStyle["wheel-goods_box"]}></div>
                        {/*转盘按钮*/}
                        <div className={`${bagWheelStyle["wheel-btn_box"]} ${bagWheelStyle["flex-center"]}`}>
                            <div className={`${bagWheelStyle["btn"]} ${bagWheelStyle["wheel_btn"]}`} ref="wheel_btn"  onClick={this.getPrize}></div>
                        </div>
                    </div>
                    <div className={bagWheelStyle["myPrize"]} onClick={() => this.fetchMyPrize()}>
                        <img src="../../images/activity/BagWheel/icon_wdjp.png" alt=""/>
                        <p>我的奖品</p>
                    </div>
                    <div className={bagWheelStyle["myUnionCard"]} onClick={() => window.location.href = `${this.props.config.GetHost}/me/unioncardindex`}>
                        <img src="../../images/activity/BagWheel/icon_wdjp.png" alt=""/>
                        <p>我的联盟卡</p>
                    </div>
                    <p className={bagWheelStyle["wheel_num"]}>今日剩余 <span>{chance}</span> 次</p>

                    
                </div>
                <div className={bagWheelStyle["main-box"]}>
                    <div className={bagWheelStyle["main-box-title"]}>
                        <div className={bagWheelStyle["main-box-title-shop"]} onClick={() =>exhibitionHomePage(this)}></div>
                        
                        <div className={bagWheelStyle["main-box-title-share"]} onClick={this.shareClick}></div>
                        
                    </div>
                    <div className={bagWheelStyle["main-box-prize"]}>
                        <p className={bagWheelStyle["main-box-prize-t"]}></p>
                        <ul>
                            <li>
                                <img src={icon_jp01} alt=""/>
                                <p>iPhone X</p>
                            </li>
                            <li>
                                <img src={icon_jp02} alt=""/>
                                <p>小米手环</p>
                            </li>
                            <li>
                                <img src={icon_jp03} alt=""/>
                                <p>小蜜公仔</p>
                            </li>
                            <li>
                                <img src={icon_jp04} alt=""/>
                                <p>随机红包</p>
                            </li>
                        </ul>
                    </div>
                     
                    <div className={bagWheelStyle["main-box-nameList"]}>
                        <p></p>
                        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        {prizeRanking}{prizeRanking}
                        </NoticeBar>
                        {/* <ul>
                            <li>
                                <span>获奖用户</span>
                                <span>奖品</span>
                            </li>
                            <li>
                                <span>小蜜******2343</span>
                                <span>iPhone X</span>
                            </li>
                            <li>
                                <span>小蜜******2356</span>
                                <span>小米手环</span>
                            </li>
                            <li>
                                <span>小蜜******2343</span>
                                <span>iPhone X</span>
                            </li>
                            <li>
                                <span>小蜜******2356</span>
                                <span>小米手环</span>
                            </li>
                            <li>
                                <span>小蜜******2343</span>
                                <span>iPhone X</span>
                            </li>
                            <li>
                                <span>小蜜******2356</span>
                                <span>小米手环</span>
                            </li>
                        </ul> */}
                    </div>
                    <div className={bagWheelStyle["main-box-text"]}>
                        <p className={bagWheelStyle["main-box-text-title"]}>活动说明</p>
                        <p className={bagWheelStyle["main-box-text-con"]}>
                        <b>1.活动时间</b><br/>
                        12月27日上午10:00-1月14日上午10:00；<br/>
                        <b>2.活动内容</b><br/>
                        2.1活动期间，已领取联盟卡会员权益的用户，每日可在活动页面抽奖，非联盟卡用户无法参与；<br/>
                        2.2单日最多抽奖三次，第一次抽奖系统赠送，后续2次可通过特卖购物和分享好友后获得；<br/>
                        2.3首次参加活动系统将赠送三次抽奖机会；<br/>
                        2.4每日24:00刷新每日抽奖机会；<br/>
                        <b>3.奖品</b><br/>
                        iphone X 64G 、小米手环、小蜜公仔以及随机红包；<br/>
                        <b>4.活动须知</b><br/>
                        4.1严禁使用第三方软件或工具作弊，一经发现，将取消获奖资格，并保持追究法律责任的权利；<br/>
                        4.2收奖地址填写后无法修改，请明确后再填写；<br/>
                        4.3实物活动奖励将在活动结束后，1周内统一发送，请耐心等待；<br/>
                        4.4本次活动微领地网络拥有最终解释权；<br/>
                        4.5本次活动与Apple Inc.无关。<br/>
                        </p>
                    </div>
                    <p className={bagWheelStyle["main-box-tip"]}>本次活动与Apple Inc.无关</p>
                </div>
                {/* 联盟卡资格弹框 */}
                <Modal
                    className={bagWheelStyle['unionCard-modal-con']}
                    visible={unionCardShow}
                    transparent
                    maskClosable={false}
                    // onClose={() => this.setState({ unionCardShow:false })}
                    // closable={true}
                >
                    <div className={bagWheelStyle['unionCard-box']}>
                        <p>领取联盟卡才能参加活动哦！</p>
                        <div onClick={this.getUnionCard}></div>
                    </div>
                </Modal>

                {/* 抽奖弹框 */}
                <Modal
                    className={bagWheelStyle['unionCard-modal-con']}
                    visible={getPrizeShow}
                    transparent
                    maskClosable={false}
                    // onClose={() => this.setState({ unionCardShow:false })}
                    // closable={true}
                >
                    <div className={bagWheelStyle['prize-box']}>
                        <img src={this.prizeToObj(prize_id, redPaket).img} alt=""/>
                        <p>{this.prizeToObj(prize_id, redPaket).text}<br/>{this.prizeToObj(prize_id, redPaket).value}</p>

                        {/* 实物领取 */}
                        {
                            (prize_id === 38658 || prize_id === 38659 ||  prize_id ===38660) && <div onClick={() => this.fetchLuckAddress()}></div>
                        }
                                                                                                                                                           
                        {/* 红包领取 */}
                        {
                            prize_id === 38657 && <div onClick={() => this.setState({ getPrizeShow: false, getDrawShow: true })}></div>
                        }

                        {/* 没中奖再接再厉 */}
                        {
                            prize_id === 38661 && <div onClick={() => this.setState({ getPrizeShow: false })}></div>
                        }
                        
                    </div>
                </Modal>

                {/* 领取成功弹框 */}
                <Modal
                    className={bagWheelStyle['getDraw-modal-con']}
                    visible={getDrawShow}
                    transparent
                    maskClosable={true}
                    onClose={() => this.setState({ getDrawShow:false })}
                    closable={true}
                >
                    <div className={bagWheelStyle['getDraw-box']}>
                        <img src={hd_icon_wc} alt=""/>
                        <p>领取成功</p>
                    </div>
                </Modal>

                {/* 奖品弹框 */}
                <Modal
                    className={bagWheelStyle['unionCard-modal-con']}
                    visible={prizeListShow}
                    transparent
                    maskClosable={false}
                    onClose={() => this.setState({ prizeListShow:false })}
                    closable={true}
                >
                {
                    myPrizeList.length !== 0 ?
                    <div className={bagWheelStyle['prize-list-box1']}>
                        <p className={bagWheelStyle['prize-list-title']}>— 我的奖品 —</p>
                        <ul>
                            {
                                myPrizeList.map((item, index) => {
                                    return (
                                        <li>
                                            <img src={item.c_imgpath} alt=""/>
                                            
                                            {
                                                item.c_pid === 38657 ?
                                                <p>{`${item.c_value}元`}</p>
                                                :
                                                <p>{item.c_name}</p>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            this.state.reverseFlag === 2 && this.state.filterData.length === 0 ?
                            null
                            :
                            <p className={bagWheelStyle['prize-list-btn']} onClick={() => this.fetchLuckAddress()}>我的领奖地址</p>
                        }
                        
                    </div>
                    :
                    <div className={bagWheelStyle['prize-list-box']}>
                        <p className={bagWheelStyle['prize-list-title']}>— 我的奖品 —</p>
                        <img src={icon_wu} alt=""/>
                        <p className={bagWheelStyle['prize-list-tip']}>暂无收获，继续加油！</p>
                    </div>
                } 
                </Modal>

                {/* 地址弹框 */}
                <Modal
                    className={bagWheelStyle['unionCard-modal-con']}
                    visible={addressShow}
                    transparent
                    maskClosable={false}
                    onClose={() => this.setState({ addressShow:false })}
                    closable={true}
                >
                    <div className={bagWheelStyle['address-box']}>
                        <p className={bagWheelStyle['address-title']}>我的领奖地址</p>
                        <div className={bagWheelStyle['address-con']}>
                            <div className={bagWheelStyle["item"]}>
                                <div>收货人</div>
                                <input 
                                type="text" 
                                disabled={renewAddress === '2'} 
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur} 
                                placeholder="填写收货人姓名" 
                                value={this.state.consignee} 
                                onChange ={this.consignee}/>
                            </div>
                            <div className={bagWheelStyle["item"]}>
                                <div>联系电话</div>
                                <input 
                                type="number" 
                                disabled={renewAddress === '2'} 
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}  
                                placeholder="填写收货人电话" 
                                value={this.state.phoneValue} 
                                onChange ={this.phones}/>
                            </div>
                            

                            <XmCityPicker
                                citys={this.state.citys}
                                extra={this.state.extra}
                                disabled={renewAddress === '2'}
                                handleOk={(a)=>this.city(a)}
                            />

                            <div className={bagWheelStyle["item-particular"]}>
                                <div>详细地址</div>
                                <textarea 
                                rows="3" 
                                cols="20" 
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}  
                                disabled={renewAddress === '2'} 
                                placeholder="请输入详细地址信息,如道路、门牌号、小区、楼栋号、单元等"  
                                value={this.state.particular} 
                                onChange ={this.particular}/>
                            </div>
                            
                            <img className={bagWheelStyle["item-btn"]} src={clickFlag ? icon_bt_ljlq22 : icon_bt_ljlq11} onClick={clickFlag ? this.addressConfrim : null} alt=""/>
                            
                            
                        </div>
                    </div>
                </Modal>
            </div>
                
            
        )
    }
}