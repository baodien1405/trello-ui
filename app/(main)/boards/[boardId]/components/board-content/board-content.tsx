import Box from '@mui/material/Box'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { ColumnList } from '../column-list'
import { mapOrder } from '@/utils'

interface BoardContentProps {
  board: any
}

export function BoardContent({ board }: BoardContentProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnList, setOrderedColumnList] = useState<Array<any>>([])

  useEffect(() => {
    setOrderedColumnList(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumnList.findIndex((column) => column._id === active.id)
      const newIndex = orderedColumnList.findIndex((column) => column._id === over.id)

      const dndOrderedColumnList = arrayMove(orderedColumnList, oldIndex, newIndex)
      // call API to update columnOrderIds with dndOrderedColumnListIds
      // const dndOrderedColumnListIds = dndOrderedColumnList.map((column) => column._id)
      setOrderedColumnList(dndOrderedColumnList)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
    </DndContext>
  )
}
