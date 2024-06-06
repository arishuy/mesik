import React, { useEffect, useState } from 'react'
import { TextField, List, ListItem, ListItemText, Typography, Box, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import urlConfig from '../../config/UrlConfig'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import { useDebounce } from 'use-debounce'

const SearchBar = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [mostKeyword, setMostKeyword] = useState([])
  const [relatedKeywords, setRelatedKeywords] = useState([])
  const [debouncedSearchText] = useDebounce(searchText, 500)
  const navigate = useNavigate()
  const isSearch = searchText !== ''
  console.log('searchText', searchText)

  const handleSearch = (e) => {
    const value = e.target.value
    navigate(`/search?q=${value}`)
    setSearchText(value)
  }

  const fetchMostKeyword = async () => {
    await Axios.get(urlConfig.keyword.get5Keyword)
      .then((res) => {
        setMostKeyword(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchRelatedKeyword = async () => {
    await Axios.get(urlConfig.keyword.getRelatedKeyword + `/${debouncedSearchText}`)
      .then((res) => {
        setRelatedKeywords(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMostKeyword()
  }, [])

  useEffect(() => {
    if (debouncedSearchText) {
      fetchRelatedKeyword()
    }
  }, [debouncedSearchText])

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        marginLeft: isMobile ? '0' : '80px'
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
          setSearchText(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e)
          }
        }}
        fullWidth
        placeholder={t('searchPlayholder')}
        sx={{
          '.MuiInputBase-root': {
            height: '50px',
            width: isMobile ? '100%' : '500px',
            borderRadius: '20px',
            zIndex: 999
          }
        }}
        onFocus={() => setOpen(true)}
        onBlur={() =>
          setTimeout(() => {
            setOpen(false)
          }, 100)
        }
      />
      <Box
        sx={{
          position: 'absolute',
          zIndex: 999,
          width: '500px',
          top: '50px',
          backgroundColor: 'white',
          height: 'auto',
          display: open ? 'block' : 'none'
        }}
      >
        {isSearch ? (
          <List component='nav' sx={{ width: '500px' }}>
            <Typography variant='h6' sx={{ padding: '10px', ml: 1 }}>
              {t('relatedSearch')}
            </Typography>
            <SimpleBar style={{ maxHeight: 300, overflowX: 'hidden' }} timeout={500} clickOnTrack={false}>
              {relatedKeywords.length === 0 && (
                <Typography variant='body1' sx={{ padding: '10px', ml: 1 }}>
                  {t('noResults')}
                </Typography>
              )}
              {relatedKeywords.map((result, index) => (
                <ListItem
                  key={index}
                  button
                  onMouseDown={(e) => {
                    setSearchText(result.keyword)
                    navigate(`/search?q=${result.keyword}`)
                  }}
                >
                  <TroubleshootIcon sx={{ mr: 1 }} />
                  <ListItemText
                    primary={result.keyword}
                    sx={{
                      textWrap: 'nowrap'
                    }}
                  />
                </ListItem>
              ))}
            </SimpleBar>
          </List>
        ) : (
          <List component='nav' sx={{ width: '500px' }}>
            <Typography variant='h6' sx={{ padding: '10px', ml: 1 }}>
              {t('mostSearch')}
            </Typography>
            {mostKeyword.map((result, index) => (
              <ListItem
                key={index}
                button
                onMouseDown={(e) => {
                  setSearchText(result.keyword)
                  navigate(`/search?q=${result.keyword}`)
                }}
              >
                <TrendingUpIcon sx={{ mr: 1 }} />
                <ListItemText primary={result.keyword} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </div>
  )
}

export default SearchBar
