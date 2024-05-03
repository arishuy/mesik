import React, { useContext } from 'react'
import { Autocomplete, Card, IconButton, List, ListItem, Popover, Stack, TextField, Typography } from '@mui/material'
import { useMusicPlayer } from '../../contexts/music.context'
import RootModal from '../../components/Modal/RootModal'
import AxiosInterceptors from '../utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../components/SnackBar'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'

const SongCardVer2 = ({ song, allPlaylists }) => {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const { snack, setSnack } = useSnackbar()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [data, setData] = React.useState({
    song_id: song._id,
    playlist_id: ''
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopup = Boolean(anchorEl)
  const id = openPopup ? 'simple-popover' : undefined
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
  const handleLikeSong = async () => {
    // like song
    await AxiosInterceptors.get(urlConfig.user.likedSongs + `/${song._id}`)
      .then((res) => {
        if (res.data.result.favourite === true) {
          setSnack({
            ...snack,
            open: true,
            message: 'Đã thêm vào thư viện',
            type: 'success'
          })
        } else
          setSnack({
            ...snack,
            open: true,
            message: 'Đã xóa khỏi thư viện',
            type: 'success'
          })
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Bài hát đã có trong thư viện',
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            transform: 'scale(1.05)'
          }
        }}
        onClick={() => playSong([song])}
      >
        <div>
          <Stack direction='row' spacing={3}>
            <img src={song.photo_url} alt='album' width={100} />
            <Stack direction='column' justifyContent='center' alignItems='start'>
              <Typography variant='h6'>{song.title}</Typography>
              <Typography
                variant='body2'
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/artist/${song.artist._id}`)
                }}
              >
                {song.artist.display_name}
              </Typography>
              <Typography variant='subtitle2'>{song.play_count} lượt nghe</Typography>
            </Stack>
          </Stack>
        </div>
        {isAuthenticated && (
          <div>
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                handleClick(e)
              }}
              size='small'
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        )}
      </Card>
      <Popover
        id={id}
        open={openPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <List component='nav'>
          <ListItem
            button
            onClick={() => {
              handleClose()
              setOpen(true)
            }}
          >
            <AddRoundedIcon sx={{ mr: 1, fontSize: '20px' }} />
            <Typography>Thêm vào playlist</Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleLikeSong()
              handleClose()
            }}
          >
            <FavoriteBorderRoundedIcon sx={{ mr: 1, fontSize: '20px' }} />
            <Typography>Thêm vào thư viện</Typography>
          </ListItem>
        </List>
      </Popover>
    </>
  )
}

export default SongCardVer2
