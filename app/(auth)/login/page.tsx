import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import LockIcon from '@mui/icons-material/Lock'
import { Card as MuiCard } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import Link from 'next/link'

import { Author } from '@/app/(auth)/_components'
import { AlertMessage, LoginForm } from '@/app/(auth)/login/_components'

export default function LoginPage() {
  return (
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

        <AlertMessage />

        <LoginForm />

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
  )
}
