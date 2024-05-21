import { useEffect, useState } from 'react'
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Stack,
  Avatar
} from '@mui/material'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import Label from '../../../../components/Label'
import RejectConfirm from './RejectConfirm'
import ApproveConfirm from './ApproveConfirm'

const getStatusLabel = (transaction) => {
  const map = {
    REJECTED: {
      text: 'Rejected',
      color: 'error'
    },
    APPROVED: {
      text: 'Approved',
      color: 'success'
    },
    PENDING: {
      text: 'Pending',
      color: 'warning'
    }
  }

  const { text, color } = map[transaction]

  return <Label color={color}>{text}</Label>
}
const RequestTable = ({ majorsOrder, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [id, setId] = useState('')
  const theme = useTheme()
  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return (
    <>
      {openApprove && <ApproveConfirm open={openApprove} setOpen={setOpenApprove} fetchData={fetchData} id={id} />}
      {openReject && <RejectConfirm open={openReject} setOpen={setOpenReject} fetchData={fetchData} id={id} />}
      <Card>
        <CardHeader title={t('requestManagement')} />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell
                  sx={{
                    width: '500px'
                  }}
                >
                  Description
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Time</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? majorsOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : majorsOrder
              ).map((majorsOrder, index) => {
                return (
                  <TableRow hover key={majorsOrder._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar src={majorsOrder.user.photo_url} />
                        <Stack direction='column' spacing={0}>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.user.first_name} {majorsOrder.user.last_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.display_name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '500px'
                      }}
                    >
                      <Typography
                        variant='body1'
                        color='text.primary'
                        sx={{
                          width: '500px'
                        }}
                      >
                        {majorsOrder.descriptions}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusLabel(majorsOrder.status)}</TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      {majorsOrder.status === 'PENDING' ? (
                        <>
                          <Tooltip title={t('edit')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.success.lighter
                                },
                                color: theme.palette.success.main
                              }}
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpenApprove(true)
                              }}
                              color='inherit'
                              size='small'
                            >
                              <CheckCircleTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('delete')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': { background: theme.palette.error.lighter },
                                color: theme.palette.error.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpenReject(true)
                              }}
                            >
                              <CancelTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default RequestTable
