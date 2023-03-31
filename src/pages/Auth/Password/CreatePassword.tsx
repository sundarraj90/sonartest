import { Avatar, Box, TextField, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState, type ChangeEvent } from 'react';
import { colorTheme } from 'theme';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePassword } from 'service/AuthService';
import { getUserTokenById } from 'service/UserService';
import { useDispatch } from 'react-redux';
import { setSnackBarSuccess, setSnackBarFailed } from 'store/snackBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { strings } from 'i18n/Strings';
import Logo from '../../../assets/images/Logo100X132.png';
import { type IErrorResponse } from 'types';
interface IUpdatePasswordData {
  password: string;
  confirmPassword: string;
}

interface IEmployeeData {
  basicInfo: { employeeResetToken: string };
  message: string;
}

const CreatePassword = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = colorTheme(theme.palette.mode);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfrimPassword, setShowConfrimPassword] =
    useState<boolean>(false);
  const [userVisit, setUserVist] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [matchError, setMatchError] = useState<string>('');
  const [tokenCheck, setTokenCheck] = useState<string>('');
  const navigate = useNavigate();
  const { empId, token } = useParams<Record<string, string | undefined>>();
  const [loader, setLoader] = useState<boolean>(false);

  const userTokenCheck = async (): Promise<void> => {
    if (empId) {
      try {
        const res = (await getUserTokenById(Number(empId))) as IEmployeeData;
        if (res.basicInfo?.employeeResetToken) {
          setTokenCheck(res.basicInfo?.employeeResetToken);
        }
      } catch (err) {
        throw new Error(`${String(err)}`);
      }
    }
  };

  useEffect(() => {
    setTokenCheck('');
    void userTokenCheck();
  }, []);

  if (token !== tokenCheck) {
    navigate('/tokenerror');
  }

  const handleErrorCheck = (): void => {
    if (password !== '') {
      if (password.length < 9) {
        setErrorMsg(strings.displayText.passwordMustBeNineErrText);
      } else if (
        password.match(/[0-9]/) != null &&
        password.match(/[A-Z]/) != null &&
        password.match(/[a-z]/) != null &&
        password.match(/^(?=.*[~`!@#$%^&*()--+={}\\[\]|\\:;"'<>,.?/_₹]).*$/) !=
          null
      ) {
        setErrorMsg('');
      } else {
        setErrorMsg(strings.displayText.passwordRegexValidationText);
      }
    } else if (userVisit) {
      setErrorMsg(strings.displayText.passwordMustValidationText);
    } else {
      setErrorMsg('');
    }
    // match paassword check
    if (password !== '') {
      if (confirmPassword.length > 0 && confirmPassword !== password) {
        setMatchError(strings.displayText.passwordsDoNotMatch);
      } else {
        setMatchError('');
      }
    } else {
      setMatchError('');
    }
  };

  useEffect(() => {
    handleErrorCheck();
  }, [password, userVisit, confirmPassword]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data: IUpdatePasswordData = { password, confirmPassword };
    if (confirmPassword !== '') {
      if (password === confirmPassword) {
        setMatchError('');
      } else {
        setMatchError(strings.displayText.passwordsDoNotMatch);
      }
    } else {
      setMatchError(strings.displayText.confirmYourPassword);
    }

    if (
      !errorMsg &&
      !matchError &&
      password === confirmPassword &&
      empId != null &&
      token != null
    ) {
      void (async () => {
        setLoader(true);
        await updatePassword(empId, token, data)
          .then((res: unknown) => {
            const myRes = res as IEmployeeData;
            setLoader(false);
            if (myRes?.message === strings.displayText.invalidSignatureText) {
              dispatch(setSnackBarFailed({ snackBarMessage: myRes?.message }));
              navigate('/tokenerror');
            } else {
              dispatch(
                setSnackBarSuccess({
                  snackBarMessage: strings.displayText.passwordUpdateSucessText,
                }),
              );
              navigate('/');
            }
          })
          .catch((err: unknown) => {
            setLoader(false);
            const errorWithResponse = err as IErrorResponse; // type assertion
            dispatch(
              setSnackBarFailed({
                snackBarMessage: errorWithResponse.response.data.message,
              }),
            );
            navigate('/tokenerror');
          });
      })();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };
  const handleShowConfrimPassword = (): void => {
    setShowConfrimPassword((show) => !show);
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
          Set your password
        </Typography>
        <Box pb={1} />
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
          Password must be of at least 9 characters and should contain
          uppercase, lowercase, number and symbol
        </Typography>
        <Box pb={2} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Enter password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="*****"
            autoComplete="password"
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
            sx={{
              input: {
                '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                  '-webkit-text-fill-color': colors.greenAccent[100],
                },
              },
            }}
            onBlur={() => {
              setUserVist(true);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            component="h5"
            variant="h5"
            fontWeight={400}
            fontSize={14}
            color={colors.primaryRed[100]}
            sx={{
              position: errorMsg.length > 38 ? '' : 'absolute',
            }}
          >
            {errorMsg}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type={showConfrimPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="*****"
            autoComplete="current-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            sx={{
              marginTop: errorMsg.length > 38 ? 1 : 5,
              input: {
                '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                  '-webkit-text-fill-color': colors.greenAccent[100],
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfrimPassword}>
                    {showConfrimPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            component="h5"
            variant="h5"
            fontWeight={400}
            fontSize={14}
            color={colors.primaryRed[100]}
            sx={{
              position: 'absolute',
            }}
          >
            {matchError}
          </Typography>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loader}
            loadingPosition="end"
            onClick={() => {
              handleErrorCheck();
            }}
            // disabled={
            //   !(
            //     confirmPassword === password &&
            //     password.length >= 9 &&
            //     password.match(/[0-9]/) != null &&
            //     password.match(/[A-Z]/) != null &&
            //     password.match(/[a-z]/) != null
            //   )
            // }
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.greenAccent[500],
              borderRadius: 2,
              py: 1.5,
              marginTop: 5,
            }}
          >
            <Typography component="h1" variant="h5">
              Continue
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </Fragment>
  );
};
export default CreatePassword;
