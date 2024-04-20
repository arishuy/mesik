// @mui
import { Typography, Avatar, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
//
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
const RootStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}))

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
})

const PlaceholderStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.72 }
}))

// --------------------------------------------------------------------

export default function UploadAvatar({ file, setFormData, information, setInformation }) {
  const { t } = useTranslation()
  return (
    <>
      <RootStyle>
        <DropZoneStyle>
          <Avatar alt='Remy Sharp' src={file} sx={{ width: 250, height: 250 }} />
          <Button
            variant='contained'
            component='label'
            sx={{
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '&:hover': { backgroundColor: 'transparent' },
              color: 'transparent',
              backgroundColor: 'transparent'
            }}
          >
            <PlaceholderStyle
              className='placeholder'
              sx={{
                ...(file && {
                  opacity: 0,
                  color: 'common.white',
                  bgcolor: 'grey.900'
                })
              }}
            >
              <VisuallyHiddenInput
                type='file'
                accept='.jpg, .png'
                onChange={(e) => {
                  const file = e.target.files[0]
                  let newFormData = new FormData()
                  newFormData.append('photo', file)
                  setFormData(newFormData)
                  const reader = new FileReader()
                  reader.readAsDataURL(file)
                  reader.onloadend = () => {
                    setInformation({
                      ...information,
                      photo_url: reader.result
                    })
                  }
                }}
              />
              <CloudUploadIcon sx={{ width: 24, height: 24, mb: 1 }} />
              <Typography variant='caption'>{t('uploadPhoto')}</Typography>
            </PlaceholderStyle>
          </Button>
        </DropZoneStyle>
      </RootStyle>
    </>
  )
}
