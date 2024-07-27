import React, { useState } from 'react'
import { Avatar, Box, Fab, Stack, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HeaderUserbox from './UserBox'
// icon
import { useTranslation } from 'react-i18next'
import Report from './Report'
import useResponsive from '../../hooks/useResponsive'
import UploadMusic from './UploadMusic'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import SearchBar from '../../common/components/SearchBox'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LanguaguePopover from '../LanguagePopover/LanguagePopover'

import Recharge from './Recharge'

const Header = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [openRecharge, setOpenRecharge] = React.useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: isMobile ? 'auto' : '7vh',
          margin: isMobile ? 0 : '0px 20px'
        }}
      >
        <Stack direction='row' spacing={2}>
          <SearchBar />
        </Stack>

        {openRecharge && <Recharge openRecharge={openRecharge} setOpenRecharge={setOpenRecharge} />}

        <div>
          <Stack direction='row' spacing={isMobile ? 0 : 2} sx={{ padding: '10px' }}>
            <Box
              sx={
                isMobile
                  ? {
                      zIndex: 1
                    }
                  : { '& > :not(style)': { m: 1 } }
              }
            >
              {user && user.role === 'ARTIST' && open && <UploadMusic open={open} setOpen={setOpen} />}
              {/* {user.role === 'ARTIST' && (
                <>
                  <Tooltip title={t('uploadSong')} arrow>
                    <Fab size='small' aria-label='notifi' onClick={() => setOpen(true)}>
                      <FileUploadOutlinedIcon />
                    </Fab>
                  </Tooltip>
                </>
              )} */}
              {/* <Notification /> */}
              {user.role === 'USER' && (
                <>
                  <button className='become-artist' onClick={() => navigate('/user/become-artist')}>
                    {t('becomeArtist')}
                  </button>
                </>
              )}
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
