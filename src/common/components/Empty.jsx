import React from 'react'
import { Card, Stack, Typography } from '@mui/material'
import empty from '../../assets/images/empty.png'

const Empty = ({ message }) => {
  return (
    <Card sx={{ padding: '30px' }}>
      <Stack direction='column' alignItems='center' spacing={3}>
        <img src={empty} alt='playlist' width='200' />
        <Typography variant='h5' color='text.primary' gutterBottom>
          {message}
        </Typography>
      </Stack>
    </Card>
  )
}

export default Empty
