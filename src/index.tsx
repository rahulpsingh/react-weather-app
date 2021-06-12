import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'resize-observer-polyfill'

import App from './features/app/App'
import reportWebVitals from './reportWebVitals'
import Provider from './components/provider/Provider'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider>
        <App />
      </Provider>
      <CssBaseline />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
