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

const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  px: '5px',
  borderRadius: 0.5,
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

export function BoardBar() {
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
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label="Trello Stack Board" clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label="Public/Private Workspace" clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add to Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Stack>

      <Stack direction="row" alignItems="center" gap={2}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
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
