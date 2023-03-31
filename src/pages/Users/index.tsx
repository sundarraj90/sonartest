import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeOutlined from '@mui/icons-material/GppMaybeOutlined';
import {
  alpha,
  Box,
  Button,
  Chip,
  IconButton,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  gridClasses,
  type GridColumns,
  type GridValidRowModel,
} from '@mui/x-data-grid';
import { DialogBox } from 'components/shared';
import { strings } from 'i18n/Strings';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers, removeEmployee } from 'service/UserService';
import { setSnackBarFailed, setSnackBarSuccess } from 'store/snackBar';
import Header from '../../components/Header';
import { colorTheme } from '../../theme';
import AlertModal from './AlertModal';
import CreateUserForm from './CreateUser';
import UpdateUserForm from './UpdateUser';
interface IEmployeeProps {
  empId?: number;
  employeeId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
  profileImage?: string | null;
  rememberToken?: string | null;
  emailVerifiedAt?: Date;
  employeeResetToken?: string | null;
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

const Users = (): JSX.Element => {
  const ODD_OPACITY = 0.2;
  const currentTheme = useTheme();
  const dispatch = useDispatch();
  const colors = colorTheme(currentTheme.palette.mode);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<IEmployeeProps[]>([]);
  const [selectedData, setSelectedData] = useState<
    GridValidRowModel | undefined
  >();
  const ref = useRef<HTMLInputElement>(null);

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: colors.gray[900],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha('#78B894', ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
    height: '75vh',
    backgroundColor: colors.primaryBg[900],
    borderRadius: 12,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
    },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: colors.primaryBg[900],
      borderBottom: 'none',
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: colors.primaryBg[900],
    },
  }));

  const updateEmployeeData = (): void => {
    getAllUsers()
      .then((res) => {
        if (typeof res !== 'undefined' && 'basicInfo' in res) {
          const { basicInfo } = res as { basicInfo: IEmployeeProps[] };
          if (basicInfo) {
            setEmployeeData(basicInfo);
          }
        }
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  useEffect(() => {
    updateEmployeeData();
  }, []);

  const columns: GridColumns<GridValidRowModel> = [
    {
      field: 'firstName',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderHeader: () => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          First name
        </Typography>
      ),
      renderCell: ({ row }) => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          {row.firstName}
        </Typography>
      ),
    },
    {
      field: 'lastName',
      flex: 1,
      renderHeader: () => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          Last name
        </Typography>
      ),
      renderCell: ({ row }) => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          {row.lastName}
        </Typography>
      ),
    },
    {
      field: 'email',
      flex: 1,
      renderHeader: () => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          Email address
        </Typography>
      ),
      renderCell: ({ row }) => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          {row.email}
        </Typography>
      ),
    },
    {
      field: 'emailVerifiedAt',
      renderHeader: () => (
        <Typography variant="h5" color={colors.gray[100]} fontSize={14}>
          Is email verified?
        </Typography>
      ),
      headerAlign: 'center',
      flex: 1,
      renderCell: ({ row }) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="space-evenly">
          {row.password ? (
            <Chip
              label="Verified"
              variant="outlined"
              color="success"
              icon={<DoneIcon />}
            />
          ) : (
            <Chip
              label="Not Verified"
              variant="outlined"
              color="warning"
              icon={<GppMaybeOutlined />}
            />
          )}
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      flex: 0.7,
      renderCell: ({ row }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="space-evenly"
        >
          {row.empId && (
            <IconButton
              onClick={() => {
                setSelectedData(row);
                setOpenUpdateDialog(true);
              }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          )}
          {row.empId && (
            <IconButton
              onClick={() => {
                setSelectedData(row);
                setOpenDeleteDialog(true);
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ),
    },
  ];

  const handleCreateDialogClose = (): void => {
    setOpenCreateDialog(false);
  };

  const handleUpdateDialogClose = (): void => {
    setOpenUpdateDialog(false);
  };

  const handleDeleteDialogClose = (): void => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (selectedData?.empId !== undefined) {
      const res = await removeEmployee(Number(selectedData.empId)); // convert to number
      if (res) {
        dispatch(
          setSnackBarSuccess({
            snackBarMessage: res,
          }),
        );
      } else {
        dispatch(setSnackBarFailed({ snackBarMessage: 'User deleted failed' }));
      }

      res && updateEmployeeData();
      setOpenDeleteDialog(false);
    }
  };

  return (
    <Fragment>
      <Box>
        <Box display="flex" justifyContent="space-between" pb={2.5}>
          <Header title="Users" subtitle="" />
          <Box
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              sx={{
                height: 40,
                bgcolor: colors.greenAccent[500],
                borderRadius: 2,
                textTransform: 'none',
              }}
              onClick={() => {
                setOpenCreateDialog(true);
                ref.current?.focus();
              }}
            >
              Add user
            </Button>
          </Box>
        </Box>
        <StripedDataGrid
          rows={employeeData}
          hideFooter
          columns={columns}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getRowId={(row: any) =>
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            row.empId + row.email
          }
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
        />
      </Box>
      <DialogBox
        open={openCreateDialog}
        onClose={handleCreateDialogClose}
        screenWidth="md"
        title="Create user"
      >
        <CreateUserForm
          onClose={handleCreateDialogClose}
          updateEmployeeData={updateEmployeeData}
        />
      </DialogBox>

      <DialogBox
        open={openUpdateDialog}
        onClose={handleUpdateDialogClose}
        screenWidth="md"
        title="Edit user"
      >
        <UpdateUserForm
          data={selectedData as GridValidRowModel}
          onClose={handleUpdateDialogClose}
          updateEmployeeData={updateEmployeeData}
        />
      </DialogBox>
      <AlertModal
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        handleDelete={handleDelete}
        title={`${strings.displayText.deleteConfirmationText} user ${String(
          selectedData?.email,
        )}?`}
      />
    </Fragment>
  );
};

export default Users;
