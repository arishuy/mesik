import React from 'react'
import { Card, Grid, Stack, Typography, Box, Avatar } from '@mui/material'

const HomePage = () => {
  return (
    <div style={{
      padding: "20px 100px"
    }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card sx={{ padding: '20px' }}>
            <img src='https://via.placeholder.com/200' alt='album' />
          </Card>
          <Typography variant='h4' py={3}>
            Playlist cho bạn
          </Typography>
          <Card sx={{ padding: '20px' }}>
            <img src='https://via.placeholder.com/200' alt='album' />
          </Card>
          <Typography variant='h4' py={3}>
            Vừa phát hành
          </Typography>
          <Stack direction='row' spacing={2}>
            <Card sx={{ padding: '20px' }}>
              <img src='https://via.placeholder.com/200' alt='album' />
            </Card>
            <Card sx={{ padding: '20px' }}>
              <img src='https://via.placeholder.com/200' alt='album' />
            </Card><Card sx={{ padding: '20px' }}>
              <img src='https://via.placeholder.com/200' alt='album' />
            </Card><Card sx={{ padding: '20px' }}>
              <img src='https://via.placeholder.com/200' alt='album' />
            </Card>
            </Stack>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ padding: '20px' }}>
            <Typography variant='h4'>
              Nghệ sĩ nổi tiếng
            </Typography>
            <Stack spacing={2} py={2}>
              <Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
              </Stack>
              <Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
              </Stack><Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
              </Stack><Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
              </Stack>
            </Stack>
          </Card>
          <Card sx={{ padding: '20px', my: 2 }} >
            <Typography variant='h4'>
              Vừa nghe
            </Typography>
            <Stack spacing={2} py={2}>
              <Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
              </Stack>
              <Stack direction='row' alignItems="center">
                <Avatar alt='artist' src='https://via.placeholder.com/100'  sx={{ width: 100, height: 100 }} />
              <Typography variant='h6' padding={3}>Adele</Typography>
             
              </Stack>
            </Stack>
          </Card>
          </Grid>
      </Grid>
    </div>
  )
}

export default HomePage