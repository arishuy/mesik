import React, { useEffect, useState } from 'react'
import { Card, Grid, Typography, Box, Button, Stack, Fab, IconButton } from '@mui/material'
import AddNewPlaylist from './AddNewPlaylist'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import DeleteConfirm from './DeleteConfirm'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import img_default from '../../assets/images/album_default.png'
import moment from 'moment'
import Empty from '../../common/components/Empty'

const MyPlaylist = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigation = useNavigate()
  const { playSong } = useMusicPlayer()
  const [playlists, setPlaylists] = useState([])
  const [openDelete, setOpenDelete] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [id, setId] = useState('')

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setPlaylists(res.data.playlists)
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
    checkPermission()
    fetchData()
  }, [])
  return (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      {openAdd && <AddNewPlaylist open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>Playlist của tôi</Typography>
        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}>
          Tạo playlist mới
        </Button>
      </Box>
      {playlists.length === 0 && <Empty message={'Bạn chưa có playlist nào'} />}
      <Grid container spacing={3}>
        {playlists?.map((playlist) => (
          <Grid item spacing={3} xs={3} key={playlist.id}>
            <div class='song-card'>
              <img
                class='song-card_image'
                src={playlist.songs[0]?.photo_url || img_default}
                alt='David Bowie - Aladdin Sane'
              />
              <div class='song-card_info'>
                <div class='song-card_info_artist'>{playlist.songs.length} bài hát</div>
                <div class='song-card_info_album'>
                  {' '}
                  {moment(playlist.createdAt).format('DD/MM/YYYY')} - {moment(playlist.createdAt).format('HH:mm')}
                </div>
                <div class='song-card_info_title'>{playlist.title}</div>
              </div>
              <div class='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <IconButton onClick={() => playSong(playlist.songs)} color='success'>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => navigation(`/playlist/${playlist._id}`)} color='primary'>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setId(playlist._id)
                      setOpenDelete(true)
                    }}
                    color='error'
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyPlaylist