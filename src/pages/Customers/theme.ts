import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: ['Inter'],
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F2F2F2',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
