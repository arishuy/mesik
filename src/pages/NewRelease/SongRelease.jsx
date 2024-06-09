import React, { useContext, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  IconButton,
  Autocomplete,
  TextField,
  Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import { SnackbarContext } from '../../contexts/snackbar.context'
import { AppContext } from '../../contexts/app.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import convertToMinutes from '../../common/utils/convertToMinutes'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RootModal from '../../components/Modal/RootModal'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'
import Loading from '../../common/components/Loading/Loading'
const SongRelease = ({ allPlaylists }) => {
  const [addPlaylist, setAddPlaylist] = React.useState({
    song_id: '',
    playlist_id: ''
  })
  const { t } = useTranslation()
  const [region, setRegion] = useState(0)
  const [data, setData] = useState([])
  const [hoveredRow, setHoveredRow] = useState(null)
  const [open, setOpen] = React.useState(false)
  const { snack, setSnack } = useContext(SnackbarContext)
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const user = JSON.parse(localStorage.getItem('profile'))
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    await Axios.get(urlConfig.music.newRelease + '/?type=song')
      .then((res) => {
        setData(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleLikeSong = async (song) => {
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
  const handleAddToPlaylist = async () => {
    // add song to playlist
    await AxiosInterceptors.post(urlConfig.playlists.addSongToPlaylist, {
      playlist_id: addPlaylist.playlist_id,
      song_id: addPlaylist.song_id
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

  const visibleData = useMemo(() => {
    if (region === 0) {
      return data
    } else if (region === 1) {
      return data.filter((song) => song.region.name === 'Việt Nam')
    } else {
      return data.filter((song) => song.region.name !== 'Việt Nam')
    }
  }, [region, data])

  useEffect(() => {
    fetchData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>
          {t('ranking')} {t('vietnam')}
        </title>
      </Helmet>
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
            setAddPlaylist({
              ...addPlaylist,
              playlist_id: value._id
            })
          }}
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label='Playlist' placeholder='Select playlist' />
          )}
        />
      </RootModal>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' spacing={1} alignItems='center' mb={2}>
          <Chip label={t('all')} onClick={() => setRegion(0)} color={region === 0 ? 'primary' : 'default'} />
          <Chip label={t('vietnam')} onClick={() => setRegion(1)} color={region === 1 ? 'primary' : 'default'} />
          <Chip label={t('another')} onClick={() => setRegion(2)} color={region === 2 ? 'primary' : 'default'} />
        </Stack>
        {visibleData.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(visibleData, false)}
          >
            {t('playAll')}
          </Button>
        )}
      </Stack>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>{t('song')}</TableCell>
              <TableCell
                align='right'
                sx={{
                  width: '300px'
                }}
              >
                {t('releaseDate')}
              </TableCell>
              <TableCell align='right'>{t('duration')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleData?.map((song, index) => {
              return (
                <TableRow
                  hover
                  key={song._id}
                  onMouseEnter={() => setHoveredRow(song._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar
                        src={song.photo_url}
                        onClick={() => {
                          playSong([song])
                        }}
                        sx={{
                          width: 50,
                          height: 50,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.7,
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                      <Stack direction='column' spacing={0}>
                        <Typography variant='body1' fontWeight='bold' color='text.primary' noWrap>
                          {song.title}
                        </Typography>
                        <Stack direction='row'>
                          <Typography
                            variant='subtitle1'
                            fontWeight='bold'
                            color='text.primary'
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
                            {song.artist?.display_name}
                          </Typography>
                          {song.featuredArtists?.length > 0 &&
                            song.featuredArtists?.map((artist) => (
                              <Typography
                                variant='body2'
                                noWrap
                                onClick={() => navigate(`/artist/${artist._id}`)}
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
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='right'>{moment(song.release_date).fromNow()}</TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      width: '300px'
                    }}
                  >
                    <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                      {hoveredRow === song._id && isAuthenticated ? (
                        <>
                          <IconButton
                            onClick={() => handleLikeSong(song)}
                            color={likedSong.includes(song._id) ? 'success' : 'default'}
                          >
                            <FavoriteRoundedIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setOpen(true)
                              setAddPlaylist({
                                ...addPlaylist,
                                song_id: song._id
                              })
                            }}
                            color='primary'
                          >
                            <AddCircleRoundedIcon />
                          </IconButton>
                        </>
                      ) : (
                        convertToMinutes(song.duration)
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SongRelease
