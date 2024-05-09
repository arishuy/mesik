import React, { useEffect, useState } from 'react'
import { useMusicPlayer } from '../../contexts/music.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Button
} from '@mui/material'
import Loading from '../../common/components/Loading/Loading'
import Empty from '../../common/components/Empty'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import convertToMinutes from '../../common/utils/convertToMinutes'

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { playSong } = useMusicPlayer()
  const user = JSON.parse(localStorage.getItem('profile'))

  const fetchLikedSongs = async () => {
    await AxiosInterceptors.get(urlConfig.user.getLikedSongs)
      .then((res) => {
        setLikedSongs(res.data.songs)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const removeLikedSong = async (song_id) => {
    // like song
    await AxiosInterceptors.get(urlConfig.user.likedSongs + `/${song_id}`)
      .then((res) => {
        if (res.data.result.favourite === false) {
          user.liked_songs = user.liked_songs.filter((item) => item !== song_id)
          localStorage.setItem('profile', JSON.stringify(user))
          fetchLikedSongs()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchLikedSongs()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          Bài hát yêu thích
        </Typography>
        {likedSongs.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(likedSongs)}
          >
            Phát tất cả
          </Button>
        )}
      </Stack>
      {likedSongs.length === 0 ? (
        <Empty message={'Không có bài hát yêu thích nào!'} />
      ) : (
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Bài Hát</TableCell>
                <TableCell align='right'>Thời Lượng</TableCell>
                <TableCell align='right'>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {likedSongs.map((song) => {
                return (
                  <TableRow hover key={song._id}>
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
                    <TableCell align='right'>
                      <Typography variant='body1' color='text.primary' noWrap>
                        {convertToMinutes(song.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Xóa khỏi danh sách yêu thích' arrow>
                        <IconButton onClick={() => removeLikedSong(song._id)} color='error'>
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default LikedSongs
