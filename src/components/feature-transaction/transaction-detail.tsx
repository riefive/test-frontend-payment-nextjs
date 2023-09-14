import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiGetTransactionDetail } from '@/methods/service-transaction'
import { toCurrency } from '@/methods/helper-formatter'
import Copyright from '@/components/commons/copyright'
import DisplaySnackbar from '@/components/commons/display-snackbar'

const TransactionDetailComponent = (props: any): JSX.Element => {
  const params: any = useParams()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [errorMessage, setErrorMessage]: any = React.useState('Not available')
  const [content, setContent] = React.useState({} as any)

  /* eslint-disable */
  React.useEffect(() => {
    setTimeout(() => {
      handleInit(props)
    }, 350)
  }, [props])

  const handleInit = (data: any) => {
    const token = data.session?.user?.accessToken || null
    if (!token) return
    apiGetTransactionDetail(token, { id: params.id }).then((result) => {
      if (result) {
        setContent(result)
      }
    })
  }

  const handleSubmit = async () => {
    const token = props.session?.user?.accessToken || ''
    console.log(token)
  }

  const setTimeDisplay = (date: string) => {
    return date
      .replace(/.\d{3}Z/, '')
      .replace('T', ' ')
      .trim()
  }

  if (Object.keys(content).length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, textAlign: 'center' }}>
        <Typography gutterBottom sx={{ fontSize: 14 }}>
          Not Found
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', padding: 0 }}>
      <Container maxWidth="sm">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {content.name}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom sx={{ fontSize: 16 }}>
                  Created At
                </Typography>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                  {setTimeDisplay(content.created_at)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom sx={{ fontSize: 16 }}>
                  Expired At
                </Typography>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                  {setTimeDisplay(content.expired_at)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom sx={{ fontSize: 16 }}>
                  Price
                </Typography>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                  Rp. {toCurrency(content.price || 0)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom sx={{ fontSize: 16 }}>
                  Quantity
                </Typography>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                  {content.quantity || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16, fontWeight: 600 }}>
                  Rp. {toCurrency(content.total || 0)}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" fullWidth onClick={() => handleSubmit()}>
                Pay
              </Button>
            </CardActions>
            <CardActions>
              <Button variant="outlined" color="error" size="large" fullWidth onClick={() => router.back()}>
                Back
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
      <DisplaySnackbar open={open} errorMessage={errorMessage} handleClose={() => setOpen(false)} />
    </Box>
  )
}

export default TransactionDetailComponent
