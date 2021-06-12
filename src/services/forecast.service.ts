import { cancel, getData } from './request.service'

const apiUrl = 'https://api.openweathermap.org'
const weatherMapUrl = 'http://openweathermap.org'
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
const location = process.env.REACT_APP_OPENWEATHER_LOCATION

export interface WeatherData {
  main: string
  description: string
  icon: string
}

export interface ForecastData {
  dt: number
  main: {
    'temp_min': number
    'temp_max': number
  }
  weather: WeatherData[]
  'dt_txt': string
  date?: string
}

export type ForecastListCancel = () => void
type ForecastListResult = [ForecastData[] | null, ForecastListCancel]

export const list = async (): Promise<ForecastListResult> => {
  const endpoint = `${apiUrl}/data/2.5/forecast`
  const days = 40
  const url = `${endpoint}?q=${location}&APPID=${apiKey}&cnt=${days}&units=imperial`
  const response = await getData(url)
  const result = response ? response.list : []
  return [result, cancel]
}

export const iconImage = (icon: WeatherData['icon']) => {
  return `${weatherMapUrl}/img/wn/${icon}.png`
}
