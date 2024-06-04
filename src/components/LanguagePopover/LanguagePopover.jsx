// @mui
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Stack, IconButton, Popover, Fab } from '@mui/material'

// hooks
import { useState } from 'react'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'
import vnIcon from '../../assets/icons/ic_flag_vi.svg'
import enIcon from '../../assets/icons/ic_flag_en.svg'

const LANGS = [
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: '../../assets/icons/ic_flag_vi.svg'
  },
  {
    value: 'en',
    label: 'English',
    icon: '../../assets/icons/ic_flag_en.svg'
  }
]

const StyledRoot = styled(Box)(({ theme }) => ({
  boxShadow: 'none',
  padding: '8px'
}))

// -------------------------------------------------------------------

export default function LanguagePopover() {
  const { t, i18n } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const currentLang = LANGS.find((lang) => lang.value === i18n.language)

  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleClick = (lang) => {
    i18n.changeLanguage(lang)
    setOpen(null)
  }

  return (
    <>
      <Fab
        size='small'
        onClick={handleOpen}
        sx={{
          padding: 1
        }}
      >
        <img src={currentLang.value === 'vi' ? vnIcon : enIcon} alt={currentLang.label} width={28} height={20} />
      </Fab>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <StyledRoot>
          <Stack spacing={0.75}>
            {LANGS.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === i18n.language}
                onClick={() => handleClick(option.value)}
              >
                <Box
                  component='img'
                  alt={option.label}
                  src={option.value === 'vi' ? vnIcon : enIcon}
                  sx={{ width: 28, mr: 2 }}
                />
                {t(option.value)}
              </MenuItem>
            ))}
          </Stack>
        </StyledRoot>
      </Popover>
    </>
  )
}
