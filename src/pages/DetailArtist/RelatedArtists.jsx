import React from 'react'
import { Stack, Typography, Avatar, Grid } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const RelatedArtists = ({ id }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [artists, setArtists] = useState([])
  useEffect(() => {
    Axios.get(urlConfig.artists.getRelatedArtists + `/${id}/related`)
      .then((res) => {
        setArtists(res.data.artists)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])
  return (
    <>
      <Typography variant='h4' py={3}>
        {t('maybeInterested')}
      </Typography>
      <Grid container spacing={3}>
        {artists.map((artist) => (
          <Grid item xs={6} md={4} lg={2} key={artist._id}>
            <Stack
              direction='column'
              alignItems='center'
              justifyContent='center'
              key={artist._id}
              px={3}
              onClick={() => navigate(`/artist/${artist._id}`)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Avatar alt='artist' src={artist.user.photo_url} sx={{ width: 150, height: 150 }} />
              <Typography variant='h6' px={2} mt={2} textAlign='center'>
                {artist.display_name}
              </Typography>
              <Typography variant='subtitle1' textAlign='center'>
                {artist.total_followers} {t('followers')}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RelatedArtists
