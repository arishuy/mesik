import React from 'react'
import Rootmodal from '../../../../components/Modal/RootModal/index'
import { styled } from '@mui/material/styles'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Check from '@mui/icons-material/Check'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone'
import { Grid, Typography, Stack, Avatar, Container } from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}))

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4'
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}))

function QontoStepIcon(props) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  )
}
const DetailTransaction = ({ open, setOpen, transaction }) => {
  const { t } = useTranslation()
  const steps = ['Nạp', 'Xử lý', 'Hoàn thành']
  const activeStep =
    transaction.transaction_status === 'CANCELED' ? 1 : transaction.transaction_status === 'PROCESSING' ? 2 : 3
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
        <Stack direction='column' spacing={3} mt={2}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar src={transaction.user.photo_url} />
                <Stack direction='column' spacing={0}>
                  <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                    {transaction.user.first_name} {transaction.user.last_name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' noWrap>
                    {transaction.user.email}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={2}>
              <KeyboardDoubleArrowRightTwoToneIcon sx={{ fontSize: 50 }} />
            </Grid>
            <Grid item xs={12} sm={5}>
              {transaction.transaction_type === 'PAYMENT' ? (
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar src={transaction.expert.photo_url} />
                  <Stack direction='column' spacing={0}>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {transaction.expert.first_name} {transaction.expert.last_name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {transaction.expert.email}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar>EP</Avatar>
                  <Stack direction='column' spacing={0}>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      Expert Booking
                    </Typography>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      expertbookingpbl@gmail.com
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Container mt={2}>
            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
              {t('payment')}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2 }}>
              {t('moneyAmount')}: {transaction.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2 }}>
              {t('type')}: {transaction.transaction_type}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2 }}>
              {t('status')}: {transaction.transaction_status}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap sx={{ ml: 2 }}>
              {t('time')}: {moment(transaction.createAt).format('DD/MM/YYYY h:mm:ss A')}
            </Typography>
          </Container>
        </Stack>
      </Rootmodal>
    </>
  )
}

export default DetailTransaction
