import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
  en: {
    displayText: {
      emptyText: '',
      passwordsDoNotMatch: 'Passwords do not match',
      confirmYourPassword: 'Confirm your password',
      passwordMustBeNineErrText: 'Password must be at least 9 characters',
      passwordRegexValidationText:
        'Password should contain uppercase, lowercase, number, and symbol',
      passwordMustValidationText: 'Password must be entered',
      passwordUpdateSucessText: 'Password Updated Sucessfully.',
      setUpPasswordText: 'Set up password to login',
      invalidPasswordText: 'Invalid Password',

      invalidSignatureText: 'invalid signature',
      invalidEmailOrPasswordText: 'Invalid Email or Password',

      emailValidateText: 'Enter a valid email address',
      emailMustText: 'Email address must be entered',
      emailExistTest: 'Email address already exists',
      emailNotRegisteredText: 'Email address is not registered',
      invalidEmailText: 'Invalid email address',
      emailEmptyText: 'Email address is required',

      firstNameRequiredText: 'First name is required',
      lastNameRequiredText: 'Last name is required',
      userCreatedSuccessText: 'User Created Successfully.',
      userUpdatedSuccessText: 'User Updated Successfully.',

      resetLinkSuccessText: 'Reset link sent successfully',
      otpSentSuccessText: 'Otp sent successfully',
      otpVerifiedSuccessText: 'OTP verification successful',
      loginSuccesText: 'Login successful',
      unknownErrorText: 'Unknown Error!',
      deleteConfirmationText: 'Are you sure you want to delete the',
      allowDigitsOnlyText: 'Please enter digits only',
    },
  },
});
export const loginPageConst = {
  emailLabel: 'email',
};
