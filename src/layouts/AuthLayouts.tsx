import { Grid, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { colorTheme } from 'theme';
// import BackgroundImage from '../assets/images/bg1.jpg';
import { FOOTER_COPYRIGHTS_TEXT } from '../utils/Constants';

const AuthLayouts = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const styles = {
    paperContainer: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundColor: colors.greenAccent[500],
      height: '100vh',
      width: '100vw',
    },
  };

  return (
    <Paper style={styles.paperContainer}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          xs={3}
          bgcolor={colors.primaryBg[900]}
          sx={{
            px: 15,
            pb: 10,
            width: 700,
            borderRadius: 2,
            boxShadow: 4,
          }}
        >
          <Outlet />
        </Grid>

        <Grid container mt={1.5} width={700}>
          <Grid item xs={12} sm={12} md={6} xl={6} textAlign="left">
            <Typography
              component="h2"
              variant="h5"
              color={colors.primaryBg[900]}
            >
              {FOOTER_COPYRIGHTS_TEXT}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6} textAlign="right">
            <Typography
              component="h2"
              variant="h5"
              color={colors.primaryBg[900]}
            >
              Contact Us | About Us | FAQ?
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthLayouts;
