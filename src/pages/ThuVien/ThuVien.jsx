import { Tabs, Typography, Box, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import LikedSongs from './LikedSongs'
import HistoryListen from './HistoryListen'
import FollowingArtist from './FollowingArtist'
import HistoryUpload from './HistoryUpload'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
            <Tab label={t('recentlyListened')} {...a11yProps(1)} />
            <Tab label='Đang theo dõi' {...a11yProps(2)} />
            {user?.role === 'ARTIST' && <Tab label='Đã tải lên' {...a11yProps(3)} />}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LikedSongs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <HistoryListen />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FollowingArtist />
        </CustomTabPanel>
        {user?.role === 'ARTIST' && (
          <CustomTabPanel value={value} index={3}>
            <HistoryUpload />
          </CustomTabPanel>
        )}
      </Box>
    </div>
  )
}

export default ThuVien
