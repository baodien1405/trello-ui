import Box from '@mui/material/Box'

import ModeSelect from '@/components/mode-select'

export default function AppBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        backgroundColor: 'primary.light'
      }}
    >
      <ModeSelect />
    </Box>
  )
}
