import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import * as React from 'react'

const DialogSignout = (props: any): JSX.Element => {
  const isOpen = props.open || false

  const handleClose = () => {
    props?.click('update:close', false)
  }

  const handleAccept = () => {
    props?.click('update:accept', true)
  }

  return (
    <div style={{ padding: '4px' }}>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Signout'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="outlined" color="error" sx={{ width: '120px' }} onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" autoFocus sx={{ width: '120px' }} onClick={handleAccept}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogSignout
