import { ajax } from 'utils'

// 查询用户信息和抽奖机会
export const userChance = ajax.fetchJSONByPost('/go.php/Leagueact/userChance','','php')

// 抽奖
export const luckDraw = ajax.fetchJSONByPost('/go.php/Leagueact/luckDraw','','php')

// 获取用户地址
export const luckAddress = ajax.fetchJSONByPost('/go.php/Leagueact/Address','','php')

// 领奖
export const receiveAwards = ajax.fetchJSONByPost('/go.php/Leagueact/receiveAwards','','php')

// 查询我的奖品
export const myPrize = ajax.fetchJSONByPost('/go.php/Leagueact/myPrize','','php')

// 获奖排行榜
export const prizeRanking = ajax.fetchJSONByPost('/go.php/Leagueact/prizeRanking','','php')

// 分享增加机会
export const shareCount = ajax.fetchJSONByPost('/go.php/Leagueact/share','','php')

// 特卖订单增加机会
export const specialCount = ajax.fetchJSONByPost('/go.php/Leagueact/special','','php')

// 判断登录用户是否是联盟用户
export const judgeUnion = ajax.fetchJSONByPost('/go.php/Union/judgeUnion','','php')