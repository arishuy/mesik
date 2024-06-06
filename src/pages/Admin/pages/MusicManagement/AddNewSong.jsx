import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography, Avatar, Autocomplete } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import UploadPhoto from '../../../../common/components/UploadPhoto'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Loading from '../../../../common/components/Loading/Loading'

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

const AddNewSong = ({ open, handleClose, fetchData, snack, setSnack, genres, regions }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(new FormData())
  const [formMusic, setFormMusic] = useState(new FormData())
  const [artists, setArtists] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSong, setNewSong] = useState({
    title: '',
    release_date: dayjs,
    duration: '',
    genre_id: '',
    region_id: '',
    artist_id: '',
    file: '',
    photo: '',
    play_count: 0
  })
  const handleAddNew = async () => {
    if (
      newSong.title === '' ||
      newSong.release_date === '' ||
      newSong.photo === '' ||
      newSong.genre_id === '' ||
      formMusic.get('audio') === null
    ) {
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
        message: t('releaseDateError'),
        type: 'error'
      })
      return
    }
    setIsSubmitting(true)
    setSnack({
      ...snack,
      open: true,
      message: t('uploadingSong'),
      type: 'info'
    })
    await AxiosInterceptors.post(
      urlConfig.music.createMusic,
      {
        title: newSong.title,
        release_date: newSong.release_date,
        duration: newSong.duration,
        genre_id: newSong.genre_id,
        region_id: newSong.region_id,
        artist_id: newSong.artist_id,
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
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('uploadSongSuccess'),
          type: 'success'
        })
        setIsSubmitting(false)
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('uploadSongFail'),
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
  const fetchArtist = async () => {
    const res = await AxiosInterceptors.get(urlConfig.artists.getAllArtists)
    if (res.status === 200) {
      setArtists(res.data.artists)
    }
  }

  useEffect(() => {
    fetchArtist()
  }, [])
  return isSubmitting ? (
    <Loading />
  ) : (
    <>
      {genres.length > 0 && (
        <RootModal
          variant='Create'
          title={t('uploadSong')}
          open={open}
          handleClose={handleClose}
          handleOk={() => {
            handleAddNew()
            handleClose()
          }}
          closeOnly={false}
        >
          <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
            <TextField
              id='outlined-basic'
              label={t('title')}
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
                label={t('releaseDate')}
                value={dayjs(newSong.release_date)}
                onChange={(newValue) =>
                  setNewSong({
                    ...newSong,
                    release_date: newValue
                  })
                }
              />
            </LocalizationProvider>
            <Stack direction='row' spacing={3}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('genre')}
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
                label={t('region')}
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
            <Autocomplete
              sx={{ m: 1 }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              options={artists}
              getOptionLabel={(option) => option.display_name}
              disableCloseOnSelect
              onChange={(e, value) => {
                setNewSong({
                  ...newSong,
                  artist_id: value ? value._id : ''
                })
              }}
              renderInput={(params) => <TextField {...params} variant='outlined' label={t('artist')} />}
            />
            {formMusic.get('audio') && (
              <Typography variant='body2' color='text.secondary' noWrap>
                {formMusic.get('audio').name}
              </Typography>
            )}
            <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
              {t('uploadSong')}
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
}

export default AddNewSong
