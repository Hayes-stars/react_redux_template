/* 底部Tab栏组件
 * @Author: cellerchan
 * @Date: 2018-05-29 20:55:19
 * @Last Modified by: cellerchan
 * @Last Modified time: 2018-07-11 14:18:36
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import img01 from './images/mall_btn_mall_normal@2x.png'
import img01Selected from './images/mall_btn_mall_pressed@2x.png'
import img02 from './images/mall_btn_activity_normal@2x.png'
import img02Selected from './images/mall_btn_activity_pressed@2x.png'
import img03 from './images/mall_btn_orders_normal@2x.png'
import img03Selected from './images/mall_btn_orders_pressed@2x.png'
import styles from './tabbar.less'

const tabList = [
  {
    key: 'shop',
    text: '商城',
    icon: img01,
    selectedIcon: img01Selected,
  },
  {
    key: 'activities',
    text: '活动',
    icon: img02,
    selectedIcon: img02Selected,
  },
  {
    key: 'orders',
    text: '订单',
    icon: img03,
    selectedIcon: img03Selected,
  }
]

@connect((state, props) => ({}), null, null, { withRef: true })

/* 底部TabBar组件
 * @selectedItemText 选中项的文字 String ( '商城' | '活动' | '订单' )
 */
export default class TabBar extends Component {
  constructor(props){
    super(props)
  }
  tabClick = ( pageText ) => {
    const tabLinks = {
      'shop': '/index',
      'activities': '/group',
      'orders': '/orderGanagement'
    }
    this.props.dispatch(push(tabLinks[pageText]))
  }
  render() {
    return (
      <div className={styles['tab-bar-container']}>
        {
          tabList.map((item,index)=>{
            return (
              <div
                key={index}
                className={styles['tab-bar-tab']}
                onClick={()=>this.tabClick(item.key)}
              >
                <div className={styles['tab-icon']}>
                  <img src={
                    this.props.selectedItemText == item.text ?
                      item.selectedIcon
                    :
                      item.icon
                    }
                  />
                </div>
                <div className={styles['tab-text']}>
                  {item.text}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
