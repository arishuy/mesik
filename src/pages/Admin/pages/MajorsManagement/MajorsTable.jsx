import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
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
  Button
} from '@mui/material'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import AddNewMajor from '../MusicManagement/AddNewSong'
import EditMajor from './EditMajor'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import Snackbar from '../../../../common/components/SnackBar'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const MajorsTable = ({ majorsOrder, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [item, setItem] = useState({})
  const { snack, setSnack } = useSnackbar()
  const theme = useTheme()

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value))
  }

  const handleDelete = async (id) => {
    await AxiosInterceptors.delete(urlConfig.majors.deleteMajors + `/${id}`)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('deleteMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('deleteMajorFail'),
          type: 'error'
        })
      )
  }

  const handleEdit = (major) => {
    setItem(major)
  }
  return (
    <>
      <Snackbar />
      {openAdd && <AddNewMajor open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openEdit && (
        <EditMajor open={openEdit} handleClose={() => setOpenEdit(false)} fetchData={fetchData} item={item} />
      )}
      <Card sx={{
        mb: isMobile ? 5 : 0
      }}>
        <CardHeader
          action={
            <Box width={isMobile ? '' : 150}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenAdd(true)}
                fullWidth
                startIcon={<AddIcon />}
              >
                {isMobile ? '' : t('addMajor')}
              </Button>
            </Box>
          }
          title={t('majorsManagement')}
        />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                {!isMobile && <TableCell>{t('majorId')}</TableCell>}
                <TableCell>{t('majorName')}</TableCell>
                <TableCell>{t('description')}</TableCell>
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
                    {!isMobile && (
                      <TableCell>
                        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                          {majorsOrder._id}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.descriptions}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
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
                            handleEdit(majorsOrder)
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
                          color='inherit'
                          size='small'
                          onClick={() => handleDelete(majorsOrder._id)}
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

export default MajorsTable
