import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DialogSignout from '@/components/commons/dialog-signout'
import { apiGetProduct } from '@/methods/service-product'
import { toCurrency } from '@/methods/helper-formatter'

const defaultTheme = createTheme()

const isDummy = false
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const textTitle = 'Happy Shopping'

const ProductsComponent = (props: any): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [lists, setLists] = React.useState([])
  const router = useRouter()

  React.useEffect(() => {
    apiGetProduct({ limit: 25 }).then((result) => {
      if (result?.data && Array.isArray(result.data)) {
        setLists(result.data)
      }
    })
  }, [open])

  const handleDialog = (type: string, value: any) => {
    if (type === 'update:close') {
      setOpen(value)
    } else if (type === 'update:accept') {
      setTimeout(() => {
        signOut({ redirect: false })
        router.push('/signin')
      }, 500)
    }
  }

  const ListComponent = isDummy
    ? cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="div" sx={{ pt: '56.25%' }} image="https://source.unsplash.com/random?wallpapers" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Heading
              </Typography>
              <Typography>This is a media card. You can use this section to describe the content.</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    : lists.map((content: any) => (
        <Grid item key={content.id} xs={12} sm={6} md={4}>
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
              <Button variant="outlined" size="small" fullWidth>
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))

  const ExitActionComponent =
    props && props.status === 'authenticated' ? (
      <Tooltip title="Sign Out">
        <IconButton aria-label="exit" sx={{ color: 'white' }} onClick={() => setOpen(true)}>
          <ExitToAppIcon sx={{ mr: 0 }} />
        </IconButton>
      </Tooltip>
    ) : (
      <span />
    )

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <LocalMallIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {textTitle}
          </Typography>
          {ExitActionComponent}
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 12, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="text.primary" gutterBottom>
              {textTitle}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so
              folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {ListComponent}
          </Grid>
        </Container>
      </main>
      <DialogSignout open={open} click={handleDialog} />
    </ThemeProvider>
  )
}

export default ProductsComponent
