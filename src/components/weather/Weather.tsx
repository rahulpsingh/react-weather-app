import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { ForecastData, iconImage as getIconImage } from '../../services/forecast.service'
import { Unit } from '../forecast/forcastSlice'
import { dateFromDatetime } from '../../utils/dateHelpers'
import { averageSegmentTemp } from '../../utils/temperatureHelpers'
import styles from './Weather.module.css'

export type WeatherClickHandler = (dt: number) => void

interface WeatherProps {
  forecast: ForecastData
  segments: ForecastData[]
  unit: Unit
  activeForecastDt: number
  onClick: WeatherClickHandler
}

export default function Weather ({ segments, forecast, unit, activeForecastDt, onClick }: WeatherProps) {
  const theme = useTheme()
  const weather = forecast.weather[0]
  const iconImage = getIconImage(weather.icon)
  const date = dateFromDatetime(forecast.dt_txt)
  const temperature = averageSegmentTemp(segments, unit)
  const isActive = forecast.dt === activeForecastDt
  const activeCardBackground = isActive ? theme.palette.grey[100] : ''

  const handleClick = () => {
    onClick(forecast.dt)
  }

  return (
    <Grid item xs={12} sm={4}>
      <Card variant="outlined" className={styles.card} style={{ backgroundColor: activeCardBackground }} onClick={handleClick} data-testid="weatherCard">
        <CardContent>
          <Typography variant="h6" color="secondary">
            {temperature}
          </Typography>
          <Typography variant="h6">{weather.main}</Typography>
          <Typography color="textSecondary">{weather.description}</Typography>
          <img className={styles.icon} src={iconImage} alt="Current weather icon" />
          <Typography variant="subtitle2">{date}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
