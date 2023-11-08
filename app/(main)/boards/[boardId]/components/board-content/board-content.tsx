import Box from '@mui/material/Box'

export function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} -  ${theme.trello.boardBarHeight})`
      }}
    >
      Content
    </Box>
  )
}
