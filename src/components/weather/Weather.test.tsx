import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Weather from './Weather'
import { ForecastData, WeatherData, list, iconImage as getIconImage } from '../../services/forecast.service'
import { segmentsFromForecast } from '../../utils/forecastHelpers'
import { dateFromDatetime } from '../../utils/dateHelpers'
import { averageSegmentTemp } from '../../utils/temperatureHelpers'

let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender'],
  forecasts: ForecastData[],
  segments: ForecastData[],
  forecast: ForecastData,
  weather: WeatherData
const getForecast = (index: number) => forecasts[index]
const getWeather = () => forecast.weather[0]
const handleClick = jest.fn()
beforeEach(async () => {
  const [response] = await list()
  forecasts = response as ForecastData[]
  forecast = getForecast(0)
  segments = segmentsFromForecast(forecast, forecasts)
  weather = getWeather()
  const result = render(
    <Weather
      forecast={forecast}
      segments={segments}
      unit="celsius"
      activeForecastDt={forecast.dt}
      onClick={handleClick}
    />
  )
  ;({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('Weather component', () => {
  test('Should set forecast data', () => {
    const temperature = averageSegmentTemp(segments, 'celsius')
    const iconImage = getIconImage(weather.icon)
    const date = dateFromDatetime(forecast.dt_txt)
    expect(screen.getByText(temperature)).toBeVisible()
    expect(screen.getByText(weather.main)).toBeVisible()
    expect(screen.getByText(weather.description)).toBeVisible()
    expect(screen.getByAltText('Current weather icon')).toHaveAttribute('src', iconImage)
    expect(screen.getByText(date)).toBeVisible()
  })

  test('Should covert temperature when change unit', () => {
    rerender(
      <Weather
        forecast={forecast}
        segments={segments}
        unit="fahrenheit"
        activeForecastDt={forecast.dt}
        onClick={handleClick}
      />
    )
    const temp = averageSegmentTemp(segments, 'fahrenheit')
    expect(screen.getByText(new RegExp(temp))).toBeVisible()
  })

  test('Should active forecast based on activeForecastDt', () => {
    const activeColor = 'rgb(245, 245, 245)'
    expect(screen.getByTestId('weatherCard')).toHaveStyle(`background-color: ${activeColor}`)
    const activeForecast = getForecast(1)
    rerender(
      <Weather
        forecast={forecast}
        segments={segments}
        unit="fahrenheit"
        activeForecastDt={activeForecast.dt}
        onClick={handleClick}
      />
    )
    expect(screen.getByTestId('weatherCard')).not.toHaveStyle(`background-color: ${activeColor}`)
  })

  test('Should handle onClick', () => {
    fireEvent.click(screen.getByTestId('weatherCard'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
