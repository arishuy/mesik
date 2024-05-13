import { Box, Typography, Container, Button, styled } from '@mui/material'
import svg from '../../assets/images/payment.svg'
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

function PayMent() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>Status - Payment</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              height: '50vh',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <img alt='404' height={180} src={svg} />
            <Typography variant='h2' sx={{ my: 2 }}>
              {t('rechargeSuccess')}
            </Typography>
            <Typography variant='h4' color='text.secondary' fontWeight='normal'>
              {t('thankYou')}
            </Typography>
          </Box>
          <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
            <Button href='/' variant='outlined'>
              {t('goToHome')}
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  )
}

export default PayMent
