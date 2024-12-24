'use client'

import { useState } from 'react'
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

import { useInvitationListQuery, useUpdateBoardInvitation } from '@/hooks'
import { BOARD_INVITATION_STATUS } from '@/constants'

export function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const updateBoardInvitation = useUpdateBoardInvitation()
  const { data: invitationListData, isLoading: isLoadingInvitationList } = useInvitationListQuery()
  const invitationList = invitationListData?.metadata?.results || []

  const handleClickNotificationIcon = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdateBoardInvitation = (status: string, invitationId: string) => {
    updateBoardInvitation.mutateAsync({
      invitationId,
      status
    })
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          // variant="none"
          variant="dot"
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: 'white'
              // color: 'yellow'
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
