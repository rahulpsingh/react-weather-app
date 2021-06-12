import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Carousel, { CarouselNavigator, NavigateButton } from './Carousel'
import { ForecastData, list } from '../../services/forecast.service'
import { segmentsFromForecast } from '../../utils/forecastHelpers'

const handleNavigate = jest.fn()
const handleSelect = jest.fn()

describe('Carousel component', () => {
  let unmount: RenderResult['unmount'],
    forecasts: ForecastData[],
    segments: ForecastData[],
    forecast: ForecastData
  beforeEach(async () => {
    const [response] = await list()
    forecasts = response as ForecastData[]
    forecast = forecasts[0]
    segments = segmentsFromForecast(forecast, forecasts)
    const result = render(
      <Carousel
        forecasts={forecasts}
        segments={segments}
        unit="celsius"
        navigators={['next', 'previous']}
        activeForecastDt={forecast.dt}
        onNavigate={handleNavigate}
        onSelect={handleSelect}
      />
    );
    ({ unmount } = result)
  })
  afterEach(() => unmount())

  test('Should show weather cards', () => {
    expect(screen.getAllByTestId('weatherCard')).toHaveLength(forecasts.length)
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    fireEvent.click(screen.getByTestId('buttonPrevious'))
    expect(handleNavigate).toHaveBeenCalledTimes(2)
  })

  test('Should handle onSelect', () => {
    fireEvent.click(screen.getAllByTestId('weatherCard')[0])
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })
})

describe('CarouselNavigator component', () => {
  let unmount: RenderResult['unmount'],
    rerender: RenderResult['rerender']
  beforeEach(() => {
    const result = render(<CarouselNavigator navigators={['next', 'previous']} onNavigate={handleNavigate} />)
    ;({ rerender, unmount } = result)
  })
  afterEach(() => unmount())

  test('Should set navigators', () => {
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
    rerender(<CarouselNavigator navigators={['next']} onNavigate={handleNavigate} />)
    expect(screen.getByTestId('buttonNext')).toBeVisible()
    expect(screen.queryByTestId('buttonPrevious')).toBeNull()
    rerender(<CarouselNavigator navigators={['previous']} onNavigate={handleNavigate} />)
    expect(screen.queryByTestId('buttonNext')).toBeNull()
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    fireEvent.click(screen.getByTestId('buttonPrevious'))
    expect(handleNavigate).toBeCalledTimes(2)
  })
})

describe('NavigateButton component', () => {
  let unmount: RenderResult['unmount'],
    rerender: RenderResult['rerender']
  beforeEach(() => {
    const result = render(<NavigateButton direction="next" onNavigate={handleNavigate} />);
    ({ rerender, unmount } = result)
  })
  afterEach(() => unmount())

  test('Should set direction', () => {
    expect(screen.getByTestId('buttonNext')).toBeVisible()
    rerender(<NavigateButton direction="previous" onNavigate={handleNavigate} />)
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    expect(handleNavigate).toBeCalledTimes(1)
  })
})
