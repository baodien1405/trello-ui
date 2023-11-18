import Box from '@mui/material/Box'

export function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} -  ${theme.trello.boardBarHeight})`
      }}
    >
      Content
    </Box>
  )
}
