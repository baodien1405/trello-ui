import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
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
  board: any
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
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
          <Tooltip title="baodien1405">
            <Avatar
              alt="avatar"
              src="https://graph.facebook.com/1325702547590327/picture?width=400&height=400"
            />
          </Tooltip>
        </AvatarGroup>
      </Stack>
    </Box>
  )
}
