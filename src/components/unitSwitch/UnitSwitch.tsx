import React, { ChangeEvent, memo } from 'react'
import { Box, FormControlLabel, Grid, Paper, Radio } from '@material-ui/core'
import { Unit } from '../forecast/forcastSlice'

interface UnitSwitchProps {
  unit: Unit
  onChange: (unit: Unit) => void
}

function UnitSwitch ({ unit, onChange }: UnitSwitchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(value as Unit)
  }

  const isChecked = (selectedUnit: Unit) => (unit === selectedUnit)

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={6}>
        <Box my={4}>
          <Paper variant="outlined" data-testid="unitSwitch">
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <FormControlLabel
                  name="unit"
                  value="celsius"
                  checked={isChecked('celsius')}
                  control={<Radio onChange={handleChange} />}
                  label="Celsius"
                  data-testid="celsiusUnit"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  name="unit"
                  value="fahrenheit"
                  checked={isChecked('fahrenheit')}
                  control={<Radio onChange={handleChange} />}
                  label="Fahrenheit"
                  data-testid="fahrenheitUnit"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}

export default memo(UnitSwitch)
