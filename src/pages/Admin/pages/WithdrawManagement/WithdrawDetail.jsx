import React from 'react'
import Rootmodal from '../../../../components/Modal/RootModal/index'
import { Grid, Typography, Stack, Avatar, Container, Box, Chip } from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const WithdrawDetail = ({ open, setOpen, withdraw }) => {
  const { t } = useTranslation()
  return (
    <>
      <Rootmodal
        variant='Info'
        title={t('detailInfo')}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => setOpen()}
        closeOnly={true}
        width={700}
      >
        <Stack direction='column' spacing={0} mt={3}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar src={withdraw.user.photo_url} />
                <Stack direction='column' spacing={0}>
                  <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                    {withdraw.user.first_name} {withdraw.user.last_name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' noWrap>
                    {withdraw.user.email}
                  </Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  border: '1px solid #E0E0E0',
                  borderRadius: '10px',
                  padding: '20px',
                  mt: 2
                }}
              >
                <Typography variant='subtitle1'>
                  {t('bankName')}: {withdraw.bank_account.bank_name}
                </Typography>
                <Typography variant='subtitle1'>
                  {t('bankAccountName')}: {withdraw.bank_account.owner_name}
                </Typography>
                <Typography variant='subtitle1'>
                  {t('bankAccount')}: {withdraw.bank_account.number}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                {t('withdraw')}
              </Typography>
              <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2 }}>
                {t('moneyAmount')}:{' '}
                {withdraw.transaction.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
              </Typography>
              <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2, mt: 1 }}>
                {t('status')}:{' '}
                {withdraw.transaction.transaction_status === 'PROCESSING' ? (
                  <Chip label='PROCESSING' color='primary' />
                ) : withdraw.transaction.transaction_status === 'CANCELED' ? (
                  <Chip label='Canceled' color='error' />
                ) : (
                  <Chip label='Success' color='success' />
                )}
              </Typography>
              <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2, mt: 1 }}>
                {t('time')}: {moment(withdraw.createAt).format('DD/MM/YYYY h:mm:ss A')}
              </Typography>
            </Grid>
          </Grid>
          <Container mt={2}></Container>
        </Stack>
      </Rootmodal>
    </>
  )
}

export default WithdrawDetail
