import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from 'service/UserService';
import {
  setEmpId,
  setFirstName,
  setLastName,
  setProfileIamge,
} from 'store/onboarding';
import { type RootState } from 'store/rootReducer';
import { ColorModeContext, colorTheme } from 'theme';
import { type ICustomerResponse } from 'types';

const TopBar = (): JSX.Element => {
  const { firstName, lastName, profileImage } = useSelector(
    (state: RootState) => state.onboarding,
  );

  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const credentials = JSON.parse(localStorage.getItem('credentials') as string);
  const decoded: { empId?: number } = jwt_decode(credentials?.access_token);
  const dispatch = useDispatch();
  const empId: number | undefined = decoded?.empId;

  const userDetails = async (): Promise<void> => {
    if (empId) {
      try {
        const res = (await getUserById(empId)) as ICustomerResponse;
        if (res.basicInfo?.firstName) {
          dispatch(setFirstName(res.basicInfo?.firstName));
        }
        if (res.basicInfo?.lastName) {
          dispatch(setLastName(res.basicInfo?.lastName));
        }
        if (res.basicInfo?.empId) {
          dispatch(setEmpId(res.basicInfo?.empId));
        }
        if (res.basicInfo?.profileImage) {
          dispatch(setProfileIamge(res.basicInfo?.profileImage));
        }
      } catch (err) {
        throw new Error(`${String(err)}`);
      }
    }
  };

  useEffect(() => {
    if (empId) {
      void userDetails();
    }
  }, [empId]);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      bgcolor={colors.primaryBg[900]}
      sx={{ boxShadow: 2 }}
    >
      {/* ICONS */}

      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      {profileImage ? (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            gab: 10,
            alignSelf: 'center',
          }}
          alt="img"
          src={profileImage}
        />
      ) : (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            alignSelf: 'center',
            bgcolor: '#B5DFC8',
            color: '#202020',
            fontSize: 16,
            fontFamily: 'Inter',
          }}
        >
          {firstName.slice(0, 1) + lastName.slice(0, 1)}
        </Avatar>
      )}
      <Box marginLeft={1} />
      <Box
        sx={{
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="h5"
          variant="h5"
          color="#202020"
          fontWeight={500}
          fontSize={14}
          sx={{ fontFamily: 'Inter' }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[500]}
          fontWeight={400}
          fontSize={12}
          sx={{ fontFamily: 'Inter' }}
        >
          Admin
        </Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
