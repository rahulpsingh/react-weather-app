import { Theme } from '@material-ui/core'
import { ForecastData } from './forecast.service'
import { Unit } from '../components/forecast/forcastSlice'
import { timeFromDatetime } from '../utils/dateHelpers'
import { averageForecastTemp } from '../utils/temperatureHelpers'

export interface WeatherChartConfig {
  segments: ForecastData[]
  unit: Unit
  theme: Theme
}

export const getWeatherChartConfig = ({ segments, unit, theme }: WeatherChartConfig) => {
  const chartData = segments.map((segement) => ({
    time: timeFromDatetime(segement.dt_txt),
    value: averageForecastTemp(segement, unit)
  }))

  const data = {
    data: chartData,
    color: theme.palette.secondary.main,
    sufix: unit
  }
  return { ...data }
}
