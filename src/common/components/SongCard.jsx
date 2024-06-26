import React, { useContext } from 'react'
import { Autocomplete, Badge, Card, IconButton, List, ListItem, Popover, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import AxiosInterceptors from '../utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { AppContext } from '../../contexts/app.context'
import { memo } from 'react'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import { useTranslation } from 'react-i18next'

const SongCard = memo(({ song, allPlaylists, snack, setSnack }) => {
  const { t } = useTranslation()
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const user = JSON.parse(localStorage.getItem('profile'))
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { playSong, addToPlaylist } = useMusicPlayer()
  const [data, setData] = React.useState({
    song_id: song._id,
    playlist_id: ''
  })
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopup = Boolean(anchorEl)
  const id = openPopup ? 'simple-popover' : undefined
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
          message: t('addToPlaylistSuccess'),
          type: 'success'
        })
        setOpen(false)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('alreadyInPlaylist'),
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
            message: t('addToLibrarySuccess'),
            type: 'success'
          })
          setLikedSong((prevLikedSong) => [...prevLikedSong, song._id])
          user.liked_songs.push(song._id)
          localStorage.setItem('profile', JSON.stringify(user))
        } else {
          setSnack({
            ...snack,
            open: true,
            message: t('removeFromLibrarySuccess'),
            type: 'success'
          })
          setLikedSong((prevLikedSong) => prevLikedSong.filter((item) => item !== song._id))
          user.liked_songs = user.liked_songs.filter((item) => item !== song._id)
          localStorage.setItem('profile', JSON.stringify(user))
        }
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
      <RootModal
        variant='Create'
        title={t('addToPlaylist')}
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
        {song.isPremium ? (
          <Badge
            color='primary'
            badgeContent={<DiamondRoundedIcon sx={{ color: 'yellow', fontSize: '20px', fontWeight: 'bold' }} />}
          >
            <img
              src={song.photo_url}
              alt='album'
              width='250px'
              style={{
                objectFit: 'contain'
              }}
            />
          </Badge>
        ) : (
          <img
            src={song.photo_url}
            alt='album'
            width='250px'
            style={{
              objectFit: 'contain'
            }}
          />
        )}

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
            <Stack direction='row'>
              <Typography
                variant='body2'
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/artist/${song.artist._id}`)
                }}
                noWrap
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {song.artist.display_name}
              </Typography>
              {song.featuredArtists?.length > 0 &&
                song.featuredArtists?.map((artist) => (
                  <Typography
                    variant='body2'
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/artist/${artist._id}`)
                    }}
                    noWrap
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    , {artist.display_name}
                  </Typography>
                ))}
            </Stack>
            <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center'>
              <Typography variant='subtitle2'>
                {song.play_count} {t('listens')}
              </Typography>{' '}
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
        </Stack>
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
            <Typography>{t('addToPlaylist')}</Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleLikeSong()
              handleClose()
            }}
          >
            {likedSong.includes(song._id) ? (
              <>
                <FavoriteBorderRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'red' }} />
                <Typography>{t('removeFromLibrary')}</Typography>
              </>
            ) : (
              <>
                <FavoriteBorderRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'blue' }} />
                <Typography>{t('addToLibrary')}</Typography>
              </>
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => {
              addToPlaylist(song)
              handleClose()
            }}
          >
            <SkipNextRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'green' }} />
            <Typography>{t('addToQueue')}</Typography>
          </ListItem>
        </List>
      </Popover>
    </>
  )
})

export default SongCard
