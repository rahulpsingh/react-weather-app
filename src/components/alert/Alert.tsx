import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { actions, selectors, AlertSelectors, AlertActions } from './alertSlice'

interface AlertProps extends AlertSelectors, AlertActions {}

function Alert ({ message, isOpen, clearMessage }: AlertProps) {
  const handleClose = () => {
    clearMessage()
  }

  return (
    <Snackbar
      open={isOpen}
      message={message}
      autoHideDuration={6000}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>
      }
      onClose={handleClose}
      data-testid="alert"
    />
  )
}

export default connect(selectors, actions)(Alert)
