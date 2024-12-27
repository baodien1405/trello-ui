'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Board, User } from '@/models'
import { CARD_MEMBER_ACTIONS } from '@/constants'

interface CardUserGroupProps {
  board: Board
  cardMemberIds?: string[]
  onUpdateCardMembers?: (incomingMemberInfo: { userId: string; action: string }) => void
}

export function CardUserGroup({
  board,
  cardMemberIds = [],
  onUpdateCardMembers = () => {}
}: CardUserGroupProps) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const cardMemberList = board.members?.filter((member) => cardMemberIds.includes(member._id)) || []

  const handleTogglePopover = (event: any) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const handleCardMembersUpdate = (user: User) => {
    const incomingMemberInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id)
        ? CARD_MEMBER_ACTIONS.REMOVE
        : CARD_MEMBER_ACTIONS.ADD
    }

    onUpdateCardMembers(incomingMemberInfo)
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {cardMemberList.map((member) => (
        <Tooltip title={member.displayName} key={member._id}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt={member.displayName}
            src={member.avatar}
          />
        </Tooltip>
      ))}

      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d'),
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200],
            '&:hover': {
              color: (theme) => (theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4'),
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff')
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {board.members.map((member) => (
            <Tooltip title={member.displayName} key={member._id}>
              <Badge
                sx={{ cursor: 'pointer' }}
                overlap="rectangular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  cardMemberIds.includes(member._id) ? (
                    <CheckCircleIcon fontSize="small" sx={{ color: '#27ae60' }} />
                  ) : null
                }
                onClick={() => handleCardMembersUpdate(member)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={member.displayName}
                  src={member.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}
