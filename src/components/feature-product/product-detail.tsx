import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiGetProductById } from '@/methods/service-product'
import { apiPostBuy } from '@/methods/service-transaction'
import { toCurrency } from '@/methods/helper-formatter'
import Copyright from '@/components/commons/copyright'
import DisplaySnackbar from '@/components/commons/display-snackbar'

const ProductsDetailComponent = (props: any): JSX.Element => {
  const params: any = useParams()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [errorMessage, setErrorMessage]: any = React.useState('Not available')
  const [models, setModels] = React.useState({ quantity: '1' })
  const [counter, setCounter] = React.useState(1)
  const [content, setContent] = React.useState({} as any)

  /* eslint-disable */
  React.useEffect(() => {
    apiGetProductById({ id: params.id }).then((result) => {
      if (result) {
        setContent(result)
      }
    })
  }, [])

  const handleCounter = (type: any) => {
    if (type === 'add') {
      setCounter((counter) => counter + 1)
      if (counter >= 25) setCounter(25)
    } else if (type === 'substract') {
      setCounter((counter) => counter - 1)
      if (counter <= 1) setCounter(1)
    }
  }

  const handleSubmit = async () => {
    const token = props.session?.user?.accessToken || ''
    const payloads = { product_id: params.id, quantity: counter, price: content.price }
    const result = await apiPostBuy(token, payloads)
    if (result.error) {
      setErrorMessage(result.status + ' ' + result.error)
      setOpen(true)
    } else {
      router.push(`/transaction/${result.id}`)
    }
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
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="sm">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="div" sx={{ pt: '56.25%' }} image={content.image} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {content.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                Rp. {toCurrency(content.price || 0)}
              </Typography>
              <Typography sx={{ mb: 4 }}>{content.description}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, textAlign: 'center' }}>
                <RemoveCircleOutlineIcon color="primary" sx={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => handleCounter('substract')} />
                <TextField
                  inputProps={{ type: 'number', inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                  min-value="1"
                  max-value="50"
                  value={counter}
                  onChange={({ target }) => setModels({ ...models, quantity: target.value })}
                ></TextField>
                <AddCircleOutlineIcon color="primary" sx={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => handleCounter('add')} />
              </Box>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" fullWidth onClick={() => handleSubmit()}>
                Buy
              </Button>
            </CardActions>
            <CardActions>
              <Button variant="outlined" color="error" size="large" fullWidth onClick={() => router.push('/product')}>
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

export default ProductsDetailComponent
