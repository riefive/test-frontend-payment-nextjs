import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react'

const ActionComponent = (props: any) => (
  <React.Fragment>
    <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
)

export const DisplaySnackbar = (props: any): JSX.Element => {
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2500}
      onClose={props.handleClose}
      action={ActionComponent(props)}
    >
      <Alert onClose={props.handleClose} severity="error" sx={{ width: '100%' }}>
        {props.errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default DisplaySnackbar
