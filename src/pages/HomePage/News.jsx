import React from 'react'
import { Card, Grid, Typography } from '@mui/material'

const News = () => {
  return (
    <>
      <Typography variant='h4' py={3}>
        Thông báo mới từ website
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              cursor: 'pointer'
            }}
          >
            <img
              src='https://res.cloudinary.com/dzeer2rgu/image/upload/v1724556864/Rules_phf53w.png'
              alt='album'
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover'
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              cursor: 'pointer'
            }}
          >
            <img
              src='https://res.cloudinary.com/dzeer2rgu/image/upload/v1724557130/Rules_1_gtecew.png'
              alt='album'
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover'
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default News
