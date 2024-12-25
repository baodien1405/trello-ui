'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'

import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import CircularProgressIcon from '@mui/material/CircularProgress'

import { useAppStore, useInvitationListQuery, useUpdateBoardInvitation } from '@/hooks'
import { BOARD_INVITATION_STATUS, RoutePath } from '@/constants'
import { socketIoInstance } from '@/utils'
import { Invitation } from '@/models'

export function Notifications() {
  const router = useRouter()
  const [hasNewInvitation, setHasNewInvitation] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const currentUser = useAppStore((state) => state.currentUser)
  const updateBoardInvitation = useUpdateBoardInvitation()
  const { data: invitationListData, isLoading: isLoadingInvitationList } = useInvitationListQuery()
  const invitationList = useMemo(
    () => invitationListData?.metadata?.results || [],
    [invitationListData?.metadata?.results]
  )

  useEffect(() => {
    const onReceiveNewInvitation = (invitation: Invitation) => {
      if (invitation.inviteeId === currentUser?._id) {
        invitationList.unshift(invitation)

        setHasNewInvitation(true)
      }
    }

    socketIoInstance.on('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)

    return () => {
      socketIoInstance.off('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
    }
  }, [currentUser?._id, invitationList])

  const handleClickNotificationIcon = (event: any) => {
    setAnchorEl(event.currentTarget)
    setHasNewInvitation(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdateBoardInvitation = async (status: string, invitationId: string) => {
    if (updateBoardInvitation.isPending) return

    const response = await updateBoardInvitation.mutateAsync({
      invitationId,
      status
    })

    if (response.metadata.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
      router.push(`${RoutePath.BOARDS}/${response.metadata.boardInvitation.boardId}`)
    }
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          badgeContent=""
          variant="dot"
          invisible={!hasNewInvitation}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: hasNewInvitation ? 'yellow' : 'white',
              cursor: 'pointer'
            }}
          />
        </Badge>
      </Tooltip>

      {isLoadingInvitationList && <CircularProgressIcon color="inherit" size="1em" />}

      {!isLoadingInvitationList && (
        <Menu
          sx={{ mt: 2 }}
          id="basic-notification-drop-down"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
        >
          {invitationList.length === 0 && (
            <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>
          )}
          {invitationList.map((invitation, index) => (
            <Box key={invitation._id}>
              <MenuItem
                sx={{
                  minWidth: 200,
                  maxWidth: 360,
                  overflowY: 'auto'
                }}
              >
                <Box
                  sx={{
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                      <GroupAddIcon fontSize="small" />
                    </Box>
                    <Box>
                      <strong>{invitation.inviter?.displayName}</strong> had invited you to join the
                      board <strong>{invitation.board?.title}</strong>
                    </Box>
                  </Box>

                  {invitation.boardInvitation.status === BOARD_INVITATION_STATUS.PENDING && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          handleUpdateBoardInvitation(
                            BOARD_INVITATION_STATUS.ACCEPTED,
                            invitation._id
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          handleUpdateBoardInvitation(
                            BOARD_INVITATION_STATUS.REJECTED,
                            invitation._id
                          )
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'flex-end'
                    }}
                  >
                    {invitation.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED && (
                      <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                    )}

                    {invitation.boardInvitation.status === BOARD_INVITATION_STATUS.REJECTED && (
                      <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                    )}
                  </Box>

                  {/* Thời gian của thông báo */}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography component="span" variant="inherit" sx={{ fontSize: '13px' }}>
                      {moment(invitation.createdAt).format('llll')}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>

              {index !== invitationList.length - 1 && <Divider />}
            </Box>
          ))}
        </Menu>
      )}
    </Box>
  )
}
