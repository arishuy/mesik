import React, { useEffect } from 'react'
import { Autocomplete, Card, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import AxiosInterceptors from '../utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../components/SnackBar'

const SongCard = ({ song, allPlaylists }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const { snack, setSnack } = useSnackbar()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const [data, setData] = React.useState({
    song_id: song._id,
    playlist_id: ''
  })
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }

  const handleAddToPlaylist = async () => {
    // add song to playlist
    await AxiosInterceptors.post(urlConfig.playlists.addSongToPlaylist, {
      playlist_id: data.playlist_id,
      song_id: data.song_id
    })
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Thêm bài hát thành công',
          type: 'success'
        })
        setOpen(false)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Bài hát đã có trong playlist này',
          type: 'error'
        })
      })
  }

  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Thêm vào playlist'
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
        handleOk={() => {
          handleAddToPlaylist()
        }}
        closeOnly={false}
      >
        <Autocomplete
          sx={{ m: 3 }}
          options={allPlaylists}
          getOptionLabel={(option) => option.title}
          disableCloseOnSelect
          onChange={(e, value) => {
            setData({
              ...data,
              playlist_id: value._id
            })
          }}
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label='Playlist' placeholder='Select playlist' />
          )}
        />
      </RootModal>
      <Card
        sx={{
          padding: '20px',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            transform: 'scale(1.05)'
          }
        }}
        key={song.id}
        onClick={() => handleSongClick(song)}
      >
        <img src={song.photo_url} alt='album' width='250px' />
        <Typography
          variant='h6'
          pt={2}
          noWrap
          sx={{
            width: '200px'
          }}
        >
          {song.title}
        </Typography>
        <Stack direction='row' justifyContent='space-between' spacing={1}>
          <div>
            <Typography
              variant='body2'
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/artist/${song.artist._id}`)
              }}
              noWrap
            >
              {' '}
              {song.artist.display_name}
            </Typography>
            <Typography variant='subtitle2'>{song.play_count} lượt nghe</Typography>
          </div>
          {user && (
            <div>
              <Tooltip title='Add to playlist' arrow>
                <IconButton onClick={() => setOpen(true)} color='success' size='small'>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Stack>
      </Card>
    </>
  )
}

export default SongCard
