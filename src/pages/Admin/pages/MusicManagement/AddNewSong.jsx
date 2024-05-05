import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { GenreContext } from '../../../../contexts/genre.context'
import UploadPhoto from '../../../../common/components/UploadPhoto'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'

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

const AddNewSong = ({ open, handleClose, fetchData, snack, setSnack }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(new FormData())
  const [formMusic, setFormMusic] = useState(new FormData())
  const { genres, getGenres } = useContext(GenreContext)
  const [artists, setArtists] = useState([])
  const [newSong, setNewSong] = useState({
    title: '',
    year: 2020,
    duration: '',
    genre_id: '',
    artist_id: '',
    file: '',
    photo: '',
    play_count: 0
  })
  const handleAddNew = async () => {
    if (newSong.title === '' || newSong.desyearcription === '' || newSong.photo === '' || newSong.genre_id === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(
      urlConfig.music.createMusic,
      {
        title: newSong.title,
        year: newSong.year,
        duration: newSong.duration,
        genre_id: newSong.genre_id,
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
          message: t('addNewMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorFail'),
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
      setArtists(res.data.pagination.artists)
    }
  }

  useEffect(() => {
    getGenres()
    fetchArtist()
  }, [])
  return (
    <>
      {genres.length > 0 && (
        <RootModal
          variant='Create'
          title='Add new song'
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
            <TextField
              id='outlined-basic'
              label='Year'
              variant='outlined'
              fullWidth
              type='number'
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  year: e.target.value
                })
              }
            />
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
                label='Artist'
                required
                defaultValue=''
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setNewSong({ ...newSong, artist_id: e.target.value })}
              >
                {artists?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.user.first_name} {option.user.last_name}
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
}

export default AddNewSong
