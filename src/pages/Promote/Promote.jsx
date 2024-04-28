import { Box, Typography, Container, Button, styled } from '@mui/material'
import svg from '../../assets/images/promote.png'
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

function Promote() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t('promoteExpert')}</title>
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
            <img alt='404' height={400} src={svg} />
            <Typography variant='h2' sx={{ my: 2 }}>
              {t('promoteSuccess')}
            </Typography>
            <Typography variant='h4' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
              {t('promoteMessage')}
            </Typography>
          </Box>
          <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Button href='/login' variant='outlined'>
              {t('goToLogin')}
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  )
}

export default Promote
