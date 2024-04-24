import React, { useState, useEffect } from 'react'
import { Card, Grid, Typography, Box, Button, Stack, Fab } from '@mui/material'
import AddNewAlbum from './AddNewAlbum'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import DeleteConfirm from './DeleteConfirm'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'

const MyAlbum = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigation = useNavigate()
  const { playSong } = useMusicPlayer()
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [albums, setAlbums] = useState([])
  const [id, setId] = useState('')
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAllAlbumsByArtist + `/${user.artist}`)
      .then((res) => {
        setAlbums(res.data.album)
      })
      .catch((err) => {
        console.log(err)
      })
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
      {openAdd && <AddNewAlbum open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>Album của tôi</Typography>
        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}>
          Tạo album mới
        </Button>
      </Box>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item spacing={3} xs={3}>
            <Card sx={{ padding: '20px' }}>
              <Stack direction='column' alignItems='center' spacing={3}>
                <img
                  src={album.photo_url !== null ? album.photo_url : 'https://via.placeholder.com/300'}
                  alt='album'
                  width={300}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <Typography variant='h4'>
                      <strong>{album.title}</strong>
                    </Typography>
                    <Typography variant='body1'>{album.songs.length} bài hát</Typography>
                  </div>
                  <Stack direction='row' spacing={2} pt={2}>
                    <Fab
                      size='small'
                      color='secondary'
                      onClick={() => {
                        playSong(album.songs)
                      }}
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </Fab>
                    <Fab
                      size='small'
                      color='primary'
                      onClick={() => {
                        navigation(`/album/${album._id}`)
                      }}
                    >
                      <InfoOutlinedIcon />
                    </Fab>
                    <Fab
                      size='small'
                      color='error'
                      onClick={() => {
                        setId(album._id)
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

export default MyAlbum
