'use client'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import AppBar from '@/components/app-bar'
import { BoardBar, BoardContent } from './components'
import { useBoardDetails } from '@/hooks'
import { generatePlaceholderCard } from '@/utils'

interface BoardDetailPageProps {
  params: { boardId: string }
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { data, isLoading } = useBoardDetails(params.boardId)
  const board = data?.metadata

  board?.columns?.forEach((column) => {
    if (column.cards.length === 0) {
      column.cards = [generatePlaceholderCard(column)]
      column.cardOrderIds = [generatePlaceholderCard(column)._id]
    }
  })

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <BoardContent board={board} />
      )}
    </Container>
  )
}
