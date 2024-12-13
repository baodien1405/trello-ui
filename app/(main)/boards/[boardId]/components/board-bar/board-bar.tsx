import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import VpnLockIcon from '@mui/icons-material/VpnLock'

import { InviteBoardUser } from '@/app/(main)/boards/[boardId]/components/board-bar/invite-board-user'
import { BoardUserGroup } from '@/app/(main)/boards/components'
import { Board } from '@/models'
import { convertTitleCase } from '@/utils'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: 0.5,
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

interface BoardBarProps {
  board: Board
}

export function BoardBar({ board }: BoardBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Tooltip title={board?.description}>
          <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={convertTitleCase(board?.type)}
          clickable
        />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add to Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Stack>

      <Stack direction="row" alignItems="center" gap={2}>
        <InviteBoardUser />

        <BoardUserGroup boardUsers={[...board.owners, ...board.members]} />
      </Stack>
    </Box>
  )
}
