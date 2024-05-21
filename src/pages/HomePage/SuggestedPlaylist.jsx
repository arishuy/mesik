import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import useSnackbar from '../../contexts/snackbar.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import Empty from '../../common/components/Empty'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SuggestedPlaylist = () => {
  const { t } = useTranslation()
  const [playlists, setPlaylists] = useState([])
  const navigate = useNavigate()
  const { snack, setSnack } = useSnackbar()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const handleAddToPlaylist = async (playlist_id) => {
    await AxiosInterceptors.put(urlConfig.suggestedPlaylists.addToMyPlaylist + `/${playlist_id}`).then((res) => {
      setSnack({
        ...snack,
        open: true,
        message: 'Đã thêm vào playlist của bạn!',
        type: 'success'
      })
    })
    fetchData().catch((err) => {
      console.log(err)
    })
  }

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.suggestedPlaylists.getSuggestedPlaylist)
      .then((res) => {
        setPlaylists(res.data.suggestedPlaylists)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Typography variant='h4' py={3}>
        {t('playlistForYou')}
      </Typography>
      <Grid container spacing={2}>
        {isLoading && (
          <Skeleton
            variant='rounded'
            height={200}
            animation='wave'
            sx={{
              width: '100%'
            }}
          />
        )}
        {!isLoading && playlists.length === 0 && (
          <Grid item xs={12}>
            <Empty message={'Hãy nghe nhạc và tận hưởng âm nhạc cùng chúng tôi!'} />
          </Grid>
        )}
        {playlists.map((playlist) => (
          <Grid item xs={12} md={6} lg={3} key={playlist.playlist._id}>
            <div
              className='song-card'
              onClick={() => {
                navigate(`/playlist/${playlist.playlist._id}`)
              }}
            >
              <img
                className='song-card_image'
                src={playlist.playlist.songs[0]?.photo_url}
                alt='David Bowie - Aladdin Sane'
              />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{playlist.playlist.songs.length} bài hát</div>
                <div className='song-card_info_album'></div>
                <div className='song-card_info_title'>{playlist.playlist.title}</div>
              </div>
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <Tooltip title='Phát ngay'>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        playSong(playlist.playlist.songs)
                      }}
                      color='success'
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Thêm vào playlist'>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToPlaylist(playlist.playlist._id)
                      }}
                      color='primary'
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default SuggestedPlaylist
