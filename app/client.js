import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './config'
import Routes from './routes'
import configure from './store/configureStore'
import { jump, jumpQuery } from 'utils/common'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
window.jump = jump
window.jumpQuery = jumpQuery

const store = configure({ config: global.gconfig })
const App = () => (
  // <MuiThemeProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  // </MuiThemeProvider>
)
ReactDOM.render(
  <App/>,
  document.getElementById('root'),
)