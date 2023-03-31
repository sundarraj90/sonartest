import { LogoutModal, SideBar, TopBar } from 'components';
import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useTheme } from '@mui/material';
import { colorTheme } from 'theme';

const PrivateLayouts = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  const [isLogoutModalOpen, setLogoutModal] = useState(false);

  const handleModalClose = (): void => {
    setLogoutModal(false);
  };

  const handleModalOpen = (): void => {
    setLogoutModal(true);
  };

  return (
    <Fragment>
      <SideBar openLogoutModal={handleModalOpen} />
      <Box className="content" sx={{ bgcolor: colors.primaryBg[800] }}>
        <TopBar />
        <Container
          maxWidth={false}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <Box my="30px">
            <Outlet />
          </Box>
          <LogoutModal open={isLogoutModalOpen} onClose={handleModalClose} />
        </Container>
      </Box>
    </Fragment>
  );
};

export default PrivateLayouts;
