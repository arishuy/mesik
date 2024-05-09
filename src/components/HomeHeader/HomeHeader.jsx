import React from 'react'
import { Box, Button, Typography, Stack, Tooltip, Avatar } from '@mui/material'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../hooks/useResponsive'
import SearchBar from '../../common/components/SearchBox'
const HomeHeader = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div>
      {!isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '7vh',
            margin: '0px 20px'
          }}
        >
          <Stack direction='row' spacing={2}>
            <SearchBar />
            <Tooltip title='Mesik Bot' arrow>
              <Avatar
                alt='logo'
                src='https://th.bing.com/th/id/OIG1.4gYx47L7n1GpDyVqrk3m?w=1024&h=1024&rs=1&pid=ImgDetMain'
                sx={{ width: 50, height: 50 }}
              />
            </Tooltip>
          </Stack>
          <div>
            <Stack direction='row' spacing={2} sx={{ padding: '10px' }}>
              <Button variant='text' color='secondary' onClick={() => navigate('/login')}>
                {t('signIn')}
              </Button>
              <Button
                variant='outlined'
                onClick={() => navigate('/register')}
                sx={{
                  color: 'black',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'black'
                  }
                }}
              >
                {t('register')}
              </Button>
            </Stack>
          </div>
        </Box>
      ) : (
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
            variant='h4'
            component='h4'
            onClick={() => navigate('/dashboard')}
            sx={{
              cursor: 'pointer'
            }}
          >
            <ConnectWithoutContactIcon />
            {'  '}
          </Typography>
          <div>
            <Stack direction='row' spacing={1} sx={{ padding: '10px' }}>
              <Button variant='text' color='secondary' onClick={() => navigate('/login')}>
                {t('signIn')}
              </Button>
              <Button
                variant='outlined'
                onClick={() => navigate('/register')}
                sx={{
                  color: 'black',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'black'
                  }
                }}
              >
                {t('register')}
              </Button>
            </Stack>
          </div>
        </Box>
      )}
    </div>
  )
}

export default HomeHeader
