import React, { useEffect } from 'react'
import { Container, Grid, Stack, Card, CardContent, Typography } from '@mui/material'
import BookingWidgetSummary from '../../components/Dashboard/BookingWidgetSummary'
import BookingBooked from '../../components/Dashboard/BookingBooked'
import BookingReview from '../../components/Dashboard/BookingReview'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded'
import HailRoundedIcon from '@mui/icons-material/HailRounded'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import dashboard from '../../../../assets/images/dashboard.svg'
import useResponsive from '../../../../hooks/useResponsive'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import Loading from '../../../../common/components/Loading/Loading'
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const DashBoard = () => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const isMobile = useResponsive('down', 'sm')
  const [data, setData] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.statistics.getStatisticsAdmin).then((res) => {
      if (res && res.status === 200) {
        setData(res.data.statistics)
        setIsLoading(false)
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Helmet>
        <title>{t('dashboard')}</title>
      </Helmet>
      <Container maxWidth='xl'>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Card
              sx={{
                background:
                  'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)'
              }}
            >
              <CardContent>
                <Stack direction='row' spacing={5} alignItems='center' justifyContent='space-between'>
                  <div>
                    <Typography gutterBottom variant='h4'>
                      {t('welcomeBack')} 👋
                      <br /> {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant='body2' sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                      {t('subWelcomeBack')}
                    </Typography>
                  </div>
                  <img src={dashboard} alt='dashboard' style={{ width: '200px', height: '200px' }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title={t('song')}
              total={data.song_count}
              icon={
                <MusicNoteRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title={t('artist')}
              total={data.artist_count}
              icon={
                <HailRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title={t('user')}
              total={data.user_count}
              icon={
                <EmojiPeopleRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title={t('totalDeposit')}
                  total={data.total_deposit_amount}
                  icon={
                    <AddCardRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title={t('genre')}
                  total={data.genre_count}
                  icon={
                    <AlignHorizontalRightRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title={t('album')}
                  total={data.album_count}
                  icon={
                    <AlbumRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title={t('playlist')}
                  total={data.playlist_count}
                  icon={
                    <PlaylistAddCheckRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingBooked
              canceled={data.transaction_cancel_count}
              processing={data.transaction_processing_count}
              done={data.transaction_done_count}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default DashBoard
