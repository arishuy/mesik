import React, { useContext, useEffect, useState } from 'react'
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
import { SnackbarContext } from '../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LikedSongs = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [likedSongs, setLikedSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { playSong } = useMusicPlayer()
  const { snack, setSnack } = useContext(SnackbarContext)
  const user = JSON.parse(localStorage.getItem('profile'))

  const fetchLikedSongs = async () => {
    await AxiosInterceptors.get(urlConfig.user.getLikedSongs)
      .then((res) => {
        // reverse array to show the latest liked song first
        setLikedSongs(res.data.songs.reverse())
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
          setSnack({
            ...snack,
            open: true,
            message: 'Xóa bài hát yêu thích thành công',
            type: 'success'
          })
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Xóa bài hát yêu thích thất bại',
          type: 'error'
        })
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
          {t('likedSongs')}
        </Typography>
        {likedSongs.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(likedSongs, false)}
          >
            {t('playAll')}
          </Button>
        )}
      </Stack>
      {likedSongs.length === 0 ? (
        <Empty message={t('noData')} />
      ) : (
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>{t('song')}</TableCell>
                <TableCell align='right'>{t('duration')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
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
                          <Stack direction='row'>
                            <Typography
                              variant='subtitle1'
                              fontWeight='bold'
                              color='text.primary'
                              gutterBottom
                              noWrap
                              onClick={() => navigate(`/artist/${song.artist._id}`)}
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {song.artist.display_name}
                            </Typography>
                            {song.featuredArtists?.length > 0 &&
                              song.featuredArtists?.map((artist) => (
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
                    <TableCell align='right'>
                      <Typography variant='subtitle1' color='text.primary' noWrap>
                        {convertToMinutes(song.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title={t('delete')} arrow>
                        <IconButton onClick={() => removeLikedSong(song._id)} color='error' size='small'>
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
