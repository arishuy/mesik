import React, { useEffect, useState } from 'react'
import { TextField, List, ListItem, ListItemText, Typography, Popover } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import urlConfig from '../../config/UrlConfig'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [mostKeyword, setMostKeyword] = useState([])

  const navigate = useNavigate()

  const handleSearch = (e) => {
    const value = e.target.value
    navigate(`/search?q=${value}`)
    setSearchText(value)
    // Tính toán kết quả tìm kiếm ở đây, bạn có thể gọi API h   oặc xử lý dữ liệu ở đây.
    // Ví dụ, ở đây sẽ là một danh sách giả định:
    const mockData = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']
    const filteredResults = mockData.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    setSearchResults(filteredResults)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const fetchMostKeyword = async () => {
    await Axios.get(urlConfig.keyword.get5Keyword)
      .then((res) => {
        setMostKeyword(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMostKeyword()
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        marginLeft: '80px'
      }}
    >
      <TextField
        id='input-with-icon-textfield'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant='outlined'
        value={searchText}
        onChange={(e) => {
          // if enter key is pressed
          if (e.key === 'Enter') {
            handleSearch(e)
          } else setSearchText(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e)
          }
        }}
        fullWidth
        placeholder='Tìm kiếm bài hát, nghệ sĩ...'
        sx={{
          '.MuiInputBase-root': {
            height: '50px',
            width: '300px',
            borderRadius: '20px',
            zIndex: 999
          }
        }}
        onClick={handlePopoverOpen}
      />
      <Popover
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <List component='nav' sx={{ width: '300px' }}>
          <Typography variant='h6' sx={{ padding: '10px', ml: 1 }}>
            Đề xuất cho bạn
          </Typography>
          {mostKeyword.map((result, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                navigate(`/search?q=${result.keyword}`)
              }}
            >
              <TrendingUpIcon sx={{ mr: 1 }} />
              <ListItemText primary={result.keyword} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  )
}

export default SearchBar
