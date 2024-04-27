import React, { useEffect, useState } from 'react'
import { Card, Grid, Typography, Box, Button, Stack, Fab } from '@mui/material'
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
      <Grid container spacing={3}>
        {playlists?.map((playlist) => (
          <Grid item spacing={3} xs={3} key={playlist.id}>
            <Card sx={{ padding: '20px' }}>
              <Stack direction='row' alignItems='center' spacing={3}>
                <img src={img_default} alt='playlists' width={150} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <Typography variant='h4'>{playlist.title}</Typography>
                    <Typography variant='body1'>{playlist.songs.length} bài hát</Typography>
                  </div>
                  <Stack direction='row' spacing={2} pt={2}>
                    <Fab
                      size='small'
                      color='secondary'
                      onClick={() => {
                        playSong(playlist.songs)
                      }}
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </Fab>
                    <Fab
                      size='small'
                      color='primary'
                      onClick={() => {
                        navigation(`/playlist/${playlist._id}`)
                      }}
                    >
                      <InfoOutlinedIcon />
                    </Fab>
                    <Fab
                      size='small'
                      color='error'
                      onClick={() => {
                        setId(playlist._id)
                        setOpenDelete(true)
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Fab>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyPlaylist
