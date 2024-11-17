import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

interface SpinnerLoadingProps {
  caption: string
}

export default function SpinnerLoading({ caption }: SpinnerLoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}
