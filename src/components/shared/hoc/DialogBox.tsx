import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { colorTheme } from 'theme';
import { type IDialogProps, type IDialogTitleProps } from 'types';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogTitleBox = (props: IDialogTitleProps): JSX.Element => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const DialogBox = (props: IDialogProps): JSX.Element => {
  const { children, title, onClose, open, screenWidth } = props;
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      maxWidth={screenWidth || 'md'}
      fullWidth={fullScreen}
    >
      <DialogTitleBox id="customized-dialog-title" onClose={onClose}>
        <Typography
          variant="h4"
          color={colors.gray[100]}
          fontWeight="bold"
          sx={{ mb: '5px' }}
        >
          {title}
        </Typography>
      </DialogTitleBox>
      <DialogContent dividers>{children}</DialogContent>
    </CustomDialog>
  );
};

export default DialogBox;
