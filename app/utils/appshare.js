/**
 * @version 4.0.0 APP客户端 交互分享事件
 * @author hehs
 * @Date: 2018-06-03
 * @Last Modified by: shuzhi
 * @Last Modified time: 2018-12-25 12:38:40
 */



import { getOS } from './../utils/public'

 /**
  * 唤起原生分享
  * @param {object} sharedata 分享数据  分享标题，描述，当前分享页面链接，图片
  */
export const evokeAppshare =(sharedata)=> {
  console.log('shareData', sharedata)
  /*获取分享的信息*/
  var apptype = getOS(); //localStorage.getItem('apptype');

  if (!sharedata.shareTitle) {
    sharedata.shareTitle = document.title;
  }
  if (!sharedata.descContent) {
    var meta = document.getElementsByTagName('meta');
    console.log('meta', meta)

    Array.from(meta).forEach((item, index) =>{
      if (typeof item.name != "undefined" && item.name.toLowerCase() == "description") {
        sharedata.descContent = item.content;
      }
    })
    // for (var i = 0; i < meta.length; i++) {
    //     if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
    //         sharedata.descContent = meta[i].content;
    //     }
    // }
  }
  if (!sharedata.imgUrl) {
    sharedata.imgUrl = 'https://m.weilingdi.com/Resource/Common/img/logo.png';
  }
  console.log('lineLink',sharedata.lineLink)
  if (!sharedata.lineLink) {
    sharedata.lineLink = 'https://www.weilingdi.com';
  }
  if (apptype == 1) {
  //   androidShare(sharedata.lineLink,sharedata.imgUrl,sharedata.shareTitle,sharedata.descContent,sharedata.returnurl);
    javaScript:resultData.generalizeShare(sharedata.lineLink,sharedata.imgUrl,sharedata.shareTitle,sharedata.descContent,sharedata.returnurl);
  } else if(apptype == 2) {
  //   iosShare(sharedata.lineLink,sharedata.imgUrl,sharedata.shareTitle,sharedata.descContent,sharedata.returnurl);
    console.log('lineLink',sharedata.lineLink)
    window.webkit.messageHandlers.AppModel.postMessage({"share":{
      "imgsrc":""+sharedata.imgUrl+"",
      "weburl":""+sharedata.lineLink+"",
      "title":""+sharedata.shareTitle+"",
      "desc":""+sharedata.descContent+"",
      "returnurl":""+sharedata.returnurl+""
    }});
  } else if(apptype == 8){
    share_set();
    let appletShareData
    appletShareData = {}
    appletShareData = {
      imgsrc: sharedata.imgUrl,
      shareurl: sharedata.lineLink,
      title: sharedata.shareTitle,
      desc: sharedata.descContent,
    }
    wx.miniProgram.postMessage({data:{sharedata:appletShareData}})  
  } else {
    share_set();
  }
}

/*调用安卓分享*/
export const androidShare =(lineLink,imgUrl,shareTitle,descContent,returnurl)=> {
  // window.AndroidWebView.generalizeShare(lineLink,imgUrl,shareTitle,descContent,returnurl);
  javaScript:resultData.generalizeShare(lineLink,imgUrl,shareTitle,descContent,returnurl);
}
/*ios分享*/
export const iosShare =(lineLink,imgUrl,shareTitle,descContent,returnurl)=> {
  window.webkit.messageHandlers.AppModel.postMessage({"share":{ "imgsrc":""+imgUrl+"", "weburl":""+lineLink+"","title":""+shareTitle+"","desc":""+descContent+"","returnurl":""+returnurl+""}});
}

// h5分享提示
export const share_set =()=> {
  console.log('share_set')
	if ( document.getElementById('mask-container') ) {
		document.body.removeChild(document.getElementById('mask-container'))
	}
	else {
		let container = document.createElement('div')
		container.setAttribute('id', 'mask-container')
		let innerHtml =
		`<div className={styles['com-share-hints-container']} style="width: 100%; height:100%; position: fixed; top:0; left:0; z-index: 999;display:block; overflow: hidden">
			<img src="./../../images/common/share_reminder_wx.png"
				style="width:100%;"
				alt=""
			/>
		</div>`
		container.innerHTML = innerHtml
		document.body.appendChild(container)

		container.addEventListener('click',function(){
			document.body.removeChild(container)
		})
	}
}

// 调用app分享到小程序
export const shareFromApp2MP = ( shareData ) => {
  var apptype = getOS();
  console.log(shareData)
  if (apptype == 1) {
    javaScript:resultData.share2MP(
      JSON.stringify(shareData)
    );
  } else if(apptype == 2) {
    window.webkit.messageHandlers.AppModel.postMessage({
      "share": shareData
    });
  } else {
    console.log('do nothing in web.')
  }
}