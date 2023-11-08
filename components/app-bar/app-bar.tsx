import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import ModeSelect from '@/components/mode-select'
import { TrelloIcon } from '@/icons'

import { Profiles, Recent, Starred, Templates, Workspaces } from './menu-list'

export default function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%'
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <AppsIcon sx={{ color: 'primary.main' }} />

        <Stack direction="row" alignItems="center" gap={0.5}>
          <SvgIcon inheritViewBox sx={{ color: 'primary.main' }}>
            <TrelloIcon />
          </SvgIcon>
          <Typography variant="body2" fontSize="1.2rem" fontWeight="bold" color="primary.main">
            Trello
          </Typography>
        </Stack>

        <Workspaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Outlined</Button>
      </Stack>

      <Stack direction="row" alignItems="center" gap={2}>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          placeholder="Search..."
          size="small"
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>

        <Profiles />
      </Stack>
    </Box>
  )
}
