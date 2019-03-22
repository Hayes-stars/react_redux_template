/* 404页面
 * @Author: Unknown
 * @Date: Unknown
 * @Last Modified by: cellerchan
 * @Last Modified time: 2018-07-24 10:04:34
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from 'style/auth.less'

@connect((state, props) => ({
  config: state.config
}))

class NotFound extends Component {

  constructor(props, context) {
		super(props)
		this.state = {}
	}

  render() {
    return (
			<div className={styles['not-found-container']}
				style={{
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				}}
			>
				<div className={styles['inner-box']}>
					<img src="./../../images/common/not_found.png" />
					<div className={styles['not-found-text']}>
						呆小蜜和萌小蜜带着网页宝宝搭乘404航班去寻找诗和远方了
					</div>
				</div>
      </div>
    )
  }
}

export default NotFound