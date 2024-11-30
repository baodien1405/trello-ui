'use client'

import { useState } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type ToggleFocusInputProps = TextFieldProps & {
  value?: string
  inputFontSize?: string
  onChangedValue?: (value: string) => void
}

export default function ToggleFocusInput({
  value = '',
  onChangedValue = () => {},
  inputFontSize = '16px',
  ...props
}: ToggleFocusInputProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleBlur = () => {
    setInputValue(inputValue.trim())

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    onChangedValue(inputValue)
  }

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value)
      }}
      onBlur={handleBlur}
      {...props}
      sx={{
        '& label': {},
        '& input': { fontSize: inputFontSize, fontWeight: 'bold' },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#33485D' : 'white'),
          '& fieldset': { borderColor: 'primary.main' }
        },
        '& .MuiOutlinedInput-input': {
          px: '6px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }}
    />
  )
}
