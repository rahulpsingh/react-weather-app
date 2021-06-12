import moment from 'moment'

export const dateFromDatetime = (datetime: string) => {
  return moment(datetime).format('LL')
}

export const timeFromDatetime = (datetime: string) => {
  return moment(datetime).format('LT')
}
