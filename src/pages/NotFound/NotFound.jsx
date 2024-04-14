import { Box, Typography, Container, Button, styled } from '@mui/material'
import svg from '../../assets/images/404.svg'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <img alt='404' height={180} src={svg} />
            <Typography variant='h2' sx={{ my: 2 }}>
              {t('notFound')}
            </Typography>
            <Typography variant='h4' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
              {t('notFoundMessage')}
            </Typography>
          </Box>
          <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Button href='/' variant='outlined'>
              {t('goToHome')}
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  )
}

export default NotFound
