import Box from '@mui/material/Box'

export function BoardBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        backgroundColor: 'primary.dark'
      }}
    >
      Boardbar
    </Box>
  )
}
