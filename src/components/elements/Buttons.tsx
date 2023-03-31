import React from 'react';
import { useTheme, Button as MuiButton } from '@mui/material';
import { colorTheme } from 'theme';
import { type IButtonProps } from 'types/components';

const Buttons = (props: IButtonProps): JSX.Element => {
  const { children, size, style, fullWidth, variant, onClick, ...other } =
    props;
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  return (
    <MuiButton
      variant={variant ?? 'contained'}
      size={size ?? 'large'}
      fullWidth={fullWidth}
      sx={[
        style && style,
        {
          height: 40,
          bgcolor: colors.greenAccent[500],
          borderRadius: 2,
        },
      ]}
      onClick={onClick}
      {...other}
    >
      {children}
    </MuiButton>
  );
};

export default Buttons;
