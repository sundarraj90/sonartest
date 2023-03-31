import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { strings } from 'i18n/Strings';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailCheck, login, sendOtp } from 'service/AuthService';
import { setSnackBarFailed, setSnackBarSuccess } from 'store/snackBar';
import { colorTheme } from 'theme';
import { type IErrorResponse } from 'types';
import Logo from '../../../assets/images/Logo100X132.png';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleEmailCheck = async (): Promise<void> => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Invalid email address');
      setEmailExist(false);
      return;
    }

    setEmailError('');
    setEmailExist(true);

    try {
      const res = await emailCheck(email);
      const exist = (res as { exist: boolean }).exist;
      setEmailExist(exist);
      if (!exist) {
        setEmailError('Invalid email address');
      }
    } catch (err) {
      setSnackBarFailed({
        snackBarMessage: (err as IErrorResponse).response.data.message,
      });
    }
  };

  useEffect(() => {
    if (email) {
      void handleEmailCheck();
    }
  }, [email, emailCheck]);

  const handleInputChange = (
    type: string,
    e: { target: { value: string } },
  ): string | undefined => {
    switch (type) {
      case 'email': {
        setEmail(e.target.value);
        return;
      }
      case 'password': {
        setPassword(e.target.value);
        return;
      }
      default:
        return '';
    }
  };

  const handleClick = (): void => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (): void => {
    if (email !== '') {
      if (!EMAIL_REGEX.test(email)) {
        setEmailError(strings.displayText.emailValidateText);
      } else {
        if (emailExist) {
          setEmailError('');
        } else {
          setEmailError(strings.displayText.invalidEmailText);
          dispatch(
            setSnackBarFailed({
              snackBarMessage: 'Email address is not registered as a user',
            }),
          );
        }
      }
    } else {
      setEmailError(strings.displayText.emailMustText);
    }
  };

  const PasswordValidation = (): void => {
    if (password !== '') {
      if (passwordCheck) {
        if (passwordCheck === strings.displayText.setUpPasswordText) {
          setPasswordError(strings.displayText.setUpPasswordText);
        } else {
          setPasswordError(strings.displayText.invalidPasswordText);
        }
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError(strings.displayText.passwordMustValidationText);
    }
  };

  useEffect(() => {
    if (passwordCheck || password) {
      PasswordValidation();
    }
  }, [passwordCheck, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (emailError === '' && passwordCheck === '') {
      setLoader(!loader);
      void (async () => {
        await login(email, password)
          .then(async () => {
            setLoader(false);
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: strings.displayText.loginSuccesText,
              }),
            );
            await sendOtp(email, 'email');
            navigate('/verifyotp', { state: { email: data.get('email') } });
          })
          .catch((err) => {
            setLoader(false);

            if (
              err.response.data.message ===
              strings.displayText.invalidEmailOrPasswordText
            ) {
              setPasswordCheck(err.response.data.message);
            } else if (
              err.response.data.message ===
              strings.displayText.setUpPasswordText
            ) {
              setPasswordCheck(err.response.data.message);
            } else {
              console.log(err.response.data.message);
            }
            if (err.response.data.message !== undefined) {
              dispatch(
                setSnackBarFailed({
                  snackBarMessage: err.response.data.message,
                }),
              );
            }
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
          sx={{ fontFamily: 'Source Sans Pro !important', fontWeight: 700 }}
        >
          Welcome to Marshmallow
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[500]}
          fontWeight={400}
          fontSize={14}
        >
          Smarter investment starts here
        </Typography>
        <Box pb={5} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              handleInputChange('email', e);
            }}
            autoFocus
            sx={{
              '& p': {
                color: 'red',
              },
              input: {
                '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                  '-webkit-text-fill-color': colors.greenAccent[100],
                },
              },
            }}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            autoCorrect="off"
            autoCapitalize="none"
            onChange={(e) => {
              handleInputChange('password', e);
            }}
            helperText={passwordError}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& p': {
                color: 'red',
              },
              input: {
                '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                  '-webkit-text-fill-color': colors.greenAccent[100],
                },
              },
            }}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loader}
            loadingPosition="end"
            onClick={() => {
              setPasswordCheck('');
              validateEmail();
              PasswordValidation();
            }}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.greenAccent[500],
              borderRadius: 2,
              py: 1.5,
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </LoadingButton>
          <Grid container>
            <Grid item xs textAlign={'center'}>
              <Link href="/forgotpassword" variant="body2" underline="none">
                <Typography component="h1" variant="h5">
                  Forgot password ?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fragment>
  );
};
export default SignIn;
