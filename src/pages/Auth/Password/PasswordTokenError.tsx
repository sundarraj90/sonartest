import { Avatar, Box, Grid, Link, Typography, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import { colorTheme } from 'theme';
import Logo from '../../../assets/images/Logo100X132.png';

const TokenVaildError = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 350,
          marginX: 'auto',
        }}
      >
        <Avatar
          alt="marshmallow logo"
          sx={{
            width: 100,
            height: 100,
            p: 2,
            bgcolor: colors.primaryBg[900],
            boxShadow: 3,
            position: 'relative',
            top: -48,
          }}
        >
          <img width={46} height={56} src={Logo} />
        </Avatar>
        <Typography
          component="h1"
          variant="h2"
          color={colors.greenAccent[500]}
          sx={{
            fontFamily: 'Source Sans Pro !important',
            fontWeight: 700,
            marginBlock: 1,
          }}
        >
          Invalid signature
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[500]}
          fontWeight={400}
          fontSize={14}
          sx={{
            textAlign: 'center',
          }}
        >
          The password reset link has expired. Contact Marshmallow team to get a
          new link
        </Typography>
        <Box marginTop={10}></Box>
        <Grid container>
          <Grid item xs textAlign="center">
            <Link href="/" variant="body2" underline="none">
              <Typography component="h1" variant="h5">
                sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};
export default TokenVaildError;
