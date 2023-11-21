import Box from '@mui/material/Box'
import { ColumnList } from '../column-list'
import { mapOrder } from '@/utils'

interface BoardContentProps {
  board: any
}

export function BoardContent({ board }: BoardContentProps) {
  const orderedColumnList = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ColumnList columnList={orderedColumnList} />
    </Box>
  )
}
