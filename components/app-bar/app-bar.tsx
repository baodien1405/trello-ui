import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import ModeSelect from '@/components/mode-select'
import { TrelloIcon } from '@/assets'
import { Profiles, Recent, Starred, Templates, Workspaces } from './menu-list'

export default function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <AppsIcon sx={{ color: 'white' }} />

        <Stack direction="row" alignItems="center" gap={0.5}>
          <SvgIcon fontSize="small" inheritViewBox sx={{ color: 'white' }}>
            <TrelloIcon height="20px" width="20px" />
          </SvgIcon>

          <Typography variant="body2" fontSize="1.2rem" fontWeight="bold" color="white">
            Trello
          </Typography>
        </Stack>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>

        <Button sx={{ color: 'white' }} startIcon={<LibraryAddIcon />}>
          Create
        </Button>
      </Stack>

      <Stack direction="row" alignItems="center" gap={2}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          placeholder="Search..."
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={() => setSearchValue('')}>
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: searchValue ? 'white' : 'transparent' }}
                  />
                </InputAdornment>
              )
            }
          }}
        />

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profiles />
      </Stack>
    </Box>
  )
}
