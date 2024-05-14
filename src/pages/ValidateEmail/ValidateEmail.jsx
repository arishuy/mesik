import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { Box, Typography, Container, Button, styled } from '@mui/material'
import confirmemail from '../../assets/images/confirmemail.png'
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

function ValidateEmail() {
  const { t } = useTranslation()
  const { token } = useParams()
  const [message, setMessage] = useState('')
  const validateEmail = async () => {
    await axios
      .get(urlConfig.authentication.validateEmail + `/${token}`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        setMessage(err.response.data.message)
      })
  }
  useEffect(() => {
    validateEmail()
  }, [])
  return (
    <>
      <Helmet>
        <title>{t('validateEmail')}</title>
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
            <img alt='confirmemail' height={500} src={confirmemail} />
            <Typography variant='h2' sx={{ my: 2 }}>
              {message}
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

export default ValidateEmail
