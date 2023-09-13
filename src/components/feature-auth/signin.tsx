import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { email, minLength, string, safeParse } from 'valibot'

const defaultTheme = createTheme()

const LoginSchema: any = {
  email: string('Your email must be a string.', [minLength(1, 'Please enter your email.'), email('The email address is badly formatted.')]),
  password: string('Your password must be a string.', [
    minLength(1, 'Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.'),
  ]),
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">Your Website</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const LoginComponent = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [models, setModels] = React.useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage]: any = React.useState('Not available')
  const [validations, setValidations]: any = React.useState({})
  const router = useRouter()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)
    const payloads = { email: data.get('email'), password: data.get('password') }
    const errors: any = {}
    for (const [key, value] of Object.entries(payloads)) {
      const result: any = safeParse(LoginSchema[key], value)
      errors[key] = result.error ? result.error?.message : null
    }
    const errorCount = Object.entries(errors)?.reduce((total: number, item: any) => {
      return total + (item.length > 1 && item[1] ? 1 : 0)
    }, 0)
    if (errorCount > 0) {
      setValidations(errors)
      setErrorMessage('Error validations')
      setOpen(true)
    } else {
      const result: any = await signIn('credentials', {
        email: models.email,
        password: models.password,
        redirect: false,
      })
      if (result.ok) {
        router.push('/')
      } else {
        setErrorMessage(result.error)
        setOpen(true)
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              helperText={validations.email ?? ''}
              error={!!validations.email}
              autoFocus
              value={models.email}
              onChange={({ target }) => setModels({ ...models, email: target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              helperText={validations.password ?? ''}
              error={!!validations.password}
              value={models.password}
              onChange={({ target }) => setModels({ ...models, password: target.value })}
            />
            <Button type="submit" fullWidth variant="contained" size="large" color={loading ? undefined : 'primary'} sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2500}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default LoginComponent
