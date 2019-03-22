import {
    createAction,
} from 'redux-actions'
import {
    getCity,
} from 'api'

import {
    createAjaxAction
} from 'utils'


export const requestGList = createAction('request goodsList'); //前置action
export const recevieGList = createAction('receive goodsList'); //结果处理action
export const fetchGetCity = createAjaxAction(getCity.getCity, requestGList, recevieGList)
