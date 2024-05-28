import React, { useContext, useEffect, useState } from 'react'
import { SnackbarContext } from '../../contexts/snackbar.context'
import { AppContext } from '../../contexts/app.context'
import { useMusicPlayer } from '../../contexts/music.context'
import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  IconButton,
  Autocomplete,
  TextField
} from '@mui/material'
import { Helmet } from 'react-helmet-async'
import convertToMinutes from '../../common/utils/convertToMinutes'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RootModal from '../../components/Modal/RootModal'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Loading from '../../common/components/Loading/Loading'
import { useNavigate } from 'react-router-dom'

const GlobalRank = ({ allPlaylists }) => {
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const user = JSON.parse(localStorage.getItem('profile'))
  const [hoveredRow, setHoveredRow] = useState(null)
  const { snack, setSnack } = useContext(SnackbarContext)
  const [open, setOpen] = React.useState(false)
  const [addPlaylist, setAddPlaylist] = React.useState({
    song_id: '',
    playlist_id: ''
  })
  const [data, setData] = useState([])
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.rank.getOtherRank)
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
            message: 'Đã thêm vào thư viện',
            type: 'success'
          })
          setLikedSong((prevLikedSong) => [...prevLikedSong, song._id])
          user.liked_songs.push(song._id)
          localStorage.setItem('profile', JSON.stringify(user))
        } else {
          setSnack({
            ...snack,
            open: true,
            message: 'Đã xóa khỏi thư viện',
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
  useEffect(() => {
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>Bảng Xếp Hạng Quốc Tế</title>
      </Helmet>
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
        <Typography variant='h4' py={3}>
          Bảng Xếp Hạng Quốc Tế
        </Typography>
        {data.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(data)}
          >
            Phát tất cả
          </Button>
        )}
      </Stack>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Bài Hát</TableCell>
              <TableCell align='center'>Thời Lượng</TableCell>
              <TableCell align='right'>Lượt Nghe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((song, index) => {
              return (
                <TableRow
                  hover
                  key={song._id}
                  onMouseEnter={() => setHoveredRow(song._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell align='left'>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='h4' color='text.primary' noWrap>
                        {index + 1}
                      </Typography>
                    </Stack>
                  </TableCell>
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
                              color: 'blue',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {song.artist?.display_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
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
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {song.play_count}
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

export default GlobalRank
