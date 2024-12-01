'use client'

import { MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

import { User } from '@/models'

interface BoardUserGroupProps {
  boardUsers?: User[]
  limit?: number
}

export function BoardUserGroup({ boardUsers = [], limit = 8 }: BoardUserGroupProps) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState<HTMLDivElement | null>(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

  const handleTogglePopover = (event: MouseEvent<HTMLDivElement>) => {
    if (!anchorPopoverElement) {
      setAnchorPopoverElement(event?.currentTarget)
    } else {
      setAnchorPopoverElement(null)
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {[...Array(16)].map((_, index) => {
        if (index < limit) {
          return (
            <Tooltip title="trungquandev" key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="trungquandev"
                src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
              />
            </Tooltip>
          )
        }
      })}

      {[...Array(16)].length > limit && (
        <Tooltip title="Show more">
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
              fontWeight: '500',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be'
            }}
          >
            +{[...Array(16)].length - limit}
          </Box>
        </Tooltip>
      )}

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '235px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[...Array(16)].map((_, index) => (
            <Tooltip title="trungquandev" key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="trungquandev"
                src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}
