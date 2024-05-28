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
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import convertToMinutes from '../../common/utils/convertToMinutes'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RootModal from '../../components/Modal/RootModal'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useNavigate } from 'react-router-dom'

const DailyRank = ({ allPlaylists }) => {
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
  const [data, setData] = useState([
    {
      song: {},
      todayRank: 0,
      yesterdayRank: 0,
      rankChange: 0
    }
  ])
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.rank.getDailyRank)
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
        <title>Bảng Xếp Hạng Hàng Ngày</title>
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
          Bảng Xếp Hạng Hàng Ngày
        </Typography>
        {data.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(data.map((item) => item.song))}
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
            {data?.map((majorsOrder) => {
              return (
                <TableRow
                  hover
                  key={majorsOrder.song._id}
                  onMouseEnter={() => setHoveredRow(majorsOrder.song._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell align='left'>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='h4' color='text.primary' noWrap>
                        {majorsOrder.todayRank}
                      </Typography>
                      {majorsOrder.rankChange > 0 ? (
                        <>
                          <Stack direction='row' alignItems='center'>
                            <ArrowDropUpRoundedIcon style={{ color: 'green' }} />
                            <Typography variant='body1' color='green' noWrap fontWeight='bold'>
                              {majorsOrder.rankChange}
                            </Typography>
                          </Stack>
                        </>
                      ) : majorsOrder.rankChange === 0 ? (
                        <RemoveRoundedIcon style={{ color: 'blue', padding: '5px', marginLeft: '5px' }} />
                      ) : majorsOrder.rankChange === 'NEW' ? (
                        <Stack direction='row' alignItems='center'>
                          <SwitchAccessShortcutRoundedIcon style={{ color: 'blue', padding: '5px' }} />
                          <Typography variant='subtile1' color='blue' fontWeight='bold' noWrap>
                            {majorsOrder.rankChange}
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction='row' alignItems='center'>
                          <ArrowDropDownRoundedIcon style={{ color: 'red' }} />
                          <Typography variant='body1' color='red' noWrap fontWeight='bold'>
                            {majorsOrder.rankChange.toString().replace('-', '')}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar
                        src={majorsOrder.song.photo_url}
                        onClick={() => {
                          playSong([majorsOrder.song])
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
                          {majorsOrder.song.title}
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          fontWeight='bold'
                          color='text.primary'
                          noWrap
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/artist/${majorsOrder.song.artist._id}`)
                          }}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'blue',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {majorsOrder.song.artist?.display_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                      {hoveredRow === majorsOrder.song._id && isAuthenticated ? (
                        <>
                          <IconButton
                            onClick={() => handleLikeSong(majorsOrder.song)}
                            color={likedSong.includes(majorsOrder.song._id) ? 'success' : 'default'}
                          >
                            <FavoriteRoundedIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setOpen(true)
                              setAddPlaylist({
                                ...addPlaylist,
                                song_id: majorsOrder.song._id
                              })
                            }}
                            color='primary'
                          >
                            <AddCircleRoundedIcon />
                          </IconButton>
                        </>
                      ) : (
                        convertToMinutes(majorsOrder.song.duration)
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {majorsOrder.song.play_count_daily}
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

export default DailyRank
