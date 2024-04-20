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
  Stack,
  Avatar,
  Tooltip,
  Rating,
  Collapse,
  Box
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import CertificateValidateForm from './CertificateValidateForm'

function Row({ row, theme, fetchData }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [certificate, setCertificate] = useState(row.certificates[0])
  return (
    <>
      {openModal && (
        <CertificateValidateForm
          expertId={row._id}
          open={openModal}
          setOpen={setOpenModal}
          certificate={certificate}
          fetchData={fetchData}
        />
      )}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Avatar src={row.user.photo_url} />
            <Stack direction='column' spacing={0}>
              <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                {row.user.first_name} {row.user.last_name}
              </Typography>
              <Typography variant='body2' color='text.secondary' noWrap>
                {row.user.email}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            {row.descriptions}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            {row.certificates.length} {t('certificate')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            <Rating name='read-only' value={row.average_rating} readOnly />
            <Typography variant='body2' color='text.secondary' noWrap>
              {row.rating_count} {t('rating')}
            </Typography>
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
              {row.user.address.city.name}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap>
              {row.user.address.district.name} {row.user.address.ward.name}
            </Typography>
          </Typography>
        </TableCell>
        <TableCell align='right'>
          <Tooltip title='Mở rộng' arrow>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {t('certificate')}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>{t('description')}</TableCell>
                    <TableCell align='right'>{t('major')}</TableCell>
                    <TableCell align='right'>{t('action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.certificates.map((certificate) => (
                    <TableRow key={certificate._id}>
                      <TableCell component='th' scope='row'>
                        {certificate.name}
                      </TableCell>
                      <TableCell>{certificate.descriptions}</TableCell>
                      <TableCell align='right'>{certificate.major.name}</TableCell>
                      <TableCell align='right'>
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
                              setCertificate(certificate)
                              setOpenModal(true)
                            }}
                          >
                            <VisibilityTwoToneIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const CertificatesTable = ({ majorsOrder, fetchData }) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const theme = useTheme()
  return (
    <>
      <Snackbar />
      <Card>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Chuyên gia</TableCell>
                <TableCell>{t('description')}</TableCell>
                <TableCell>Số lượng cần xác thực</TableCell>
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
                return <Row key={majorsOrder._id} row={majorsOrder} theme={theme} fetchData={fetchData} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default CertificatesTable
