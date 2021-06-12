import React, { memo } from 'react'
import { Box, Card, CardContent, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { isEqual } from 'lodash'
import { Unit } from '../forecast/forcastSlice'
import { ForecastData } from '../../services/forecast.service'
import BarChart from '../BarChart/BarChart'
import { WeatherChartConfig, getWeatherChartConfig } from '../../services/chart.service'

interface WeatherChartProps {
  forecast: ForecastData
  segments: ForecastData[]
  unit: Unit
}

function WeatherChart ({ segments, unit }: WeatherChartProps) {
  const theme = useTheme()
  const config: WeatherChartConfig = { segments, unit, theme }
  const chartConfig = getWeatherChartConfig(config)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box my={3}>
          <Card variant="outlined" data-testid="weatherChart">
            <CardContent>
              <Box>
                <BarChart
                  chartId="weather-chart"
                  data={chartConfig.data}
                  top={10}
                  right={10}
                  bottom={50}
                  left={40}
                  width={880}
                  height={440}
                  fill={chartConfig.color}
                  suffix={chartConfig.sufix}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default memo(WeatherChart, isEqual)
