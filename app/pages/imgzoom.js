/* 图片放大预览
 * @Author: shuzhi
 * @Date: 2018-05-05 14:26:30
 */

import React, { Component } from 'react'
// import { SingleImgView } from 'react-mobile-imgview'
// import styleZoom from 'style/imgzoom.less'
// import 'react-mobile-imgview/dist/react-mobile-imgview.css'
// import {PhotoSwipe} from 'react-photoswipe';
// import 'react-photoswipe/lib/photoswipe.css';
import Preview from 'react-img-preview'
export default class Imgzoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 所有要进行预览的图片
            // 每一个图片对象，都要包含如下三个属性：{src, w, h}
            // 其中：
            // src 是图片的地址
            // w 是图片预览时候的宽度
            // h 是图片预览时候的高度
            items: [
              {
                src: 'https://placekitten.com/600/400',
                w: 600,
                h: 400
              },
              {
                src: 'https://placekitten.com/1200/900',
                w: 1200,
                h: 900
              }
            ]
        }
	}

    //请求接口
    componentDidMount() {
	}
   	render() {
		return (
            <div>
                <Preview
                    // 【必填】指定 要预览的图片数组
                    imglist={this.state.items}
                    // 【previewBoxStyle 可选】设置 缩略图容器的样式
                    previewBoxStyle={{ border: '1px solid #eee' }}
                    // 【thumbImgStyle 可选】设置 缩略图的样式
                    thumbImgStyle={{ margin: 10, width: 100, height: 100, float: 'left' }}>
                </Preview>
            </div>
			
		)
   }
}
