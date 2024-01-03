'use client'

import Container from '@mui/material/Container'

import AppBar from '@/components/app-bar'
import { BoardBar, BoardContent } from './components'
import { mockData } from '@/api'
import { useBoardDetails } from '@/hooks'

interface BoardDetailPageProps {
  params: { boardId: string }
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { data, isLoading } = useBoardDetails(params.boardId)

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}
