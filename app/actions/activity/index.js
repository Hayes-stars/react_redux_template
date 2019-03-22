import {
    createAction,
} from 'redux-actions'
import {
    activity,
} from 'api'

import {
    createAjaxAction
} from 'utils'

// 查询用户信息和抽奖机会
export const requestuserChance = createAction('request userChance'); //前置action
export const recevieuserChance = createAction('receive userChance'); //结果处理action
export const fetchUserChance = createAjaxAction(activity.userChance, requestuserChance, recevieuserChance)

// 抽奖
export const requestluckDraw = createAction('request luckDraw'); //前置action
export const recevieluckDraw = createAction('receive luckDraw'); //结果处理action
export const fetchLuckDraw = createAjaxAction(activity.luckDraw, requestluckDraw, recevieluckDraw)

// 获取用户地址
export const requestluckAddress = createAction('request luckAddress'); //前置action
export const recevieluckAddress = createAction('receive luckAddress'); //结果处理action
export const fetchLuckAddress = createAjaxAction(activity.luckAddress, requestluckAddress, recevieluckAddress)

// 领奖
export const requestreceiveAwards = createAction('request receiveAwards'); //前置action
export const receviereceiveAwards = createAction('receive receiveAwards'); //结果处理action
export const fetchReceiveAwards = createAjaxAction(activity.receiveAwards, requestreceiveAwards, receviereceiveAwards)

// 查询我的奖品
export const requestmyPrize = createAction('request myPrize'); //前置action
export const receviemyPrize = createAction('receive myPrize'); //结果处理action
export const fetchMyPrize = createAjaxAction(activity.myPrize, requestmyPrize, receviemyPrize)

// 获奖排行榜
export const requestprizeRanking = createAction('request prizeRanking'); //前置action
export const recevieprizeRanking = createAction('receive prizeRanking'); //结果处理action
export const fetchPrizeRanking = createAjaxAction(activity.prizeRanking, requestprizeRanking, recevieprizeRanking)

// 分享增加机会
export const requestshareCount = createAction('request shareCount'); //前置action
export const recevieshareCount = createAction('receive shareCount'); //结果处理action
export const fetchShareCount = createAjaxAction(activity.shareCount, requestshareCount, recevieshareCount)

// 特卖订单增加机会
export const requestspecialCount = createAction('request specialCount'); //前置action
export const receviespecialCount = createAction('receive specialCount'); //结果处理action
export const fetchSpecialCount = createAjaxAction(activity.specialCount, requestspecialCount, receviespecialCount)

// 判断登录用户是否是联盟用户
export const requestjudgeUnion = createAction('request judgeUnion'); //前置action
export const receviejudgeUnion = createAction('receive judgeUnion'); //结果处理action
export const fetchJudgeUnion = createAjaxAction(activity.judgeUnion, requestjudgeUnion, receviejudgeUnion)