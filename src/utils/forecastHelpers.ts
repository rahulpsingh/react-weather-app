import { ForecastData } from '../services/forecast.service'

export const segmentsFromForecast = (activeForecast: ForecastData, forecasts: ForecastData[]) => {
  return forecasts.filter((forecast) => forecast.date === activeForecast.date)
}

export const segmentsFromForecasts = (activeForecasts: ForecastData[], forecasts: ForecastData[]) => {
  const activeDates = activeForecasts.map((forecast) => forecast.date)
  return forecasts.filter((forecast) => activeDates.includes(forecast.date))
}
