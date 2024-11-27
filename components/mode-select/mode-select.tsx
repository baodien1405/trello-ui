'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { useColorScheme } from '@mui/material/styles'

type Mode = 'light' | 'dark' | 'system'

export default function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleModeChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as Mode)
  }

  if (!mode) return null

  return (
    <FormControl sx={{ minWidth: '120px' }} size="small">
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
      >
        Mode
      </InputLabel>

      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleModeChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '.MuiSvgIcon-root': { color: 'white' }
        }}
      >
        <MenuItem value="light">
          <Stack direction="row" alignItems="center" gap={1}>
            <LightModeIcon fontSize="small" />
            Light
          </Stack>
        </MenuItem>
        <MenuItem value="dark">
          <Stack direction="row" alignItems="center" gap={1}>
            <DarkModeIcon fontSize="small" />
            Dark
          </Stack>
        </MenuItem>
        <MenuItem value="system">
          <Stack direction="row" alignItems="center" gap={1}>
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Stack>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
