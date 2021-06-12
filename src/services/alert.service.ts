import store from '../app/store'

const pushAlertMessage = (message: string) => {
  store.dispatch({ type: 'PUSH_ALERT_MESSAGE', message })
}

const clearAlertMessage = () => {
  store.dispatch({ type: 'CLEAR_ALERT_MESSAGE' })
}

export { pushAlertMessage, clearAlertMessage }
