import {
  Avatar,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { colorTheme } from 'theme';
import { emailCheck, forgotPassword } from 'service/AuthService';
import { useDispatch } from 'react-redux';
import { setSnackBarSuccess, setSnackBarFailed } from 'store/snackBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { strings } from 'i18n/Strings';
import Logo from '../../../assets/images/Logo100X132.png';
import { type IErrorResponse } from 'types';

const ForgotPassword = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = colorTheme(theme.palette.mode);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [userVisit, setUserVist] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const validRegex = /\S+@\S+\.\S+/;
  const emailValidation = email.match(validRegex) != null;

  const handleErrorCheck = (): void => {
    if (email !== '') {
      if (emailValidation) {
        setEmailError('');
      } else {
        setEmailError(strings.displayText.emailValidateText);
      }
    } else if (userVisit) {
      setEmailError(strings.displayText.emailMustText);
    } else {
      setEmailError('');
    }
  };

  useEffect(() => {
    handleErrorCheck();
  }, [email, userVisit, emailExist]);

  useEffect(() => {
    if (email.match(validRegex) != null) {
      void (async () => {
        try {
          const data = await emailCheck(email);
          if (typeof data === 'object' && data !== null && 'exist' in data) {
            setEmailExist(Boolean(data.exist));
          }
        } catch (err: unknown) {
          const errorWithResponse = err as IErrorResponse; // type assertion
          setSnackBarFailed({
            snackBarMessage: errorWithResponse.response?.data?.message,
          });
        }
      })();
    }
  }, [email]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!emailError && email != null) {
      void (async () => {
        setLoader(true);
        await forgotPassword(email)
          .then(() => {
            setLoader(false);
            setEmailError('');
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: strings.displayText.resetLinkSuccessText,
              }),
            );
          })
          .catch((err) => {
            setLoader(false);
            setEmailError(strings.displayText.emailNotRegisteredText);
            dispatch(
              setSnackBarFailed({ snackBarMessage: err.response.data.message }),
            );
          });
      })();
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
          variant="h2"
          color={colors.greenAccent[500]}
          sx={{
            fontFamily: 'Source Sans Pro !important',
            fontWeight: 700,
            marginBlock: 1,
          }}
        >
          Forgot your password ?
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[400]}
          fontWeight={400}
          fontSize={14}
          sx={{
            textAlign: 'center',
          }}
        >
          Please enter the email address associated with your account.
        </Typography>
        <Box pb={5} />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: 350 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => {
              setUserVist(true);
            }}
            sx={{
              input: {
                '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                  '-webkit-text-fill-color': colors.greenAccent[100],
                },
              },
            }}
            autoFocus
          />
          <Typography
            component="h1"
            variant="body1"
            color={colors.primaryRed[100]}
            sx={{
              fontFamily: ['Inter', 'Source Sans Pro', 'sans-serif'].join(','),
              fontWeight: 400,
              fontSize: 14,
              letterSpacing: '-0.05px',
              position: 'absolute',
            }}
          >
            {emailError}
          </Typography>

          <Box pb={5} />
          <LoadingButton
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
            onClick={() => {
              handleErrorCheck();
            }}
          >
            <Typography component="h1" variant="h5">
              Request reset link
            </Typography>
          </LoadingButton>
          <Grid container>
            <Grid item xs textAlign="center">
              <Link href="/" variant="body2" underline="none">
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fragment>
  );
};
export default ForgotPassword;
