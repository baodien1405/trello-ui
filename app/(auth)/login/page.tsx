import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import Link from 'next/link'

import { Author } from '@/app/(auth)/_components'

export default function LoginPage() {
  return (
    // <form onSubmit={handleSubmit(submitLogIn)}>
    <form>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AutoAwesomeMosaicIcon />
            </Avatar>
          </Box>

          <Author />

          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '0 1em'
            }}
          >
            <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Your email&nbsp;
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
              >
                baodien1405@gmail.com
              </Typography>
              &nbsp;has been verified.
              <br />
              Now you can login to enjoy our services! Have a good day!
            </Alert>
            <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              An email has been sent to&nbsp;
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
              >
                baodien1405@gmail.com
              </Typography>
              <br />
              Please check and verify your account before logging in!
            </Alert>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField fullWidth label="Enter Password..." type="password" variant="outlined" />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to Trello MERN Stack Advanced?</Typography>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                Create account!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}
