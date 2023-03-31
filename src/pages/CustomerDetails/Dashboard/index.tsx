import { Box, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProgressCircle from 'components/ProgressCircle';
import { colorTheme } from 'theme';

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  return (
    <Box>
      {/* ROW 1 */}
      <Grid
        direction="row"
        justifyContent="space-between"
        container
        columns={12.2}
        sx={{ display: 'flex', padding: 1 }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            my: 1,
            p: 4,
            borderRadius: 3,
            boxShadow: 2,
            bgcolor: colors.rgbGreen[100],
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Total Pot
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={200} progress={0.75} />
            <Typography
              variant="h5"
              color={colors.greenAccent[900]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Comming Soon...</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            my: 1,
            p: 4,
            borderRadius: 3,
            boxShadow: 2,
            bgcolor: colors.rgbGreen[100],
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Marshmallow Pot
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={200} progress={0.75} />
            <Typography
              variant="h5"
              color={colors.greenAccent[900]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Comming Soon...</Typography>
          </Box>
        </Grid>
      </Grid>
      {/* ROW 2 */}
      <Grid
        direction="row"
        justifyContent="space-between"
        container
        columns={12.2}
        sx={{ display: 'flex', padding: 1 }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            my: 1,
            p: 4,
            borderRadius: 3,
            boxShadow: 2,
            bgcolor: colors.rgbGreen[100],
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Payments
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={200} progress={0.75} />
            <Typography
              variant="h5"
              color={colors.greenAccent[900]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Comming Soon...</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            my: 1,
            p: 4,
            borderRadius: 3,
            boxShadow: 2,
            bgcolor: colors.rgbGreen[100],
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Transactions
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={200} progress={0.75} />
            <Typography
              variant="h5"
              color={colors.greenAccent[900]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Comming Soon...</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
