import React, { useState } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HeaderUserbox from './UserBox'
// icon
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useTranslation } from 'react-i18next'
import Notification from './Notification'
import Report from './Report'
import useResponsive from '../../hooks/useResponsive'
import UploadMusic from './UploadMusic'
import SearchBar from '../../common/components/SearchBox'

const Header = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7vh',
          margin: '0px 20px'
        }}
      >
        <SearchBar />
        <div>
          <Stack direction='row' spacing={isMobile ? 0 : 2} sx={{ padding: '10px' }}>
            <Box sx={isMobile ? {} : { '& > :not(style)': { m: 1 } }}>
              {user.role === 'ARTIST' && <UploadMusic />}
              {/* <Notification /> */}
              {user.role === 'USER' && (
                <>
                  <button className='become-artist' onClick={() => navigate('/user/become-artist')}>
                    Become an Artist
                  </button>
                  {/* <Tooltip title={t('createRequest')} arrow>
                    <Fab size='small' aria-label='add' onClick={() => setOpen(true)}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title={t('recharge')} arrow>
                    <Fab size='small' aria-label='recharge' onClick={() => setOpenRecharge(true)}>
                      <AttachMoneyIcon />
                    </Fab>
                  </Tooltip> */}
                  <Report />
                </>
              )}

              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
