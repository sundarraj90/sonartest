import { Avatar, Box, Button, Typography, useTheme } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { colorTheme } from 'theme';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useDispatch } from 'react-redux';
import {
  setEmailToken,
  setEmailVerified,
  setVerifiedEmail,
  setFirstName,
  setLastName,
  setEmpId,
  setProfileIamge,
} from 'store/onboarding';
import { setSnackBarSuccess, setSnackBarFailed } from 'store/snackBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { strings } from 'i18n/Strings';
import { RouteList } from '../../../routes/Constant';
import Logo from '../../../assets/images/Logo100X132.png';
import { sendOtp, verifyOtp, emailDetails } from '../../../service/AuthService';
import { type IErrorResponse } from 'types';

interface ResponseData {
  result: {
    firstName: string;
    lastName: string;
    empId: number;
    profileImage: string;
  };
  token: string;
}

const VerifyOtp = (): JSX.Element => {
  const MAX_CODE_LENGTH = 4;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const [emailCode, setEmailCode] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [counter, setCounter] = useState(59);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  const matchIsNumeric = (character: string): boolean => {
    const isNumber = typeof character === 'number';
    return isNumber || !isNaN(Number(character));
  };

  const validateChar = (value: string): boolean => {
    if (!matchIsNumeric(value)) {
      setErrorEmail(strings.displayText.allowDigitsOnlyText);
      return false;
    } else {
      setErrorEmail('');
      return true;
    }
  };

  const handleOtp = (userOtp: string): void => {
    setEmailCode(userOtp);
  };

  const handleEmailDetails = (email: string): void => {
    void (async () => {
      await emailDetails(email)
        .then((data: unknown) => {
          const responseData = data as ResponseData;
          dispatch(setFirstName(responseData?.result?.firstName));
          dispatch(setLastName(responseData?.result?.lastName));
          dispatch(setEmpId(responseData?.result?.empId));
          dispatch(setProfileIamge(responseData?.result?.profileImage));
        })
        .catch((err: IErrorResponse) => {
          dispatch(
            setSnackBarFailed({ snackBarMessage: err.response.data.message }),
          );
        });
    })();
  };

  const handleVerifyOtp = (): void => {
    if (state.email !== '') {
      if (emailCode !== '') {
        setLoader(true);
        verifyOtp(state.email, 'email', '' + emailCode)
          .then((otpEmailVerify: { token: string } | string | undefined) => {
            setLoader(false);
            setErrorEmail('');
            if (typeof otpEmailVerify !== 'string' && otpEmailVerify?.token) {
              dispatch(setEmailToken(otpEmailVerify.token));
            }
            dispatch(setEmailVerified(true));
            dispatch(setVerifiedEmail(state.email));
            handleEmailDetails(state.email);
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: strings.displayText.otpVerifiedSuccessText,
              }),
            );
            const credentials = JSON.parse(
              localStorage.getItem('credentials') as string,
            );
            credentials?.access_token && navigate(RouteList.Home);
          })
          .catch((err) => {
            dispatch(
              setSnackBarFailed({
                snackBarMessage: err?.response?.data?.message,
              }),
            );
            if (err?.response?.status === 400) {
              setErrorEmail(err?.response?.data?.message);
              setLoader(false);
              dispatch(setEmailVerified(false));
            } else {
              setLoader(false);
              setErrorEmail(strings.displayText.unknownErrorText);
              dispatch(setEmailVerified(false));
            }
          });
      } else {
        setErrorEmail('Enter the OTP');
      }
    }
  };

  // const handleVerifyOtp = (): void => {
  //   if (state.email !== '') {
  //     if (emailCode !== '') {
  //       setLoader(true);
  //       void verifyOtp(state.email, 'email', `${emailCode}`)
  //         .then((otpEmailVerify: { token: string } | string | undefined) => {
  //           if (typeof otpEmailVerify !== 'string' && otpEmailVerify?.token) {
  //             setLoader(false);
  //             setErrorEmail('');
  //             dispatch(setEmailToken(otpEmailVerify.token));
  //             dispatch(setEmailVerified(true));
  //             dispatch(setVerifiedEmail(state.email));
  //             handleEmailDetails(state.email);
  //             dispatch(
  //               setSnackBarSuccess({
  //                 snackBarMessage: strings.displayText.otpVerifiedSuccessText,
  //               }),
  //             );
  //             const credentials = JSON.parse(
  //               localStorage.getItem('credentials') as string,
  //             );
  //             credentials?.access_token && navigate(RouteList.Home);
  //           }
  //         })
  //         .catch((err: IErrorResponse) => {
  //           dispatch(
  //             setSnackBarFailed({
  //               snackBarMessage: err?.response?.data?.message,
  //             }),
  //           );
  //           if (err?.response?.status === 400) {
  //             setErrorEmail(err?.response?.data?.message);
  //             setLoader(false);
  //             dispatch(setEmailVerified(false));
  //           } else {
  //             setLoader(false);
  //             setErrorEmail(strings.displayText.unknownErrorText);
  //             dispatch(setEmailVerified(false));
  //           }
  //         });
  //     } else {
  //       setErrorEmail('Enter the OTP');
  //     }
  //   }
  // };

  const handleResendButton = (): void => {
    try {
      if (state.email !== '') {
        setEmailCode('');
        setErrorEmail('');
        setCounter(60);
        dispatch(setEmailVerified(false));
        void sendOtp(state.email, 'email');
        dispatch(
          setSnackBarSuccess({
            snackBarMessage: strings.displayText.otpSentSuccessText,
          }),
        );
      }
    } catch (error) {
      dispatch(setSnackBarFailed({ snackBarMessage: error as string }));
    }
  };

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
          variant="h4"
          color={colors.greenAccent[500]}
          sx={{ fontFamily: 'Source Sans Pro !important', fontWeight: 700 }}
        >
          We have sent an OTP to
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          color={colors.greenAccent[500]}
          sx={{ fontFamily: 'Source Sans Pro !important', fontWeight: 700 }}
        >
          {state.email}
        </Typography>

        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[500]}
          fontWeight={400}
          fontSize={14}
          lineHeight={2}
        >
          Please enter the OTP to continue.
        </Typography>
        <Box pb={5} />
        <MuiOtpInput
          value={emailCode}
          onChange={handleOtp}
          length={MAX_CODE_LENGTH}
          validateChar={validateChar}
        />
        <Box pb={2} />
        {errorEmail.length > 0 && (
          <Typography
            component="h5"
            variant="h5"
            color="red"
            fontWeight={400}
            fontSize={14}
          >
            {errorEmail}
          </Typography>
        )}
        <Box pb={5} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            fontWeight={400}
            fontSize={12}
            sx={{
              fontFamily: 'Inter !important',
            }}
          >
            Didn&apos;t receive?
          </Typography>
          <Button
            onClick={handleResendButton}
            disabled={counter !== 0}
            variant="text"
          >
            <Typography
              component="h5"
              variant="h5"
              fontWeight={400}
              fontSize={12}
            >
              Resend OTP
            </Typography>
          </Button>
          {counter !== 0 ? (
            <Typography
              component="h5"
              variant="h5"
              fontWeight={400}
              fontSize={12}
            >
              {counter}
            </Typography>
          ) : null}
        </Box>

        <LoadingButton
          onClick={handleVerifyOtp}
          type="submit"
          fullWidth
          variant="contained"
          loading={loader}
          loadingPosition="end"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: colors.greenAccent[500],
            borderRadius: 2,
            py: 1.5,
          }}
        >
          <Typography component="h1" variant="h5">
            Verify OTP
          </Typography>
        </LoadingButton>
      </Box>
    </Fragment>
  );
};

export default VerifyOtp;
