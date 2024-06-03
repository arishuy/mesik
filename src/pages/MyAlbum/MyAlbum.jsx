import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Button, Stack, IconButton } from '@mui/material'
import AddNewAlbum from './AddNewAlbum'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import DeleteConfirm from './DeleteConfirm'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import moment from 'moment'
import { Helmet } from 'react-helmet-async'

const MyAlbum = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigation = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { playSong } = useMusicPlayer()
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [albums, setAlbums] = useState([])
  const [id, setId] = useState('')
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAllAlbumsByArtist + `/${user.artist}`)
      .then((res) => {
        setAlbums(res.data.album)
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
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Album</title>
      </Helmet>
      {openAdd && <AddNewAlbum open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>Album của tôi</Typography>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => setOpenAdd(true)}
          sx={{
            borderRadius: '20px'
          }}
        >
          Tạo album mới
        </Button>
      </Box>
      {albums.length === 0 && <Empty message={'Bạn chưa có album nào'} />}
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={12} md={6} lg={3} key={album.id}>
            <div className='song-card'>
              <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{album.songs.length} bài hát</div>
                <div className='song-card_info_album'>
                  {' '}
                  {moment(album.createdAt).format('DD/MM/YYYY')} - {moment(album.createdAt).format('HH:mm')}
                </div>
                <div className='song-card_info_title'>{album.title}</div>
              </div>
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <IconButton
                    onClick={() => {
                      playSong(album.songs, false)
                    }}
                    color='success'
                  >
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => navigation(`/artist/edit-album/${album._id}`)} color='warning'>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => navigation(`/album/${album._id}`)} color='primary'>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setId(album._id)
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

export default MyAlbum
