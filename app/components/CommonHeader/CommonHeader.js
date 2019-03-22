/*
 * @Author: cellerchan
 * @Date: 2018-05-04 15:58:41
 * @Last Modified by: cellerchan
 * @Last Modified time: 2018-08-25 15:18:55
 */

import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'

import * as publicFunc from './../../utils/public'

import backImg from 'images/common/back.png'

import styleHeader from './commonheader.less'
import {getOSSign} from 'utils/public'
import {currentAnimate} from 'actions/transition'
@connect((state, props) => ({}), null, null, { withRef: true })

/* 公共头部组件
 * @pageTitle 页面标题 String
 * @shopCart 是否显示购物车图标 Boolean
 * @moreActions 是否显示更多操作图标 Boolean
 * @rightAction 自定义文字操作 Object
 * * @icon 操作图标 String ( 可选 'rule' | 'search' | 'refresh' | 'selfDef' )
 * * @text 自定义文字 String ( 可选 )
 * * @handleClick 点击事件处理函数 Function ( 必选 )
 * @headerClass 自定义样式类名 String
 * @backPath 自定义返回函数
 */
class CommonHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      clicked1: 'none',
    }
    // this.isWebView = localStorage.getItem('apptype')   // 获取设备系统信息
    this.isWebView = getOSSign()=='iphone' || getOSSign()=='android'
  }

  routerLeaveInformation() {
    console.log('You have unsaved information, are you sure you want to leave this page?');
  }

  componentWillUnmount() {
    this.props.dispatch(currentAnimate('left'))
  }

  showShareActionSheet = () => {
    Toast.info('分享操作',2)
  }

  componentDidMount(){

    document.title = this.props.pageTitle ? this.props.pageTitle : '小蜜'

  }

  goBack = () => {
    this.props.dispatch(goBack())
    // window.history.back();
    this.props.dispatch(currentAnimate('right'))
  }

  gotoShopCart = () => {
    this.props.dispatch(push('/shopcart'))
  }

  render() {

    let { pageTitle, shopCart, moreActions, rightAction, headerClass, bordered } = this.props
    return (
      // 根据localStorage中是否有apptype判断，如果是WebView中则不显示头部
      !this.isWebView ?
      <div className={styleHeader["com-header-box"]}>
        <div className={`${styleHeader['com-header-container']} ${bordered?styleHeader[`bordered`]:null} ${headerClass}`}>
          <div className={styleHeader["left"]}>
            <div className={`${styleHeader["icon"]} ${styleHeader['back']}`}
              onClick={ this.props.backPath ? this.props.backPath : this.goBack}
            >
              {/* <img src={backImg}/> */}
              <img src="./../../images/common/back.png" />
            </div>
          </div>
          <div className={styleHeader["center"]}>
            <div className={styleHeader["page-title"]}>
              {pageTitle}
            </div>
          </div>
          <div className={styleHeader["right"]}>
            {/* 下单模块 购物车与更多icon */}
            {
              shopCart ?
              <div className={`${styleHeader["icon"]} ${styleHeader['shop-cart']}`} onClick={this.gotoShopCart}>
                <img src="./../images/common/shopcart.png"/>
              </div>
              :null
            }
            {
              moreActions ?
              <div className={`${styleHeader["icon"]} ${styleHeader['actions']}`}  onClick={this.showShareActionSheet}>
                <img src="./../images/common/more.png"/>
              </div>
              :null
            }

            {/* 自定义模块 */}
            {
              rightAction ?
              <div className={`${styleHeader["icon"]} ${styleHeader[`${rightAction.icon?rightAction.icon:''}`]}`}
                onClick={rightAction.handleClick}
              >
                {/* icon */}
                {
                  rightAction.icon &&
                  // 更多
                  rightAction.icon == 'more' ?
                  <img src="./../images/common/more.png"/>
                  :
                  // 刷新
                  rightAction.icon == 'refresh' ?
                  <img src="./../images/common/refresh.png"/>
                  :
                  // 搜索
                  rightAction.icon == 'search' ?
                  <img src="./../images/common/search_btn.png"/>
                  :
                  // 筛选
                  rightAction.icon == 'filter' ?
                  <img src="./../images/common/filter_icon.png"/>
                  :
                  // 规则
                  rightAction.icon == 'rule' ?
                  '?'
                  :null
                }
                {/* 自定义文字 */}
                {
                  rightAction.text ?
                  <span>{rightAction.text}</span>
                  :null
                }
              </div>
              :null
            }
          </div>
        </div>
      </div>
      :null
    );
  }
}

export default CommonHeader