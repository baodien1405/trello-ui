'use client'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import AppBar from '@/components/app-bar'
import { useBoardDetails } from '@/hooks'
import { generatePlaceholderCard, mapOrder } from '@/utils'
import { BoardBar } from '@/app/(main)/boards/[boardId]/components/board-bar'
import { BoardContent } from '@/app/(main)/boards/[boardId]/components/board-content'

interface BoardDetailProps {
  boardId: string
}

export function BoardDetail({ boardId }: BoardDetailProps) {
  const { data, isLoading } = useBoardDetails(boardId)
  const board = data?.metadata

  if (!board || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          height: '100vh',
          width: '100vw',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}
      >
        <CircularProgress color="inherit" />
        <Typography>Loading board...</Typography>
      </Box>
    )
  }

  board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

  board.columns.forEach((column) => {
    if (column.cards.length === 0) {
      column.cards = [generatePlaceholderCard(column)]
      column.cardOrderIds = [generatePlaceholderCard(column)._id]
    } else {
      column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    }
  })

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}
