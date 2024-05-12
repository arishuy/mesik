import {
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  Stack,
  Avatar,
  Button,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useParams } from 'react-router-dom'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useMusicPlayer } from '../../contexts/music.context'
import img_default from '../../assets/images/album_default.png'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import convertToMinutes from '../../common/utils/convertToMinutes'

const DetailPlaylist = () => {
  const id = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [isLoading, setIsLoading] = useState(true)
  const [isMyPlaylist, setIsMyPlaylist] = useState(false)
  const theme = useTheme()
  const { playSong } = useMusicPlayer()
  const [playlist, setPlaylist] = useState({
    title: 'Playlist 1',
    photo_url: 'https://via.placeholder.com/300',
    songs: []
  })
  const [suggestedSongs, setSuggestedSongs] = useState([])
  const fetchSuggestedSongs = async () => {
    await AxiosInterceptors.get(urlConfig.music.getRandom)
      .then((res) => {
        setSuggestedSongs(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getPlaylistById + `/${id.nameId}`)
      .then((res) => {
        setPlaylist(res.data.playlist)
        setIsMyPlaylist(res.data.playlist.user === user?._id)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addSongToPlaylist = async (song) => {
    await AxiosInterceptors.post(urlConfig.playlists.addSongToPlaylist, {
      playlist_id: id.nameId,
      song_id: song._id
    })
      .then((res) => {
        setPlaylist((prevState) => {
          return {
            ...prevState,
            songs: [...prevState.songs, song]
          }
        })
        setSuggestedSongs((prevState) => {
          return prevState.filter((item) => item._id !== song._id)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeSongFromPlaylist = async (song) => {
    await AxiosInterceptors.post(urlConfig.playlists.removeSongFromPlaylist, {
      playlist_id: id.nameId,
      song_id: song._id
    })
      .then((res) => {
        setPlaylist((prevState) => {
          return {
            ...prevState,
            songs: prevState.songs.filter((item) => item._id !== song._id)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
    fetchSuggestedSongs()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          sm={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img
            src={playlist.songs[0]?.photo_url || img_default}
            alt='playlist'
            width='350'
            style={{
              borderRadius: '10px'
            }}
          />
          <Typography variant='h3' color='text.primary'>
            {playlist.title}
          </Typography>
          <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
            Cập nhật: {moment(playlist.updateAt).format('DD/MM/YYYY')}
          </Typography>
          <Button
            sx={{
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '20px'
            }}
            onClick={() => {
              playSong(playlist.songs)
            }}
          >
            <PlayCircleFilledWhiteOutlinedIcon /> <span style={{ padding: '5px 5px' }}>Phát tất cả</span>
          </Button>
        </Grid>
        <Grid item sm={12} md={8}>
          {playlist.songs.length === 0 ? (
            <Empty message={'Không có bài hát trong playlist của bạn'} />
          ) : (
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Bài Hát</TableCell>
                    <TableCell>Thời Lượng</TableCell>
                    <TableCell align='right'>Ngày Cập Nhật</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playlist.songs.map((majorsOrder) => {
                    return (
                      <TableRow hover key={majorsOrder._id}>
                        <TableCell
                          sx={{
                            width: '500px'
                          }}
                        >
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar
                              src={majorsOrder.photo_url}
                              onClick={() => {
                                playSong([majorsOrder])
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
                                {majorsOrder.title}
                              </Typography>
                              <Typography
                                variant='subtitle1'
                                fontWeight='bold'
                                color='text.primary'
                                gutterBottom
                                noWrap
                              >
                                {majorsOrder.artist.display_name}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' noWrap>
                            {convertToMinutes(majorsOrder.duration)}
                          </Typography>
                          {isMyPlaylist && (
                            <Tooltip title='Xóa khỏi playlist' arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.palette.error.light
                                  },
                                  color: theme.palette.error.main
                                }}
                                onClick={() => {
                                  removeSongFromPlaylist(majorsOrder)
                                }}
                                color='inherit'
                                size='small'
                              >
                                <RemoveCircleOutlineOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                          <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                            {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {isMyPlaylist && (
            <>
              <Stack direction='row' justifyContent='space-between' alignItems='center' py={2}>
                <Typography variant='h4' color='text.primary'>
                  Bài Hát Ngẫu Nhiên
                </Typography>
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{
                    borderRadius: '20px'
                  }}
                  onClick={fetchSuggestedSongs}
                >
                  Làm mới
                </Button>
              </Stack>
              <TableContainer>
                <Table size='small'>
                  <TableBody>
                    {suggestedSongs.map((majorsOrder) => {
                      return (
                        <TableRow hover key={majorsOrder._id}>
                          <TableCell
                            sx={{
                              width: '500px'
                            }}
                          >
                            <Stack direction='row' spacing={2} alignItems='center'>
                              <Avatar
                                src={majorsOrder.photo_url}
                                onClick={() => {
                                  playSong([majorsOrder])
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
                                  {majorsOrder.title}
                                </Typography>
                                <Typography
                                  variant='subtitle1'
                                  fontWeight='bold'
                                  color='text.primary'
                                  gutterBottom
                                  noWrap
                                >
                                  {majorsOrder.artist.display_name}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body1' color='text.primary' noWrap>
                              {convertToMinutes(majorsOrder.duration)}
                            </Typography>
                            <Tooltip title='Thêm vào playlist' arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.palette.primary.light
                                  },
                                  color: theme.palette.primary.main
                                }}
                                onClick={() => {
                                  addSongToPlaylist(majorsOrder)
                                }}
                                color='inherit'
                                size='small'
                              >
                                <AddCircleOutlineOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                              {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                            </Typography>
                            <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                              {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default DetailPlaylist
