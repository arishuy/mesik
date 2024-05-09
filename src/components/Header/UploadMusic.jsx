import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography, Tooltip, Fab } from '@mui/material'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import { GenreContext } from '../../contexts/genre.context'
import UploadPhoto from '../../common/components/UploadPhoto'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import { memo } from 'react'
import { RegionContext } from '../../contexts/region.context'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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

const UploadMusic = memo(function UploadMusic({ open, setOpen }) {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [formData, setFormData] = useState(new FormData())
  const [formMusic, setFormMusic] = useState(new FormData())
  const { genres, getGenres } = useContext(GenreContext)
  const { regions, getRegions } = useContext(RegionContext)
  const [newSong, setNewSong] = useState({
    title: '',
    release_date: dayjs(),
    duration: '',
    genre_id: '',
    region_id: '',
    file: '',
    photo: '',
    play_count: 0
  })
  const handleAddNew = async () => {
    if (newSong.title === '' || newSong.release_date === '' || newSong.photo === '' || newSong.genre_id === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    if (newSong.release_date > dayjs()) {
      setSnack({
        ...snack,
        open: true,
        message: 'Ngày phát hành không được lớn hơn ngày hiện tại',
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(
      urlConfig.music.uploadMusicByArtist,
      {
        title: newSong.title,
        release_date: newSong.release_date,
        duration: newSong.duration,
        genre_id: newSong.genre_id,
        region_id: newSong.region_id,
        file: formMusic.get('audio'),
        photo: formData.get('photo'),
        play_count: newSong.play_count
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Tải lên bài hát thành công',
          type: 'success'
        })
        setOpen(false)
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: 'Có lỗi xảy ra!',
          type: 'error'
        })
      )
  }

  const getAudioDuration = (file) => {
    const audio = document.createElement('audio')
    audio.src = URL.createObjectURL(file)
    audio.onloadedmetadata = () => {
      const duration = audio.duration
      setNewSong({
        ...newSong,
        duration: duration
      })
    }
  }
  useEffect(() => {
    getGenres()
    getRegions()
    return () => {
      setNewSong({
        title: '',
        release_date: dayjs(),
        duration: '',
        genre_id: '',
        region_id: '',
        file: '',
        photo: '',
        play_count: 0
      })
      setFormData(new FormData())
      setFormMusic(new FormData())
    }
  }, [])
  return (
    <>
      <Snackbar />
      {genres.length > 0 && (
        <RootModal
          variant='Create'
          title='Add new song'
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => {
            handleAddNew()
          }}
          closeOnly={false}
        >
          <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
            <Stack direction='row' spacing={3}>
              <TextField
                id='outlined-basic'
                label='Title'
                variant='outlined'
                fullWidth
                onChange={(e) =>
                  setNewSong({
                    ...newSong,
                    title: e.target.value
                  })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '45%', m: 2 }}>
                <DatePicker
                  label='Release Date'
                  value={dayjs(newSong.release_date)}
                  onChange={(newValue) =>
                    setNewSong({
                      ...newSong,
                      release_date: newValue
                    })
                  }
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction='row' spacing={3}>
              <TextField
                id='outlined-select-currency'
                select
                label='Genre'
                required
                defaultValue=''
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setNewSong({ ...newSong, genre_id: e.target.value })}
              >
                {genres?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='outlined-select-currency'
                select
                label='Region'
                required
                defaultValue=''
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setNewSong({ ...newSong, region_id: e.target.value })}
              >
                {regions?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            {formMusic.get('audio') && (
              <Typography variant='body2' color='text.secondary' noWrap>
                {formMusic.get('audio').name}
              </Typography>
            )}
            <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
              Upload audio
              <VisuallyHiddenInput
                type='file'
                accept='audio/mpeg, audio/mp3'
                onChange={(e) => {
                  const file = e.target.files[0]
                  let newFormData = new FormData()
                  newFormData.append('audio', file)
                  setFormMusic(newFormData)
                  const reader = new FileReader()
                  reader.readAsDataURL(file)
                  reader.onloadend = () => {
                    setNewSong({
                      ...newSong,
                      file: reader.result
                    })
                  }
                  getAudioDuration(file)
                }}
              />
            </Button>
            <UploadPhoto
              file={newSong.photo}
              setFormData={setFormData}
              information={newSong}
              setInformation={setNewSong}
            />
          </Stack>
        </RootModal>
      )}
    </>
  )
})

export default UploadMusic
