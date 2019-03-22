import {
	routerReducer as routing,
} from 'react-router-redux'
import {
	combineReducers,
} from 'redux'

import { loginResponse, RegisterResponse, staffResponse } from './common'
import { globaltrans } from './transition'
import { getCityList } from './components/xmCityPicker'

const rootReducer = combineReducers({
	routing,
	config: (state = {}) => state,
	loginResponse,
	RegisterResponse,
	staffResponse,
	globaltrans,
	getCityList
});

export default rootReducer;
