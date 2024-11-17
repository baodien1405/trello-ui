'use client'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'next/navigation'

export function AlertMessage() {
  const searchParams = useSearchParams()

  const verifiedEmail = searchParams.get('verifiedEmail')
  const registeredEmail = searchParams.get('registeredEmail')

  return (
    <Box
      sx={{
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 1em'
      }}
    >
      {verifiedEmail && (
        <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
          Your email&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
          >
            {verifiedEmail}
          </Typography>
          &nbsp;has been verified.
          <br />
          Now you can login to enjoy our services! Have a good day!
        </Alert>
      )}

      {registeredEmail && (
        <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
          An email has been sent to&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
          >
            {registeredEmail}
          </Typography>
          <br />
          Please check and verify your account before logging in!
        </Alert>
      )}
    </Box>
  )
}
