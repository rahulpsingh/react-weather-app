import axios from 'axios'
import { pushAlertMessage } from './alert.service'

export const cancel = () => {
  const source = axios.CancelToken.source()
  source.cancel()
}

export const getData = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    const { response } = error
    const message = response ? response.data.message : error.message
    pushAlertMessage(message)
  }
}
