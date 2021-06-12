import { combineReducers, createStore } from 'redux'
import { reducers as app } from '../features/app/appSlice'
import { reducers as alert } from '../components/alert/alertSlice'
import { reducers as forecast } from '../components/forecast/forcastSlice'

const reducers = combineReducers({
  app,
  alert,
  forecast
})

export default createStore(reducers)
