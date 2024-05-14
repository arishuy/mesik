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
  Avatar,
  Stack
} from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import ReportForm from './ReportForm'
import DeleteConfirm from './DeleteConfirm'

const ReportTable = ({ majorsOrder, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [id, setId] = useState('')
  const theme = useTheme()
  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return (
    <>
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      {openModal && <ReportForm open={openModal} setOpen={setOpenModal} fetchData={fetchData} id={id} />}
      <Card>
        <CardHeader title={t('reportManagement')} />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>{t('from')}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{t('title')}</TableCell>
                    <TableCell>{t('description')}</TableCell>
                  </>
                )}
                <TableCell align='right'>{t('time')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
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
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.description}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    <TableCell align='right'>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title={t('detailInfo')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.palette.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          onClick={() => {
                            setId(majorsOrder._id)
                            setOpenModal(true)
                          }}
                          color='inherit'
                          size='small'
                        >
                          <VisibilityTwoToneIcon fontSize='small' />
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
                            setOpenDelete(true)
                          }}
                        >
                          <DeleteTwoToneIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
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

export default ReportTable
