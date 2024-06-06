import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Loading from '../../common/components/Loading/Loading'
import Empty from '../../common/components/Empty'
import { Typography, Stack, Avatar, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const FollowingArtist = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [following, setFollowing] = useState([])

  const fetchFollowing = async () => {
    await AxiosInterceptors.get(urlConfig.user.getFollowArtist)
      .then((res) => {
        setFollowing(res.data.following)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchFollowing()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Typography variant='h4' py={3}>
        {t('following')}
      </Typography>
      {following.length === 0 ? (
        <Empty message={t('noData')} />
      ) : (
        <Grid container spacing={3}>
          {following.map((artist) => (
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
                <Avatar alt='artist' src={artist.user.photo_url} sx={{ width: 180, height: 180 }} />
                <Typography variant='h6' p={2} textAlign='center'>
                  {artist.display_name}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default FollowingArtist
