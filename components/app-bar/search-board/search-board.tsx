'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from '@mui/material'
import { useBoardListQuery } from '@/hooks'

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

    // Dùng createSearchParams của react-router-dom để tạo một cái searchPath chuẩn với q[title] để gọi lên API
    // const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
    // console.log(searchPath)

    // Gọi API...
  }, 350)

  // Khi chúng ta select chọn một cái board cụ thể thì sẽ điều hướng tới board đó luôn
  const handleSelectedBoard = (event: any, selectedBoard: any) => {
    // Phải kiểm tra nếu tồn tại một cái board cụ thể được select thì mới gọi điều hướng - navigate
    console.log(selectedBoard)
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={boardList.length === 0 ? 'No board found!' : 'Type to search board...'}
      // open={open}
      // onOpen={() => setOpen(true)}
      // onClose={() => {
      //   setOpen(false)
      // }}
      getOptionLabel={(option) => {
        return option.title
      }}
      // Options của Autocomplete nó cần đầu vào là 1 Array, mà boards của chúng ta ban đầu cần cho null để làm cái noOptionsText ở trên nên đoạn này cần thêm cái || [] vào
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
          // slotProps={{
          //   ...params.InputProps,
          //   input: {
          //     startAdornment: (
          //       <InputAdornment position="start">
          //         <SearchIcon sx={{ color: 'white' }} />
          //       </InputAdornment>
          //     ),
          //     endAdornment: (
          //       <>
          //         <InputAdornment position="end">
          //           <CircularProgress sx={{ color: 'white' }} size={20} />
          //         </InputAdornment>
          //       </>
          //     )
          //   }
          // }}
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
