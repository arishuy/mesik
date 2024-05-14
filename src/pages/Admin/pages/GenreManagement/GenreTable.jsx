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
  Stack
} from '@mui/material'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import DeleteConfirm from './DeleteConfirm'
import AddNewGenre from './AddNewGenre'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Snackbar from '../../../../common/components/SnackBar'
import EditGenre from './EditGenre'

const GenreTable = ({ majorsOrder, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openAdd, setOpenAdd] = useState(false)
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
      <Snackbar />
      {openModal && (
        <EditGenre open={openModal} handleClose={() => setOpenModal(false)} fetchData={fetchData} id={id} />
      )}
      {openAdd && <AddNewGenre open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      <Card>
        <CardHeader
          title={'Genre Management'}
          action={
            <Box width={isMobile ? '' : 150}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenAdd(true)}
                fullWidth
                startIcon={<AddIcon />}
              >
                {isMobile ? '' : 'Add genre'}
              </Button>
            </Box>
          }
        />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
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
                        <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {majorsOrder.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.description}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                        {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title={t('edit')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.palette.warning.lighter
                            },
                            color: theme.palette.warning.main
                          }}
                          onClick={() => {
                            setId(majorsOrder._id)
                            setOpenModal(true)
                          }}
                          color='inherit'
                          size='small'
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

export default GenreTable
