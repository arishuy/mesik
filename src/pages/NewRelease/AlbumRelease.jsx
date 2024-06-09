import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'
import Loading from '../../common/components/Loading/Loading'
const AlbumRelease = ({ allPlaylists }) => {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    await Axios.get(urlConfig.music.newRelease + '/?type=album')
      .then((res) => {
        setData(res.data.result)
        setIsLoading(false)
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
    <div>
      <Helmet>
        <title>
          {t('justReleased')} | {t('album')}
        </title>
      </Helmet>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>{t('album')}</TableCell>
              <TableCell
                align='right'
                sx={{
                  width: '300px'
                }}
              >
                {t('releaseDate')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((album, index) => {
              return (
                <TableRow hover key={album._id}>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          cursor: 'pointer',
                          borderRadius: '10px',
                          '&:hover': {
                            opacity: 0.7,
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <img
                          src={album.photo_url}
                          alt={album.title}
                          onClick={() => {
                            playSong(album.songs, false)
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            borderRadius: '10px'
                          }}
                        />
                      </Box>
                      <Stack direction='column' spacing={0}>
                        <Typography
                          variant='body1'
                          fontWeight='bold'
                          color='text.primary'
                          noWrap
                          onClick={() => navigate(`/album/${album._id}`)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {album.title}
                        </Typography>
                        <Stack direction='row'>
                          <Typography
                            variant='subtitle1'
                            fontWeight='bold'
                            color='text.primary'
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/artist/${album.artist._id}`)
                            }}
                            noWrap
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {album.artist?.display_name}
                          </Typography>
                          {album.featuredArtists?.length > 0 &&
                            album.featuredArtists?.map((artist) => (
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
                  <TableCell align='right'>{moment(album.createdAt).fromNow()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AlbumRelease
