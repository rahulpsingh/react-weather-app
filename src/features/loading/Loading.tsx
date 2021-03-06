import React from 'react'
import { Box, Typography } from '@material-ui/core'
import loadingImage from '../../assets/images/loading.svg'
import styles from './Loading.module.css'

export default function Loading () {
  return (
    <div className={styles.root}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img className={styles.loader} src={loadingImage} alt="Four bubbles bouncing" />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
          <Typography color="textSecondary" align="center">
            Please wait while we are collecting weather data for you!!
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
