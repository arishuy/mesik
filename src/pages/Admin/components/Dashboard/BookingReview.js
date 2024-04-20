import Slider from 'react-slick'
// @mui
import { useTheme } from '@mui/material/styles'
import { Card, Stack, Avatar, Rating, CardHeader, Typography, Grid, Container } from '@mui/material'
import moment from 'moment'
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone'
import { useTranslation } from 'react-i18next'

export default function BookingReview({ data }) {
  const { t } = useTranslation()
  const theme = useTheme()

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl')
  }

  return (
    <Card>
      <CardHeader
        title={t('reviews')}
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center'
          }
        }}
      />

      <Slider {...settings}>
        {data.map((item) => (
          <ReviewItem key={item._id} item={item} />
        ))}
      </Slider>
    </Card>
  )
}

// ----------------------------------------------------------------------
function ReviewItem({ item }) {
  return (
    <Stack spacing={2} sx={{ position: 'relative', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Stack direction='column' alignItems='center' spacing={2}>
            <Avatar alt={item.user.photo_url} src={item.user.photo_url} />
            <div>
              <Typography variant='subtitle2'>
                {item.user.first_name} {item.user.last_name}
              </Typography>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={2} alignItems='center'>
          <KeyboardDoubleArrowRightTwoToneIcon sx={{ fontSize: 30 }} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Stack direction='column' alignItems='center' spacing={2}>
            <Avatar alt={item.expert.user.photo_url} src={item.expert.user.photo_url} />
            <div>
              <Typography variant='subtitle2'>
                {item.expert.user.first_name} {item.expert.user.last_name}
              </Typography>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Container
        maxWidth='sm'
        sx={{
          '& .MuiRating-root': {
            my: 2
          }
        }}
      >
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Rating value={item.rating} size='small' readOnly precision={0.5} />
          <Typography variant='caption' sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {moment(item.updatedAt).fromNow()}
          </Typography>
        </Stack>
        <Typography variant='body2'>{item.comment}</Typography>
      </Container>
    </Stack>
  )
}
