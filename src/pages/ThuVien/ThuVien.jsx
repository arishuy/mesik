import { Tabs, Typography, Box, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import LikedSongs from './LikedSongs'
import HistoryListen from './HistoryListen'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
const ThuVien = () => {
  const [value, setValue] = React.useState(0)
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigation = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const checkPermission = () => {
    if (!user) {
      navigation('/login')
    }
  }
  useEffect(() => {
    checkPermission()
  }, [])
  return (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Thư Viện</title>
      </Helmet>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Bài hát yêu thích' {...a11yProps(0)} />
            <Tab label='Nghe gần đây' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LikedSongs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <HistoryListen />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default ThuVien
