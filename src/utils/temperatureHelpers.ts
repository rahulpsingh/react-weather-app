import { round } from 'lodash'
import { Unit } from '../components/forecast/forcastSlice'
import { ForecastData } from '../services/forecast.service'

export const fahrenheitToCelsius = (fahrenheit: number) => {
  return (fahrenheit - 32) * (5 / 9)
}

export const convertToUnit = (temperature: number, unit: Unit) => {
  const converted = unit === 'fahrenheit' ? temperature : fahrenheitToCelsius(temperature)
  return round(converted)
}

export const withUnit = (temperature: number, unit: Unit) => {
  const symbols: Record<Unit, string> = {
    fahrenheit: '℉',
    celsius: '℃'
  }
  return `${temperature} ${symbols[unit]}`
}

export const averageForecastTemp = (forecast: ForecastData, unit: Unit) => {
  const { temp_min: tempMin, temp_max: tempMax } = forecast.main
  const average = (tempMin + tempMax) / 2
  return convertToUnit(average, unit)
}

export const averageSegmentTemp = (segments: ForecastData[], unit: Unit) => {
  const totalTemp = segments.reduce((temp, segment) => {
    return temp + averageForecastTemp(segment, unit)
  }, 0)
  const averageTemp = round(totalTemp / segments.length)
  return withUnit(averageTemp, unit)
}
