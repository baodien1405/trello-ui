import Link from 'next/link'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import Zoom from '@mui/material/Zoom'

import { Author } from '@/app/(auth)/_components'
import { RegisterForm } from '@/app/(auth)/register/_components'

export default function RegisterPage() {
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

        <RegisterForm />

        <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
          <Typography>Already have an account?</Typography>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
              Log in!
            </Typography>
          </Link>
        </Box>
      </MuiCard>
    </Zoom>
  )
}
