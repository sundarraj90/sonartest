import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Radio, Typography, useTheme } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Header from 'components/Header';
import { Fragment, useEffect, useState } from 'react';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers } from 'service/CustomerService';
import { colorTheme } from 'theme';
import { sortOptions, tableHeaders } from './constants';
import { StyledTableCell, StyledTableRow } from './theme';

interface ICustomerData {
  id: string;
  first_name: string;
  last_name: string;
  calling_code: string;
  phone: string;
  email: string;
  rows: number;
  count: number;
}
interface ICustomerResponse {
  basicInfo: {
    count: number;
    rows: ICustomerData[];
  };
}

const Customers = (): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const [customerData, setCustomerData] = useState<ICustomerResponse | null>(
    null,
  );
  const [filters, setFilter] = useState<string[]>([]);
  const [sortParameter, setSortParameter] = useState('');
  const [filtersToDisplay, setFiltersToDisplay] = useState<string[]>([]);
  const [openSortDropdown, setOpenSortDropDown] = useState(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count] = useState(0);
  const [sortBorder, setSortBorder] = useState('');
  const [sortBorderColor, setSortBorderColor] = useState('');
  const [sortBackgroundColor, setSortBackgroundColor] = useState('');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCustomerData = async (): Promise<void> => {
    try {
      const res = await getAllCustomers(rowsPerPage, page, 'DESC');
      const customerInfo = res as unknown as ICustomerResponse;
      setCustomerData((prevState) => {
        return {
          ...prevState,
          basicInfo: {
            rows: customerInfo?.basicInfo?.rows,
            count: customerInfo?.basicInfo?.count,
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterAddition = (event: SelectChangeEvent<string[]>): void => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleDeleteFilter = (i: number): void => {
    setFiltersToDisplay(
      filtersToDisplay.filter((filterOption, index) => index !== i),
    );
    setFilter(filters.filter((filter, index) => index !== i));
  };

  const sortCustomers = async (value: string): Promise<void> => {
    if (value === 'Date of account creation – Oldest to newest') {
      const res = await getAllCustomers(rowsPerPage, page, 'ASC');
      const customerInfo = res as unknown as ICustomerResponse;
      setCustomerData((prevState) => {
        return {
          ...prevState,
          basicInfo: {
            rows: customerInfo?.basicInfo?.rows,
            count: customerInfo?.basicInfo?.count,
          },
        };
      });
    } else {
      const res = await getAllCustomers(rowsPerPage, page, 'DESC');
      const customerInfo = res as unknown as ICustomerResponse;
      setCustomerData((prevState) => {
        return {
          ...prevState,
          basicInfo: {
            rows: customerInfo?.basicInfo?.rows,
            count: customerInfo?.basicInfo?.count,
          },
        };
      });
    }
  };

  useEffect(() => {
    void getCustomerData();
  }, [rowsPerPage, page]);

  useEffect(() => {
    setSortParameter('Date of account creation – Newest to oldest');
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 50,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box sx={{ mt: 1 }}>
            <Header title="Customers" />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* FILTER - MUI doesn't allow mapping of header-sub-header styled filter component,
          hence the list is typed as it is */}

          <Box display="flex" mr="20px">
            <ClickAwayListener
              onClickAway={() => {
                setOpenFilterDropdown(false);
              }}
            >
              <Select
                MenuProps={{ disablePortal: true }}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BFBFBF',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BFBFBF',
                  },
                  color: '#000000',
                  minHeight: 50,
                  minWidth: 150,
                  border: filters.length > 0 ? 'solid' : 'none',
                  borderWidth: '2px',
                  borderColor:
                    filters.length > 0 ? colors.primaryGreen[300] : '#000',
                  backgroundColor: filters.length > 0 ? '#B5DFC8' : '',
                }}
                variant="outlined"
                open={openFilterDropdown}
                onOpen={() => {
                  setOpenFilterDropdown(true);
                }}
                onChange={handleFilterAddition}
                value={filters}
                multiple
                displayEmpty
                renderValue={() => {
                  if (filters.length === 0) {
                    return (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <FilterAltSharpIcon fill={colors.greenAccent[500]} />
                        <Typography sx={{ fontSize: '16px' }}>
                          Filter By
                        </Typography>
                      </Box>
                    );
                  }
                  return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <FilterAltSharpIcon fill={colors.greenAccent[500]} />
                      <Typography sx={{ fontSize: '16px' }}>
                        Filters : {filters.length}
                      </Typography>
                    </Box>
                  );
                }}
              >
                <ListSubheader>Profile Verification</ListSubheader>
                <MenuItem value="Verified">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Verified')}
                  />
                  <Typography>Verified</Typography>
                </MenuItem>
                <MenuItem value="Unverified">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Unverified')}
                  />
                  <Typography>Unverified</Typography>
                </MenuItem>
                <ListSubheader>Profile Completion</ListSubheader>
                <MenuItem value="Completed">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Completed')}
                  />
                  <Typography>Completed</Typography>
                </MenuItem>
                <MenuItem value="Pending">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Pending')}
                  />
                  <Typography>Pending</Typography>
                </MenuItem>
                <ListSubheader>Plan</ListSubheader>
                <MenuItem value="No plan">
                  <Checkbox
                    color="success"
                    checked={filters.includes('No plan')}
                  />
                  <Typography>No plan</Typography>
                </MenuItem>
                <MenuItem value="Life max plan">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Life max plan')}
                  />
                  <Typography>Life max plan</Typography>
                </MenuItem>
                <MenuItem value="Life plus">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Life plus')}
                  />
                  <Typography>Life plus</Typography>
                </MenuItem>
                <MenuItem value="Green">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Green')}
                  />
                  <Typography>Green</Typography>
                </MenuItem>
                <ListSubheader>Risk profile</ListSubheader>
                <MenuItem value="Risk 1">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Risk 1')}
                  />
                  <Typography>Risk 1</Typography>
                </MenuItem>
                <MenuItem value="Risk 2">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Risk 2')}
                  />
                  <Typography>Risk 2</Typography>
                </MenuItem>
                <MenuItem value="Risk 3">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Risk 3')}
                  />
                  <Typography>Risk 3</Typography>
                </MenuItem>
                <MenuItem value="Risk 4">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Risk 4')}
                  />
                  <Typography>Risk 4</Typography>
                </MenuItem>
                <ListSubheader>Payment</ListSubheader>
                <MenuItem value="Option P">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Option P')}
                  />
                  <Typography>Option P</Typography>
                </MenuItem>
                <ListSubheader>Transaction</ListSubheader>
                <MenuItem value="Option T">
                  <Checkbox
                    color="success"
                    checked={filters.includes('Option T')}
                  />
                  <Typography>Option T</Typography>
                </MenuItem>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mr={2}
                  ml={2}
                >
                  <Button
                    sx={{
                      color: colors.greenAccent[500],
                      fontWeight: '600',
                      p: 1,
                    }}
                    onClick={() => {
                      setFiltersToDisplay(filters);
                      setOpenFilterDropdown(false);
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    sx={{ color: colors.gray[500], fontWeight: '600', p: 1 }}
                    onClick={() => {
                      setOpenFilterDropdown(false);
                      setFilter([]);
                      setFiltersToDisplay([]);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Select>
            </ClickAwayListener>
          </Box>

          {/* SORT */}
          <Box sx={{ minWidth: 120 }}>
            <ClickAwayListener
              disableReactTree={true}
              onClickAway={() => {
                setOpenSortDropDown(false);
              }}
            >
              <Select
                MenuProps={{ disablePortal: true }}
                open={openSortDropdown}
                onOpen={() => {
                  setOpenSortDropDown(true);
                }}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BFBFBF',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BFBFBF',
                  },
                  color: '#000000',
                  maxHeight: 50,
                  backgroundColor: sortBackgroundColor,
                  border: sortBorder,
                  borderColor: sortBorderColor,
                }}
                value={sortParameter}
                displayEmpty
                onChange={(e: SelectChangeEvent) => {
                  setSortParameter(e.target.value);
                  void sortCustomers(e.target.value);
                  setOpenSortDropDown(false);
                  setSortBorder('solid');
                  setSortBorderColor(colors.primaryGreen[300]);
                  setSortBackgroundColor('#B5DFC8');
                }}
                renderValue={() => (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <SortSharpIcon fill={colors.greenAccent[500]} />
                    <Typography>Sort By</Typography>
                  </Box>
                )}
              >
                {sortOptions.map((sortOption) => (
                  <MenuItem
                    id="sort"
                    key={sortOption.id}
                    value={sortOption.value}
                  >
                    <Radio
                      color="success"
                      checked={sortParameter === sortOption.value}
                    />
                    <Typography>{sortOption.value}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </ClickAwayListener>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexFlow: 'row-reverse wrap' }}
        >
          {filtersToDisplay.map((filterOption, i) => (
            <Chip
              key={i}
              label={filterOption}
              variant="filled"
              sx={{
                backgroundColor: '#B5DFC8',
                color: '#000000',
                mb: 1,
              }}
              onDelete={() => {
                handleDeleteFilter(i);
              }}
            />
          ))}
        </Stack>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          pl: 2,
          pr: 2,
          pb: 2,
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((ob) => (
                <TableCell sx={{ color: '#898989' }} key={ob.id}>
                  {ob.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {customerData ? (
            <TableBody>
              {customerData?.basicInfo?.rows.map(
                (customer: ICustomerData, index: number) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => {
                      navigate(`/customer-details/${customer.id}`);
                    }}
                  >
                    <StyledTableCell>{customer.id}</StyledTableCell>
                    <StyledTableCell>
                      {customer?.first_name} {customer?.last_name}
                    </StyledTableCell>
                    <StyledTableCell>{customer.email}</StyledTableCell>
                    <StyledTableCell>
                      + {customer.calling_code} {customer.phone}
                    </StyledTableCell>
                  </StyledTableRow>
                ),
              )}
            </TableBody>
          ) : (
            <Typography>No rows</Typography>
          )}
        </Table>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default Customers;
