import Box from '@mui/material/Box'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import cloneDeep from 'lodash.clonedeep'

import { ColumnList } from '../column-list'
import { mapOrder } from '@/utils'
import { Column, Card } from '../../components'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null)
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null)

  const customDropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  useEffect(() => {
    setOrderedColumnList(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId: string | number) => {
    return orderedColumnList.find((column) =>
      column?.cards?.map((card: any) => card._id)?.includes(cardId)
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id as string)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event: DragEndEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnList((prevColumnList) => {
        const overCardIndex = overColumn?.cards?.findIndex((card: any) => card._id === overCardId)

        let newCardIndex: number

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumnList = cloneDeep(prevColumnList)
        const nextActiveColumn = nextColumnList.find(
          (column: any) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumnList.find((column: any) => column._id === overColumn._id)

        if (nextActiveColumn) {
          // remove card in activeColumn
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card: any) => card._id !== activeDraggingCardId
          )

          // update cardOrderIds when remove card
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: any) => card._id)
        }

        if (nextOverColumn) {
          // check activeDraggingCardId exist nextOverColumn => if yes => remove
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card: any) => card._id !== activeDraggingCardId
          )

          // add data activeDraggingCard to overColumn by new index
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )

          // update cardOrderIds by new data cardList
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: any) => card._id)
        }

        return nextColumnList
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return

    const { active, over } = event

    if (!active || !over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumnList.findIndex((column) => column._id === active.id)
      const newIndex = orderedColumnList.findIndex((column) => column._id === over.id)

      const dndOrderedColumnList = arrayMove(orderedColumnList, oldIndex, newIndex)
      // call API to update columnOrderIds with dndOrderedColumnListIds
      // const dndOrderedColumnListIds = dndOrderedColumnList.map((column) => column._id)
      setOrderedColumnList(dndOrderedColumnList)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ColumnList columnList={orderedColumnList} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}
