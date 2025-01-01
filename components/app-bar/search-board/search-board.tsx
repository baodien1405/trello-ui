'use client'

import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from '@mui/material'

import { useBoardListQuery } from '@/hooks'
import { RoutePath } from '@/constants'
import { Board } from '@/models'

export function SearchBoard() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    page: 1,
    limit: 100
  })
  const [open, setOpen] = useState(false)
  const boardListQuery = useBoardListQuery(filters)
  const boardList = boardListQuery.data?.metadata?.results || []

  const handleInputSearchChange = debounce((event: any) => {
    const searchValue = event.target?.value
    if (!searchValue) return

    setFilters((prevState) => ({
      ...prevState,
      'q[title]': searchValue
    }))
  }, 350)

  const handleSelectedBoard = (_event: SyntheticEvent, selectedBoard: Board | null) => {
    if (selectedBoard) {
      router.push(`${RoutePath.BOARDS}/${selectedBoard._id}`)
    }
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={boardList.length === 0 ? 'No board found!' : 'Type to search board...'}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={(option) => {
        return option.title
      }}
      options={boardList}
      isOptionEqualToValue={(option, value) => {
        return option._id === value._id
      }}
      loading={boardListQuery.isLoading}
      onInputChange={handleInputSearchChange}
      onChange={handleSelectedBoard}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          placeholder="Search..."
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    {boardListQuery.isLoading ? (
                      <CircularProgress sx={{ color: 'white' }} size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                </>
              )
            }
          }}
          sx={{
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            },
            '.MuiSvgIcon-root': { color: 'white' }
          }}
        />
      )}
    />
  )
}
