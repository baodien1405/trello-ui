'use client'

import Container from '@mui/material/Container'

import AppBar from '@/components/app-bar'
import { useAppStore, useBoardDetailsQuery } from '@/hooks'
import { generatePlaceholderCard, mapOrder } from '@/utils'
import { BoardBar } from '@/app/(main)/boards/[boardId]/components/board-bar'
import { BoardContent } from '@/app/(main)/boards/[boardId]/components/board-content'
import SpinnerLoading from '@/components/spinner-loading'
import { ActiveCardModal } from '@/app/(main)/boards/[boardId]/components/active-card-modal'
import { useEffect } from 'react'

interface BoardDetailProps {
  boardId: string
}

export function BoardDetail({ boardId }: BoardDetailProps) {
  const activeCard = useAppStore((state) => state.activeCard)
  const { data, isLoading } = useBoardDetailsQuery(boardId)
  const board = data?.metadata

  useEffect(() => {
    if (!board) return

    board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

    board.columns.forEach((column) => {
      if (column.cards.length === 0) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      } else {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      }
    })
  }, [board])

  if (!board || isLoading) {
    return <SpinnerLoading caption="Loading board..." />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {activeCard && <ActiveCardModal activeCard={activeCard} />}
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}
