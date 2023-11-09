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
        width: '100%',
        gap: 2,
        overflowX: 'auto'
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <AppsIcon sx={{ color: 'primary.main' }} />

        <Stack direction="row" alignItems="center" gap={0.5}>
          <SvgIcon fontSize="small" inheritViewBox sx={{ color: 'primary.main' }}>
            <TrelloIcon height="20px" width="20px" />
          </SvgIcon>

          <Typography variant="body2" fontSize="1.2rem" fontWeight="bold" color="primary.main">
            Trello
          </Typography>
        </Stack>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>

        <Button variant="outlined">Create</Button>
      </Stack>

      <Stack direction="row" alignItems="center" gap={2}>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          placeholder="Search..."
          size="small"
          sx={{ minWidth: '120px' }}
        />

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Tooltip>

        <Profiles />
      </Stack>
    </Box>
  )
}
