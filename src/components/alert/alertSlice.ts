import { AnyAction } from 'redux'

interface AlertState {
  message: string | null
}

export interface AlertActions {
  pushMessage(message: string): AnyAction
  clearMessage(): AnyAction
}

export interface AlertSelectors extends AlertState {
  isOpen: boolean
}

const alert: AlertState = {
  message: null
}

export const actions: AlertActions = {
  pushMessage (message) {
    return { type: 'PUSH_ALERT_MESSAGE', message }
  },
  clearMessage () {
    return { type: 'CLEAR_ALERT_MESSAGE' }
  }
}

export function reducers (state = alert, action: AnyAction) {
  switch (action.type) {
    case 'PUSH_ALERT_MESSAGE':
      alert.message = action.message
      return { ...alert }
    case 'CLEAR_ALERT_MESSAGE':
      alert.message = null
      return { ...alert }
    default:
      return state
  }
}

export function selectors (state: { alert: AlertState }): AlertSelectors {
  const current = state.alert
  const derived = {
    isOpen: Boolean(state.alert.message)
  }
  return { ...current, ...derived }
}
