import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

import { Column } from '../column'

export function ColumnList() {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Column />
      <Column />
      <Column />

      <Box
        sx={{
          color: 'white',
          mx: 2,
          bgcolor: '#ffffff3d',
          minWidth: '200px',
          maxWidth: '200px',
          borderRadius: '6px',
          height: 'fit-content'
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}
