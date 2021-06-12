import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { ForecastListCancel, list } from '../../services/forecast.service'
import { actions, selectors, AppSelectors, AppActions } from './appSlice'
import Loading from '../loading/Loading'
import Forecast from '../forcast/Forecast'
import Alert from '../../components/alert/Alert'

interface AppProps extends AppSelectors, AppActions {}

function App ({ hasForecasts, forecasts, replaceForecasts }: AppProps) {
  let cancelListForecast: ForecastListCancel | null = null
  async function listForecast () {
    const [forecasts, cancel] = await list()
    cancelListForecast = cancel
    if (forecasts) replaceForecasts(forecasts)
  }

  useEffect(() => {
    listForecast()
    return () => {
      if (cancelListForecast) cancelListForecast()
    }
  }, [])

  return (
    <Container maxWidth="md">
      {hasForecasts ? <Forecast forecasts={forecasts} /> : <Loading />}
      <Alert />
    </Container>
  )
}

export default connect(selectors, actions)(App)
