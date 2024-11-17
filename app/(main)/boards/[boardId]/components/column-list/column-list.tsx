import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useAddColumnMutation } from '@/hooks'
import { Column as ColumnInterface, ColumnPayload } from '@/models'
import { Column } from '@/app/(main)/boards/[boardId]/components'

interface ColumnListProps {
  columnList: ColumnInterface[]
  boardId: string
}

export function ColumnList({ columnList, boardId }: ColumnListProps) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addColumnMutation = useAddColumnMutation(boardId)

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm((prevState) => !prevState)

  const handleAddNewColumn = async () => {
    if (!newColumnTitle) {
      return toast.error('Please enter a column title', { position: 'bottom-left' })
    }

    try {
      const payload: ColumnPayload = {
        title: newColumnTitle,
        boardId: boardId
      }

      const response = await addColumnMutation.mutateAsync(payload)

      toast.success(response.message)
      toggleOpenNewColumnForm()
      setNewColumnTitle('')
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <SortableContext
      items={columnList?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columnList?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              color: 'white',
              mx: 2,
              bgcolor: '#ffffff3d',
              minWidth: '250px',
              maxWidth: '250px',
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
        ) : (
          <Box
            sx={{
              mx: 2,
              p: 1,
              bgcolor: '#ffffff3d',
              minWidth: '250px',
              maxWidth: '250px',
              borderRadius: '6px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
                onClick={handleAddNewColumn}
                startIcon={
                  addColumnMutation.isPending ? (
                    <CircularProgress color="inherit" size="1em" />
                  ) : null
                }
                disabled={addColumnMutation.isPending}
              >
                Add Column
              </Button>

              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}
