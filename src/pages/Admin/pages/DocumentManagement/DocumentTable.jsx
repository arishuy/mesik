import { useEffect, useState } from 'react'
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Avatar,
  Stack
} from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import DocumentModal from './DocumentModal'

const DocumentTable = ({ majorsOrder, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [item, setItem] = useState({})
  const { snack, setSnack } = useSnackbar()
  const theme = useTheme()

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value))
  }

  const handleEdit = (major) => {
    setItem(major)
  }
  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return (
    <>
      {openModal && (
        <DocumentModal open={openModal} handleClose={() => setOpenModal(false)} fetchData={fetchData} item={item} />
      )}
      <Card>
        <CardHeader title={t('documentManagement')} />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>{t('EXPERT')}</TableCell>

                {!isMobile && (
                  <>
                    <TableCell>{t('description')}</TableCell>
                    <TableCell>Chi tiết</TableCell>
                  </>
                )}
                <TableCell align='right'>Thời gian gia nhập</TableCell>
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
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar src={majorsOrder.user.photo_url} />
                        <Stack direction='column' spacing={0}>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.user.first_name} {majorsOrder.user.last_name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary' noWrap>
                            {majorsOrder.user.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.descriptions}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            Số chuyên ngành: {majorsOrder.verified_majors ? majorsOrder.verified_majors.length : 0}
                          </Typography>
                          <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                            Số chứng chỉ đã xác nhận: {majorsOrder.certificates.length}
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
                            setOpenModal(true)
                            handleEdit(majorsOrder)
                          }}
                          color='inherit'
                          size='small'
                        >
                          <VisibilityTwoToneIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <TablePagination
            component='div'
            count={majorsOrder.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  )
}

export default DocumentTable
