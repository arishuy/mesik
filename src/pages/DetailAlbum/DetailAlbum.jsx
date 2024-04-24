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
import { useParams } from 'react-router-dom'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useMusicPlayer } from '../../contexts/music.context'

const DetailAlbum = () => {
  const id = useParams()
  const { playSong } = useMusicPlayer()
  const [album, setAblum] = useState({
    title: 'Album 1',
    photo_url: 'https://via.placeholder.com/300',
    songs: []
  })
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = useState(0)

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAlbumById + `/${id.nameId}`)
      .then((res) => {
        setAblum(res.data.album)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
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
            justifyContent: 'center',
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
          <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
            Cập nhật: {moment(album.updateAt).format('DD/MM/YYYY')}
          </Typography>
          <Button
            sx={{
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '20px'
            }}
            onClick={() => {
              playSong(album.songs)
            }}
          >
            <PlayCircleFilledWhiteOutlinedIcon /> <span style={{ padding: '5px 5px' }}>Phát tất cả</span>
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Bài hát</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell align='right'>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? album.songs?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : album.songs
                ).map((majorsOrder) => {
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
                        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
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
