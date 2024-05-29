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
  Button
} from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useNavigate, useParams } from 'react-router-dom'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useMusicPlayer } from '../../contexts/music.context'
import Loading from '../../common/components/Loading/Loading'
import convertToMinutes from '../../common/utils/convertToMinutes'

const DetailAlbum = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const id = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { playSong } = useMusicPlayer()
  const [album, setAblum] = useState({
    title: 'Album 1',
    photo_url: 'https://via.placeholder.com/300',
    songs: []
  })
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAlbumById + `/${id.nameId}`)
      .then((res) => {
        setAblum(res.data.album)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handlePlayAlbum = async () => {
    playSong(album.songs)
    await AxiosInterceptors.post(`${urlConfig.albums.playAlbum}/play`, {
      id: id.nameId
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
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
          xs={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img
            src={album.photo_url ? album.photo_url : 'https://via.placeholder.com/300'}
            alt='album'
            width='350'
            style={{
              borderRadius: '10px'
            }}
          />
          <Typography variant='h3' color='text.primary'>
            {album.title}
          </Typography>
          <Typography variant='h5' color='text.primary'>
            {album.artist?.display_name}
          </Typography>
          <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
            Cập nhật: {moment(album.updateAt).format('DD/MM/YYYY')}
          </Typography>
          <Button
            onClick={() => {
              handlePlayAlbum()
            }}
            startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
          >
            Phát tất cả
          </Button>
          {user.artist && album.artist && user.artist === album.artist._id && (
            <Button
              sx={{
                mt: 1
              }}
              onClick={() => {
                navigate(`/artist/edit-album/${album._id}`)
              }}
              color='warning'
            >
              Sửa Album
            </Button>
          )}
        </Grid>
        <Grid item xs={8}>
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
                {album.songs.map((majorsOrder) => {
                  return (
                    <TableRow hover key={majorsOrder._id}>
                      <TableCell>
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
                            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                              {majorsOrder.title}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                          {convertToMinutes(majorsOrder.duration)}
                        </Typography>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default DetailAlbum
