import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Empty from '../../common/components/Empty'
import { useMusicPlayer } from '../../contexts/music.context'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'

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
  Popover,
  List,
  ListItem,
  Skeleton,
  Chip
} from '@mui/material'
import convertToMinutes from '../../common/utils/convertToMinutes'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../contexts/app.context'
import { SnackbarContext } from '../../contexts/snackbar.context'
import { useNavigate } from 'react-router-dom'
const HistoryListen = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [historyListen, setHistoryListen] = useState([])
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const [hasMore, setHasMore] = useState(true)
  const user = JSON.parse(localStorage.getItem('profile'))
  const { snack, setSnack } = useContext(SnackbarContext)
  const [song, setSong] = useState({})
  const [page, setPage] = useState(2)
  const { playSong, addToPlaylist } = useMusicPlayer()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const loaderRef = useRef(null)

  const handleClick = (event, majorsOrder) => {
    setAnchorEl(event.currentTarget)
    setSong(majorsOrder)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopup = Boolean(anchorEl)
  const id = openPopup ? 'simple-popover' : undefined
  const handleLikeSong = async () => {
    // like song
    await AxiosInterceptors.get(urlConfig.user.likedSongs + `/${song._id}`)
      .then((res) => {
        if (res.data.result.favourite === true) {
          setSnack({
            ...snack,
            open: true,
            message: t('addToLibrarySuccess'),
            type: 'success'
          })
          setLikedSong((prevLikedSong) => [...prevLikedSong, song._id])
          user.liked_songs.push(song._id)
          localStorage.setItem('profile', JSON.stringify(user))
        } else {
          setSnack({
            ...snack,
            open: true,
            message: t('removeFromLibrarySuccess'),
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
  const fetchData = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    await AxiosInterceptors.get(urlConfig.user.getHistoryListen + `?limit=10&page=${page}`)
      .then((res) => {
        setHistoryListen((prevItems) => [...prevItems, ...res.data.songs])
        if (res.data.songs.length === 0) {
          setHasMore(false)
        }
      })
      .catch((err) => console.log(err))

    setPage((prevIndex) => prevIndex + 1)

    setIsLoading(false)
  }, [page, isLoading])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        fetchData()
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [fetchData])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await AxiosInterceptors.get(urlConfig.user.getHistoryListen + `?limit=10&page=1`)
        setHistoryListen(response.data.songs)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getData()
  }, [])
  return (
    <div>
      <Typography variant='h4' py={3}>
        {t('recentlyListened')}
      </Typography>
      {!isLoading && historyListen.length === 0 ? (
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
              {historyListen.map((majorsOrder) => {
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
                          <Stack direction='row'>
                            <Typography
                              variant='subtitle1'
                              fontWeight='bold'
                              color='text.primary'
                              gutterBottom
                              noWrap
                              onClick={() => {
                                navigate(`/artist/${majorsOrder.artist._id}`)
                              }}
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {majorsOrder.artist.display_name}
                            </Typography>
                            {majorsOrder.featuredArtists?.length > 0 &&
                              majorsOrder.featuredArtists?.map((artist) => (
                                <Typography
                                  variant='body2'
                                  noWrap
                                  onClick={() => {
                                    navigate(`/artist/${artist._id}`)
                                  }}
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
                        {convertToMinutes(majorsOrder.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClick(e, majorsOrder)
                        }}
                        size='small'
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {hasMore && (
        <div ref={loaderRef}>
          {isLoading && (
            <TableRow>
              <TableCell
                sx={{
                  width: '500px'
                }}
              >
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Skeleton variant='circular' width={50} height={50} />
                  <Stack direction='column' spacing={0}>
                    <Skeleton variant='text' width={200} />
                    <Skeleton variant='text' width={100} />
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align='right'>
                <Skeleton variant='text' />
              </TableCell>
            </TableRow>
          )}
        </div>
      )}

      <Popover
        id={id}
        open={openPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <List component='nav'>
          <ListItem
            button
            onClick={() => {
              handleLikeSong()
              handleClose()
            }}
          >
            {likedSong.includes(song._id) ? (
              <>
                <FavoriteBorderRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'red' }} />
                <Typography>{t('removeFromLibrary')}</Typography>
              </>
            ) : (
              <>
                <FavoriteBorderRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'blue' }} />
                <Typography>{t('addToLibrary')}</Typography>
              </>
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => {
              addToPlaylist(song)
              handleClose()
            }}
          >
            <SkipNextRoundedIcon sx={{ mr: 1, fontSize: '20px', color: 'green' }} />
            <Typography>{t('addToQueue')}</Typography>
          </ListItem>
        </List>
      </Popover>
    </div>
  )
}

export default HistoryListen
