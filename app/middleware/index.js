
import { routerMiddleware } from 'react-router-redux'
import logger from './logger'
import router from './router'
//import history from '../history'
import { browserHistory } from 'react-router'

const reduxRouterMiddleware = routerMiddleware(browserHistory)

export {
  reduxRouterMiddleware,
  logger,
  router,
}
