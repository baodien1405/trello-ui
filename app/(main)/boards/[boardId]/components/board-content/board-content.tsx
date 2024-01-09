import Box from '@mui/material/Box'
import {
  Active,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  Over,
  UniqueIdentifier,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import cloneDeep from 'lodash.clonedeep'

import { ColumnList } from '../column-list'
import { Column, Card } from '../../components'
import { generatePlaceholderCard, mapOrder } from '@/utils'
import { MouseSensor, TouchSensor } from '@/custom-libs'
import { boardApi } from '@/api'

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<any>(null)

  const lastOverId = useRef<UniqueIdentifier | null>(null)

  const customDropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerCollisions = pointerWithin(args)

      if (!pointerCollisions?.length) return []

      let overId = getFirstCollision(pointerCollisions, 'id')

      if (overId) {
        const checkColumn = orderedColumnList.find((column) => column._id === overId)

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumnList]
  )

  useEffect(() => {
    setOrderedColumnList(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId: string | number) => {
    return orderedColumnList.find((column) =>
      column?.cards?.map((card: any) => card._id)?.includes(cardId)
    )
  }

  const moveCardBetweenDifferentColumns = (
    overColumn: any,
    overCardId: UniqueIdentifier,
    active: Active,
    over: Over,
    activeColumn: any,
    activeDraggingCardId: UniqueIdentifier,
    activeDraggingCardData: any
  ) => {
    setOrderedColumnList((prevColumnList) => {
      const overCardIndex = overColumn?.cards?.findIndex((card: any) => card._id === overCardId)

      let newCardIndex: number

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumnList = cloneDeep(prevColumnList)
      const nextActiveColumn = nextColumnList.find((column: any) => column._id === activeColumn._id)
      const nextOverColumn = nextColumnList.find((column: any) => column._id === overColumn._id)

      if (nextActiveColumn) {
        // remove card in activeColumn
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card: any) => card._id !== activeDraggingCardId
        )

        // add placeholder card if column is empty
        if (nextActiveColumn.cards.length === 0) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // update cardOrderIds when remove card
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: any) => card._id)
      }

      if (nextOverColumn) {
        // check activeDraggingCardId exist nextOverColumn => if yes => remove
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card: any) => card._id !== activeDraggingCardId
        )

        // add data activeDraggingCard to overColumn by new index
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        })

        // remove placeholder card if it exist
        nextOverColumn.cards = nextOverColumn.cards.filter((card: any) => !card.FE_PlaceholderCard)

        // update cardOrderIds by new data cardList
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: any) => card._id)
      }

      return nextColumnList
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id as string)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // dragging card between different column
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // dragging card in the same column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card: any) => card._id === activeDragItemId
        )
        const newCardIndex = overColumn.cards.findIndex((card: any) => card._id === overCardId)
        const dndOrderedCardList = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumnList((prevColumnList) => {
          const nextColumnList = cloneDeep(prevColumnList)
          const targetColumn = nextColumnList.find((column) => column._id === overColumn._id)

          targetColumn.cards = dndOrderedCardList
          targetColumn.cardOrderIds = dndOrderedCardList.map((card: any) => card._id)

          return nextColumnList
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumnList.findIndex((column) => column._id === active.id)
        const newColumnIndex = orderedColumnList.findIndex((column) => column._id === over.id)

        const dndOrderedColumnList = arrayMove(orderedColumnList, oldColumnIndex, newColumnIndex)
        const dndOrderedColumnListIds = dndOrderedColumnList.map((column) => column._id)

        boardApi.update(board._id, { columnOrderIds: dndOrderedColumnListIds })

        setOrderedColumnList(dndOrderedColumnList)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
        <ColumnList columnList={orderedColumnList} boardId={board?._id} />
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
