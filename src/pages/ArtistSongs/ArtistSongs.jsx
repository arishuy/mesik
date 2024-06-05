import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import Loading from '../../common/components/Loading/Loading'
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import moment from 'moment'
import { useMusicPlayer } from '../../contexts/music.context'
import convertToMinutes from '../../common/utils/convertToMinutes'
import { AppContext } from '../../contexts/app.context'
import { SnackbarContext } from '../../contexts/snackbar.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RootModal from '../../components/Modal/RootModal'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const ArtistSongs = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const user = JSON.parse(localStorage.getItem('profile'))
  const [pageCount, setPageCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [songs, setSongs] = useState([])
  const [hoveredRow, setHoveredRow] = useState(null)
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const { playSong } = useMusicPlayer()
  const { snack, setSnack } = useContext(SnackbarContext)
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({
    song_id: '',
    playlist_id: ''
  })
  const param = useParams()
  const [allPlaylists, setAllPlaylists] = React.useState([])

  const fetchAllPlaylists = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setAllPlaylists(res.data.playlists)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchData = async () => {
    await Axios.get(urlConfig.music.getAllMusicByArtist + `/${param.nameId}?limit=10&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.songs) {
            setSongs(res.data.pagination.songs)
            setTotalPages(res.data.pagination.totalPages)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
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

  useEffect(() => {
    setIsLoading(true)
    isAuthenticated && fetchAllPlaylists()
    fetchData()
  }, [pageCount])

  return isLoading ? (
    <Loading />
  ) : (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
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
      <Helmet>
        <title>{t('allSongs')}</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          {songs.length > 0 ? songs[0].artist.display_name : ''} {!isMobile && ' - ' + t('allSongs')}
        </Typography>
        {songs.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(songs, false)}
          >
            {t('playAll')}
          </Button>
        )}
      </Stack>

      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: '500px'
                }}
              >
                {t('song')}
              </TableCell>
              <TableCell>{t('duration')}</TableCell>
              <TableCell align='right'>{t('releaseDate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => {
              return (
                <TableRow
                  hover
                  key={song._id}
                  onMouseEnter={() => setHoveredRow(song._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell
                    sx={{
                      width: '500px'
                    }}
                  >
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
                        <Typography variant='subtitle1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {song.artist.display_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
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
                              setData({
                                ...data,
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
                  <TableCell align='right'>
                    <Typography variant='body1' color='text.primary' fontWeight='bold' gutterBottom noWrap>
                      {moment(song.release_date).format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2
          }}
        />
      </Box>
    </div>
  )
}

export default ArtistSongs
