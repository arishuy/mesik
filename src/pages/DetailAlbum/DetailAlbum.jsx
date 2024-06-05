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
  Chip
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
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const DetailAlbum = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
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
    playSong(album.songs, false)
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
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Grid container spacing={isMobile ? 0 : 2}>
        <Grid
          item
          sm={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto'
          }}
        >
          <img
            src={album.photo_url ? album.photo_url : 'https://via.placeholder.com/300'}
            alt='album'
            width='350'
            height='350'
            style={{
              borderRadius: '10px',
              objectFit: 'cover'
            }}
          />
          <Typography variant='h3' color='text.primary'>
            {album.title}
          </Typography>
          <Typography variant='h5' color='text.primary'>
            {album.artist?.display_name}
          </Typography>
          <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
            {t('update')}: {moment(album.updateAt).format('DD/MM/YYYY')}
          </Typography>
          <Button
            onClick={() => {
              handlePlayAlbum()
            }}
            startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
          >
            {t('playAll')}
          </Button>
          {user?.artist && album.artist && user?.artist === album.artist._id && (
            <Button
              sx={{
                mt: 1
              }}
              onClick={() => {
                navigate(`/artist/edit-album/${album._id}`)
              }}
              color='warning'
            >
              {t('edit')} Album
            </Button>
          )}
        </Grid>
        <Grid item md={8} sm={12}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>{t('song')}</TableCell>
                  <TableCell align='right'>{t('duration')}</TableCell>
                  {!isMobile && <TableCell align='right'>{t('releaseDate')}</TableCell>}
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
                              {majorsOrder.isPremium && (
                                <Chip
                                  label='Premium'
                                  size='small'
                                  color='primary'
                                  variant='outlined'
                                  sx={{
                                    ml: 1,
                                    fontWeight: 'bold'
                                  }}
                                />
                              )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                          {convertToMinutes(majorsOrder.duration)}
                        </Typography>
                      </TableCell>
                      {!isMobile && (
                        <TableCell align='right'>
                          <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                            {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                        </TableCell>
                      )}
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
