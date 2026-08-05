'use client'

import { useMemo, useState, type SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Autocomplete, { type AutocompleteInputChangeReason } from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from '@mui/material/utils'

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

  const handleInputSearchChange = useMemo(
    () =>
      debounce((_event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
        if (reason !== 'input' || !value) return

        setFilters((prevState) => ({
          ...prevState,
          'q[title]': value
        }))
      }, 350),
    []
  )

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
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.title}
      options={boardList}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={boardListQuery.isFetching}
      onInputChange={handleInputSearchChange}
      onChange={handleSelectedBoard}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          placeholder="Search..."
          size="small"
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {boardListQuery.isFetching ? (
                    <CircularProgress sx={{ color: 'white' }} size={20} />
                  ) : null}
                  {params.slotProps.input.endAdornment}
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
