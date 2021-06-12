import React, { Fragment, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { ForecastData } from '../../services/forecast.service'
import { Unit, ForecastActions, ForecastSelectors, selectors, actions } from './forcastSlice'
import UnitSwitch from '../../components/unitSwitch/UnitSwitch'
import Carousel, { NavigateDirection } from '../../components/carousel/Carousel'
import WeatherChart from '../../components/weatherChart/WeatherChart'

export interface ForecastProps {
  forecasts: ForecastData[]
}

interface ForecastCombinedProps extends ForecastProps, ForecastSelectors, ForecastActions {}

function Forecast ({
  forecasts,
  activeForecast,
  activeForecasts,
  activeForecastSegments,
  activeForecastsSegments,
  carouselNavigators,
  activeForecastDt,
  unit,
  replaceUnit,
  incrementPageIndex,
  decrementPageIndex,
  replaceActiveForecastDt
}: ForecastCombinedProps) {
  const handleUnitChange = useCallback(
    (unit: Unit) => {
      replaceUnit(unit)
    },
    [replaceUnit]
  )

  const handleCarouselNavigate = useCallback(
    (direction: NavigateDirection) => {
      direction === 'next' ? incrementPageIndex() : decrementPageIndex()
    },
    [incrementPageIndex, decrementPageIndex]
  )

  function handleCarouselSelect (dt: number) {
    replaceActiveForecastDt(dt)
  }

  function setDefaultActiveForcast () {
    const defaultDt = forecasts[0].dt
    replaceActiveForecastDt(defaultDt)
  }

  useEffect(() => {
    setDefaultActiveForcast()
  }, [])

  return (
    <Fragment>
      <UnitSwitch unit={unit} onChange={handleUnitChange} />
      <Carousel
        forecasts={activeForecasts}
        segments={activeForecastsSegments}
        unit={unit}
        navigators={carouselNavigators}
        activeForecastDt={activeForecastDt}
        onNavigate={handleCarouselNavigate}
        onSelect={handleCarouselSelect}
      />
      {activeForecast && <WeatherChart forecast={activeForecast} segments={activeForecastSegments} unit={unit} />}
    </Fragment>
  )
}

export default connect(selectors, actions)(Forecast)
