import React, { useState } from 'react'
import { Avatar, Box, Fab, Stack, Tooltip, Typography } from '@mui/material'
import HeaderUserbox from './UserBox'
// icon
import useResponsive from '../../hooks/useResponsive'
import LanguaguePopover from '../LanguagePopover/LanguagePopover'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const isMobile = useResponsive('down', 'sm')
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
        <Typography
          variant='h3'
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/')
          }}
        >
          Mesik
        </Typography>
        <div>
          <Stack direction='row' spacing={isMobile ? 0 : 2} sx={{ padding: '10px' }}>
            <Box sx={isMobile ? {} : { '& > :not(style)': { m: 1 } }}>
              <LanguaguePopover />
              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
