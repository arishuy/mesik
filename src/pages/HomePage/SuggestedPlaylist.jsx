import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import useSnackbar from '../../contexts/snackbar.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

const SuggestedPlaylist = () => {
  const [playlists, setPlaylists] = useState([])
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
        Playlist cho bạn
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
        {playlists.map((playlist) => (
          <Grid item xs={12} md={6} lg={3} key={playlist.playlist._id}>
            <div className='song-card'>
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
                  <IconButton onClick={() => playSong(playlist.playlist.songs)} color='success'>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleAddToPlaylist(playlist.playlist._id)} color='primary'>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
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
