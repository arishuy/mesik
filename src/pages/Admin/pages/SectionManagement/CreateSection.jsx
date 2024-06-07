import React from 'react'
import useResponsive from '../../../../hooks/useResponsive'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import AddNewPlaylist from './AddNewPlaylist'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import { useTranslation } from 'react-i18next'

const CreateSection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useResponsive('down', 'sm')
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    items: []
  })
  const handleCreate = async () => {
    if (data.name === '') {
      return
    }
    await AxiosInterceptors.post(urlConfig.sections.createSection, {
      name: data.name,
      items: data.items.map((item) => item._id)
    })
      .then((res) => {
        console.log(res)
        navigate(path.adminSection)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      {open && <AddNewPlaylist open={open} handleClose={() => setOpen(false)} section={data} setSection={setData} />}
      <Typography variant='h3' sx={{ margin: '1rem 0' }}>
        {t('addNew')} Section
      </Typography>
      <TextField
        label={t('name')}
        fullWidth
        sx={{ marginBottom: '1rem' }}
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value })
        }}
      />
      <Stack direction='row' spacing={2} my={2} justifyContent='space-between'>
        <Typography variant='h4' sx={{ margin: '1rem 0' }}>
          Playlist
        </Typography>
        <Button
          variant='contained'
          color='primary'
          disabled={data.items.length === 4}
          onClick={() => {
            if (data.items.length === 4) {
              return
            }
            setOpen(true)
          }}
        >
          {t('addNew')} Playlist
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {data.items.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={item._id}>
            <div className='song-card'>
              <img className='song-card_image' src={item.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{item.songs.length} bài hát</div>
                <div className='song-card_info_album'></div>
                <div className='song-card_info_title'>{item.title}</div>
              </div>
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}></Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Stack direction='row' spacing={2} mt={2}>
        <Button variant='contained' color='primary' sx={{ marginTop: '1rem' }} onClick={handleCreate}>
          {t('create')}
        </Button>
        <Button variant='outlined' color='error' sx={{ marginTop: '1rem' }} onClick={() => navigate(path.adminSection)}>
          Cancel
        </Button>
      </Stack>
    </div>
  )
}

export default CreateSection
