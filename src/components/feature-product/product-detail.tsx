import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiGetProductById } from '@/methods/service-product'
import { toCurrency } from '@/methods/helper-formatter'

const ProductsDetailComponent = (props: any): JSX.Element => {
  const params: any = useParams()
  const router = useRouter()
  const [content, setContent] = React.useState({} as any)

  React.useEffect(() => {
    apiGetProductById({ id: params.id }).then((result) => {
      if (result) {
        setContent(result)
      }
    })
  }, [params])

  if (Object.keys(content).length === 0) {
    return <div>Note Found</div>
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
              <Typography gutterBottom sx={{ fontSize: 14 }}>
                <b>Product Number:</b> {content.sku}
              </Typography>
              <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
                Rp. {toCurrency(content.price || 0)}
              </Typography>
              <Typography>{content.description}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="error" size="large" fullWidth onClick={() => router.push('/product')}>
                Back
              </Button>
              <Button variant="outlined" size="large" fullWidth>
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </Box>
  )
}

ProductsDetailComponent.getInitialProps = async ({ query }: any) => {
  const { id } = query
  return { id }
}

export default ProductsDetailComponent
