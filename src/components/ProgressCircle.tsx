import { Box, useTheme } from '@mui/material';
import { colorTheme } from '../theme';

interface IProgressCircleProps {
  progress?: number | null | undefined;
  size?: number | null | undefined;
}

const ProgressCircle = ({
  progress = 0.75,
  size = 40,
}: IProgressCircleProps): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const angle = progress && progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${
          colors.primaryGreen[900]
        } 45%, transparent 46%),
        conic-gradient(transparent 0deg ${angle ?? 0}deg, ${
          colors.rgbGreen[600]
        } ${angle ?? 0}deg 360deg),
        ${colors.rgbGreen[400]}`,
        borderRadius: '50%',
        width: `${size ?? 0}px`,
        height: `${size ?? 0}px`,
      }}
    />
  );
};

export default ProgressCircle;
