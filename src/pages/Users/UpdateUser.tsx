import { Box, TextField } from '@mui/material';
import { useState, useCallback } from 'react';
import { emailAlreadyExists, updateEmployee } from 'service/UserService';
import Buttons from 'components/elements/Buttons';
import { useDispatch } from 'react-redux';
import { setSnackBarSuccess, setSnackBarFailed } from 'store/snackBar';
import { strings } from 'i18n/Strings';
import { debounce } from 'lodash';
import { type EmployeeBody } from 'types';
interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  empId?: string;
}
interface IUpdateUserForm {
  onClose: () => void;
  updateEmployeeData: () => void;
  data: IUser;
}
interface EmailExistsResponse {
  exist: boolean;
}

const UpdateUser = (props: IUpdateUserForm): JSX.Element => {
  const { onClose, updateEmployeeData, data } = props;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(
    data?.firstName ? data?.firstName : '',
  );
  const [lastName, setLastName] = useState(
    data?.lastName ? data?.lastName : '',
  );
  const [email, setEmail] = useState(data?.email ? data?.email : '');
  const [formError, setFormError] = useState<IUser>({});
  // const [loading, setLoading] = useState(false)

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
        if (e.target.value === '')
          err.firstName = strings.displayText.firstNameRequiredText;
        setFormError({ ...formError, firstName: err.firstName });
        return;
      }
      case 'lastName': {
        if (e.target.value === '')
          err.lastName = strings.displayText.lastNameRequiredText;
        setFormError({ ...formError, lastName: err.lastName });
        return;
      }
      case 'email': {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value === '')
          err.email = err.email = strings.displayText.emailEmptyText;
        else if (!emailRegex.test(e.target.value)) {
          err.email = 'Invalid email address';
        } else if (data?.email !== email) {
          const isExistEmail = emailAlreadyExists(email);
          if ((isExistEmail as unknown as EmailExistsResponse)?.exist) {
            err.email = strings.displayText.emailExistTest;
          }
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
    if (data?.email !== email) {
      const isExistEmail = emailAlreadyExists(email);
      if ((isExistEmail as unknown as EmailExistsResponse)?.exist) {
        err.email = strings.displayText.emailExistTest;
      }
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
    const formData = new FormData(event.currentTarget);
    const formFirstName = formData.get('firstName')?.toString() ?? '';
    const formLastName = formData.get('lastName')?.toString() ?? '';
    const formEmail = formData.get('email')?.toString() ?? '';
    const value: EmployeeBody =
      formEmail !== email
        ? {
            firstName: formFirstName,
            lastName: formLastName,
            email: formEmail,
          }
        : {
            firstName: formFirstName,
            lastName: formLastName,
          };
    const isValid = validateForm();

    if (isValid) {
      void (async () => {
        // create user service here
        updateEmployee(Number(data?.empId), value)
          .then(() => {
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: strings.displayText.userUpdatedSuccessText,
              }),
            );
            updateEmployeeData();
            onClose();
          })
          .catch((err) => {
            dispatch(
              setSnackBarFailed({
                snackBarMessage: err.response.data.message,
              }),
            );
            console.log(err);
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
          margin="normal"
          required
          fullWidth
          label="First name"
          value={firstName}
          name="firstName"
          onChange={(e) => {
            handleInputChange('firstName', e);
            debounceHandler('firstName', e);
          }}
          autoFocus
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
          value={lastName}
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
          value={email}
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
          }}
          helperText={formError?.email}
        />
        <Buttons
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

export default UpdateUser;
