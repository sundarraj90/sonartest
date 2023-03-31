import { Box, Button, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import { logout } from 'service/AuthService';
import { colorTheme } from 'theme';

interface ILogoutModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoutModal = ({ open, onClose }: ILogoutModalProps): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          bgcolor: 'background.paper',
          boxShadow: 24,
          py: 5,
          px: 5,
          borderRadius: 5,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          Are you sure you want to log out?
        </Typography>
        <Box
          sx={{
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.gray[900],
              borderRadius: 2,
              py: 1.5,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ fontSize: '12px', color: colors.primaryBg[700] }}
            >
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={logout}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.greenAccent[500],
              borderRadius: 2,
              py: 1.5,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ fontSize: '12px' }}
            >
              Log Out
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
