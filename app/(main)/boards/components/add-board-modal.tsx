'use client'

import { toast } from 'react-toastify'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'

import FieldErrorAlert from '@/components/field-error-alert'
import { BOARD_TYPES, FIELD_REQUIRED_MESSAGE } from '@/constants'
import { Board } from '@/models'
import { useAddBoardMutation } from '@/hooks'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

export function AddBoardModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [isOpen, setIsOpen] = useState(false)

  const { mutateAsync: addBoardMutateAsync, isPending: isBoardAdding } = useAddBoardMutation()

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    reset()
  }

  const submitCreateNewBoard = async (data: Partial<Board>) => {
    const response = await addBoardMutateAsync(data)

    toast.success(response.message, {
      theme: 'colored'
    })
    handleCloseModal()
  }

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: '8px',
            border: 'none',
            outline: 0,
            padding: '20px 30px',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : 'white')
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
          >
            <CancelIcon
              color="error"
              sx={{ '&:hover': { color: 'error.light' } }}
              onClick={handleCloseModal}
            />
          </Box>
          <Box id="modal-modal-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryAddIcon />
            <Typography variant="h6" component="h2">
              {' '}
              Create a new board
            </Typography>
          </Box>
          <Box id="modal-modal-description" sx={{ my: 2 }}>
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    variant="outlined"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AbcIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }
                    }}
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 50, message: 'Max Length is 50 characters' }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    type="text"
                    variant="outlined"
                    multiline
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }
                    }}
                    {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 255, message: 'Max Length is 255 characters' }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                <Controller
                  name="type"
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(event, value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size="small" />}
                        label="Public"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size="small" />}
                        label="Private"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  )}
                />

                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isBoardAdding}
                    startIcon={
                      isBoardAdding ? <CircularProgress color="inherit" size="1em" /> : null
                    }
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
