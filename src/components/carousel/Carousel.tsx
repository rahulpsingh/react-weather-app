import React from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import { NavigateBeforeOutlined, NavigateNextOutlined } from '@material-ui/icons'
import { capitalize } from 'lodash'
import { ForecastData } from '../../services/forecast.service'
import { Unit } from '../forecast/forcastSlice'
import Weather, { WeatherClickHandler } from '../weather/Weather'
import { segmentsFromForecast } from '../../utils/forecastHelpers'
import styles from './Carousel.module.css'

export type NavigateDirection = 'next' | 'previous'
export type NavigateHandleCallback = (direction: NavigateDirection) => void

interface WeatherCarouselProps {
  forecasts: ForecastData[]
  segments: ForecastData[]
  unit: Unit
  navigators: NavigateDirection[]
  activeForecastDt: number
  onNavigate: NavigateHandleCallback
  onSelect: WeatherClickHandler
}

interface CarouselNavigatorProps {
  navigators: NavigateDirection[]
  onNavigate: NavigateHandleCallback
}

interface NavigateButtonProps {
  direction: NavigateDirection
  onNavigate: NavigateHandleCallback
}

export const NavigateButton = ({ direction, onNavigate }: NavigateButtonProps) => {
  const testId = `button${capitalize(direction)}`
  const Icon = direction === 'previous' ? NavigateBeforeOutlined : NavigateNextOutlined

  const handleClick = () => {
    onNavigate(direction)
  }

  return (
    <IconButton aria-label="delete" className={styles.navigationButton} onClick={handleClick} data-testid={testId}>
      <Icon />
    </IconButton>
  )
}

export function CarouselNavigator ({ navigators, onNavigate }: CarouselNavigatorProps) {
  const isNextOnlyNavigate = !navigators.includes('previous') && navigators.includes('next')
  const justifyButtons = isNextOnlyNavigate ? 'flex-end' : 'space-between'

  const navigateButtons = navigators.map((navigator) => (
    <Grid item key={navigator}>
      <NavigateButton direction={navigator} onNavigate={onNavigate} />
    </Grid>
  ))

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Box mb={3}>
          <Grid container justify={justifyButtons}>
            {navigateButtons}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default function WeatherCarousel ({
  unit,
  segments: weatherSegments,
  forecasts,
  navigators,
  activeForecastDt,
  onSelect,
  onNavigate
}: WeatherCarouselProps) {
  const renderWeather = (forecast: ForecastData) => {
    const segments = segmentsFromForecast(forecast, weatherSegments)

    return (
      <Weather
        forecast={forecast}
        segments={segments}
        unit={unit}
        activeForecastDt={activeForecastDt}
        onClick={onSelect}
        key={forecast.dt}
      />
    )
  }

  return (
    <Box data-testid="weatherCarousel">
      <CarouselNavigator onNavigate={onNavigate} navigators={navigators} />
      <Grid container spacing={3}>
        {forecasts.map(renderWeather)}
      </Grid>
    </Box>
  )
}
