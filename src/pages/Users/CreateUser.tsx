import { Box, TextField, useTheme } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Buttons from 'components/elements/Buttons';
import { strings } from 'i18n/Strings';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { register } from 'service/UserService';
import { setSnackBarFailed, setSnackBarSuccess } from 'store/snackBar';
import { type RegisterData } from 'types';
import { colorTheme } from 'theme';
interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  empId?: string;
}

export interface ICreateUserForm {
  onClose: () => void;
  updateEmployeeData: () => void;
}

const CreateUser = (props: ICreateUserForm): JSX.Element => {
  const { onClose, updateEmployeeData } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<IUser>({});
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * there is a bug in mui in which autofocus sometimes doesn't
   * happen in react strict mode
   * https://github.com/mui/material-ui/issues/33004
   */

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (
    type: string,
    e: { target: { value: string } },
  ): undefined | string => {
    switch (type) {
      case 'firstName': {
        setFirstName(e.target.value);
        return;
      }
      case 'lastName': {
        setLastName(e.target.value);
        return;
      }
      case 'email': {
        setEmail(e.target.value);
        return;
      }
      default:
        return '';
    }
  };

  const handleValidation = (
    type: string,
    e: { target: { value: string } },
  ): void => {
    const err: IUser = {};
    switch (type) {
      case 'firstName': {
        if (e.target.value === '') {
          err.firstName = strings.displayText.firstNameRequiredText;
        }
        setFormError({ ...formError, firstName: err.firstName });
        break;
      }
      case 'lastName': {
        if (e.target.value === '') {
          err.lastName = strings.displayText.lastNameRequiredText;
        }
        setFormError({ ...formError, lastName: err.lastName });
        break;
      }
      case 'email': {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value === '') {
          err.email = strings.displayText.emailEmptyText;
        }
        if (!emailRegex.test(e.target.value)) {
          err.email = strings.displayText.invalidEmailText;
        }
        setFormError({ ...formError, email: err.email });
        break;
      }
      default:
        break;
    }
  };

  const debounceHandler = useCallback(
    debounce((type: string, e: { target: { value: string } }) => {
      handleValidation(type, e);
    }, 600),
    [],
  );

  const validateForm = (): boolean => {
    const err: IUser = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '') err.email = strings.displayText.emailEmptyText;
    if (!emailRegex.test(email)) {
      err.email = strings.displayText.invalidEmailText;
    }
    if (firstName === '') {
      err.firstName = strings.displayText.firstNameRequiredText;
    }
    if (lastName === '')
      err.lastName = strings.displayText.lastNameRequiredText;

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formFirstName = data.get('firstName')?.toString() ?? '';
    const formLastName = data.get('lastName')?.toString() ?? '';
    const formEmail = data.get('email')?.toString() ?? '';
    const value: RegisterData = {
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
    };
    const isValid = validateForm();

    if (isValid) {
      void (async () => {
        // create user service here
        register(value)
          .then(() => {
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: strings.displayText.userCreatedSuccessText,
              }),
            );
            updateEmployeeData();
            onClose();
          })
          .catch((err) => {
            dispatch(
              setSnackBarFailed({ snackBarMessage: err.response.data.message }),
            );
            console.error(`Something went wrong: ${String(err)}`);
          });
      })();
    }
  };

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          inputRef={inputRef}
          margin="normal"
          required
          fullWidth
          label="First name"
          name="firstName"
          onChange={(e) => {
            handleInputChange('firstName', e);
            debounceHandler('firstName', e);
          }}
          sx={{
            '& p': {
              color: 'red',
            },
            mb: 2,
          }}
          helperText={formError?.firstName}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Last name"
          name="lastName"
          onChange={(e) => {
            handleInputChange('lastName', e);
            debounceHandler('lastName', e);
          }}
          sx={{
            '& p': {
              color: 'red',
            },
            mb: 2,
          }}
          helperText={formError?.lastName}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email address"
          name="email"
          autoComplete="email"
          onChange={(e) => {
            handleInputChange('email', e);
            debounceHandler('email', e);
          }}
          sx={{
            '& p': {
              color: 'red',
            },
            mb: 2,
            input: {
              '&:-webkit-autofill': {
                '-webkit-box-shadow': '0 0 0 100px #eef9fa inset',
                '-webkit-text-fill-color': colors.greenAccent[100],
              },
            },
          }}
          helperText={formError?.email}
        />
        <Buttons
          disabled={
            formError?.email !== undefined ||
            formError?.firstName !== undefined ||
            formError?.lastName !== undefined
          }
          style={{ py: '0.8rem', mt: '1rem' }}
          type="submit"
          fullWidth={true}
        >
          Save
        </Buttons>
      </Box>
    </Box>
  );
};

export default CreateUser;
