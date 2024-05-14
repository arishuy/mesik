// @mui
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material'

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
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 48,
          height: 48,
          mr: isMobile ? 1 : 2,
          boxShadow:
            '0px 3px 5px -1px rgba(145, 158, 171, 0.2), 0px 6px 10px 0px rgba(145, 158, 171, 0.14), 0px 1px 18px 0px rgba(145, 158, 171, 0.12)'
        }}
      >
        <img src={currentLang.value === 'vi' ? vnIcon : enIcon} alt={currentLang.label} width={28} height={20} />
      </IconButton>

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
