import { useState } from 'react'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  useTheme,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import Label from '../../../../components/Label'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone'
import useSnack from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import DetailJobRequest from './DetailJobRequest'
import PaymentConfirm from './PaymentConfirm'
import RatingJob from './RatingJob'
import { useTranslation } from 'react-i18next'
import EditJobRequest from './EditJobRequest'
import DeleteConfirm from './DeleteConfirm'

const getStatusLabel = (jobStatus) => {
  const map = {
    CANCELED: {
      text: 'Canceled',
      color: 'error'
    },
    DONE: {
      text: 'Completed',
      color: 'success'
    },
    PENDING: {
      text: 'Pending',
      color: 'warning'
    },
    PROCESSING: {
      text: 'Processing',
      color: 'info'
    }
  }

  const { text, color } = map[jobStatus]

  return <Label color={color}>{text}</Label>
}

const JobRequestTable = ({ majorsOrder, fetchData, pageCount, setPageCount }) => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const { snack, setSnack } = useSnack()
  const [open, setOpen] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [id, setId] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [item, setItem] = useState({})
  const theme = useTheme()
  return (
    <>
      <Snackbar />
      {open && <DetailJobRequest open={open} setOpen={setOpen} id={id} />}
      {openEdit && <EditJobRequest open={openEdit} setOpen={setOpenEdit} item={item} fetchData={fetchData} />}
      {openPayment && <PaymentConfirm open={openPayment} setOpen={setOpenPayment} id={id} fetchData={fetchData} />}
      {openReview && <RatingJob open={openReview} setOpen={setOpenReview} id={id} fetchData={fetchData} />}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} item={item} fetchData={fetchData} />}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('title')}</TableCell>
                <TableCell>{t('description')}</TableCell>
                <TableCell>{t('price')}</TableCell>
                <TableCell>{t('status')}</TableCell>
                <TableCell>{t('address')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? majorsOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : majorsOrder
              ).map((majorsOrder) => {
                return (
                  <TableRow hover key={majorsOrder._id}>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.descriptions}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {getStatusLabel(majorsOrder.status)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.address.city.name}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      {majorsOrder.status === 'PENDING' && (
                        <>
                          <Tooltip title={t('edit')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setItem(majorsOrder)
                                setOpenEdit(true)
                              }}
                            >
                              <EditTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('delete')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': { background: theme.palette.error.lighter },
                                color: theme.palette.error.main
                              }}
                              onClick={() => {
                                setItem(majorsOrder)
                                setOpenDelete(true)
                              }}
                              color='inherit'
                              size='small'
                            >
                              <DeleteTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {majorsOrder.status === 'PROCESSING' && (
                        <>
                          <Tooltip title={t('detailInfo')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpen(true)
                              }}
                            >
                              <VisibilityTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('done')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.success.lighter
                                },
                                color: theme.palette.success.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                if (user.balance < majorsOrder.price) {
                                  setSnack({
                                    ...snack,
                                    open: true,
                                    message: t('yourBalanceIsNotEnough'),
                                    type: 'error'
                                  })
                                } else {
                                  setId(majorsOrder._id)
                                  setOpenPayment(true)
                                }
                              }}
                            >
                              <CheckCircleOutlineTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {majorsOrder.status === 'DONE' && (
                        <>
                          <Tooltip title={t('detailInfo')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpen(true)
                              }}
                            >
                              <VisibilityTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          {!majorsOrder.is_reviewed && (
                            <Tooltip title={t('reviews')} arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.palette.warning.lighter
                                  },
                                  color: theme.palette.warning.main
                                }}
                                color='inherit'
                                size='small'
                                onClick={() => {
                                  setId(majorsOrder._id)
                                  setOpenReview(true)
                                }}
                              >
                                <RateReviewTwoToneIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
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

export default JobRequestTable
