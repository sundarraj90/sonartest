import MuiAlert, {
  type AlertColor,
  type AlertProps,
} from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Slide, { type SlideProps } from '@mui/material/Slide';
import { type RootState } from 'store/rootReducer';
import { setClearSnackBar } from 'store/snackBar';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps): JSX.Element {
  return <Slide {...props} direction="left" />;
}

// eslint-disable-next-line react/display-name
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CustomSnackBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { snackBar } = useSelector((state: RootState) => state.snackbar);
  function handleClose(): void {
    dispatch(setClearSnackBar(undefined));
  }

  return (
    <Snackbar
      open={snackBar?.snackBarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={snackBar?.severity as AlertColor | undefined}
        sx={{ width: '100%' }}
      >
        {snackBar?.snackBarMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
