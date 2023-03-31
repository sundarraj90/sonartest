import React, { type FC } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { colorTheme } from 'theme';
import { type IHeaderProps } from 'types';

const Header: FC<IHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="h2"
        color={colors.gray[100]}
        fontWeight="bold"
        sx={{ fontFamily: 'Inter !important' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
