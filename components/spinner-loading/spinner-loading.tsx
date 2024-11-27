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
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#121212' : '#ffffff')
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}
