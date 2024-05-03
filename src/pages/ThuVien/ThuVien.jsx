import { IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useMusicPlayer } from '../../contexts/music.context'
import Empty from '../../common/components/Empty'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import Loading from '../../common/components/Loading/Loading'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { useNavigate } from 'react-router-dom'

const ThuVien = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [likedSongs, setLikedSongs] = useState([])
  const navigation = useNavigate()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)

  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }
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
          fetchLikedSongs()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const checkPermission = () => {
    if (!user) {
      navigation('/login')
    }
  }
  useEffect(() => {
    fetchLikedSongs()
    checkPermission()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Thư Viện</title>
      </Helmet>
      <Typography variant='h4' py={3}>
        Bài hát yêu thích
      </Typography>
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
              {likedSongs.map((majorsOrder) => {
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
                          <Typography variant='subtitle1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.artist.display_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' color='text.primary' noWrap>
                        {convertToMinutes(majorsOrder.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Xóa khỏi danh sách yêu thích' arrow>
                        <IconButton onClick={() => removeLikedSong(majorsOrder._id)} color='error'>
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

export default ThuVien
