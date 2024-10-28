import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import Image from 'next/image'

import { svgs, images } from '@/assets'

export default function NotFound() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#25344C',
        color: 'white'
      }}
    >
      <Box
        sx={{
          '@keyframes stars': {
            '0%': { backgroundPosition: '-100% 100%' },
            '100%': { backgroundPosition: '0 0 ' }
          },
          animation: 'stars 12s linear infinite alternate',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${images.particles.src})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          // boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '100px', fontWeight: 800 }}>
          404
        </Typography>
        <Typography
          sx={{
            fontSize: '18px !important',
            lineHeight: '25px',
            fontWeight: 400,
            maxWidth: '350px',
            textAlign: 'center'
          }}
        >
          LOST IN&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontSize: '18px',
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '""',
                borderBottom: '3px solid #fdba26',
                left: 0,
                top: '43%',
                width: '100%'
              }
            }}
          >
            &nbsp;SPACE&nbsp;
          </Typography>
          &nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: '#fdba26', fontSize: 18, fontWeight: 500 }}
          >
            baodien1405
          </Typography>
          ?<br />
          Hmm, looks like that page doesn&apos;t exist.
        </Typography>
        <Box sx={{ width: '390px', height: '390px', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              right: '25px',
              '@keyframes spinAround': {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' }
              },
              animation: 'spinAround 5s linear 0s infinite'
            }}
          >
            <Image src={svgs.astronaut} alt="astronaut" width={50} height={50} />
          </Box>

          <Image src={svgs.planet} alt="planet" width={400} height={300} />
        </Box>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              borderColor: 'white',
              '&:hover': { color: '#fdba26', borderColor: '#fdba26' }
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
