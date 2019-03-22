
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import 'style/base.less'
import 'style/antd-mobile.css';
import axios from 'axios'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import style from 'style/transition.css'
import { prefixPHP } from './../config'
import { TOFIXED } from 'utils/public'
// import fastclick from 'fastclick'

// var wx = require('./../utils/jweixin');


// toFixed 兼容性处理
TOFIXED()

@connect((state, props) => ({
  globaltrans: state.globaltrans
}))
export default class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    // this.state = { hasError: false };
  }

  componentWillReceiveProps(nextProps) {
    // 解决路由切换时 页面无法返回顶部的问题
    if (this.props.location !== nextProps.location) {
      window.scrollTo(0, 0)
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }



  componentWillMount() {
  }

  render() {
    // if (this.state.hasError) {
    //   return null
    //   // 也可以在出错的component处展示出错信息
    //   // return <h1>出错了!</h1>;
    // }
    // const { children } = this.props
    const { animateCls } = this.props.globaltrans
    return (
      //   <div>
      //     {children}
      //   </div>
      <ReactCSSTransitionGroup
        transitionName={animateCls}
        component="div"
        className={style.animateCls}
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        <div key={this.props.location.pathname}
          className={this.props.location.pathname}
          style={{ position: "absolute", width: "100%", minHeight: `${window.innerHeight}px`, background: '#fff' }}>
          {
            this.props.children
          }

        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
