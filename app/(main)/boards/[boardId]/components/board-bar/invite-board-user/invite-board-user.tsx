'use client'

import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'

import FieldErrorAlert from '@/components/field-error-alert'
import { useInviteUserToBoard } from '@/hooks'
import { toast } from 'react-toastify'

interface InviteBoardUserProps {
  boardId: string
}

export function InviteBoardUser({ boardId }: InviteBoardUserProps) {
  const inviteUserToBoardMutation = useInviteUserToBoard()
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<{ inviteeEmail: string | null }>({
    resolver: yupResolver(
      yup.object().shape({
        inviteeEmail: yup
          .string()
          .strict()
          .email('Please enter a valid email')
          .trim('Please enter a suffix with no leading or trailing spaces')
          .required('Please enter an email')
          .nullable()
      })
    )
  })

  const handleTogglePopover = (event: any) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const handleInviteUserToBoard = async ({ inviteeEmail }: { inviteeEmail: string | null }) => {
    if (!inviteeEmail || inviteUserToBoardMutation.isPending) return

    await inviteUserToBoardMutation.mutateAsync({
      inviteeEmail,
      boardId: boardId
    })

    setValue('inviteeEmail', null)
    setAnchorPopoverElement(null)

    toast.success('User invited to board successfully!')
  }

  return (
    <Box>
      <Tooltip title="Invite user to this board!">
        <Button
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Invite
        </Button>
      </Tooltip>

      {/* Khi Click vào butotn Invite ở trên thì sẽ mở popover */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <form onSubmit={handleSubmit(handleInviteUserToBoard)} style={{ width: '320px' }}>
          <Box sx={{ p: '15px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
              component="span"
              variant="inherit"
              sx={{ fontWeight: 'bold', fontSize: '16px' }}
            >
              Invite User To This Board!
            </Typography>
            <Box>
              <TextField
                autoFocus
                fullWidth
                label="Enter email to invite..."
                type="text"
                variant="outlined"
                error={!!errors.inviteeEmail}
                {...register('inviteeEmail')}
              />
              <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
            </Box>

            <Box sx={{ alignSelf: 'flex-end' }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="info"
              >
                Invite
              </Button>
            </Box>
          </Box>
        </form>
      </Popover>
    </Box>
  )
}
