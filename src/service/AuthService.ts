import jwt_decode from 'jwt-decode';
import { RouteList } from 'routes';
import ApiUtil from '../utils/ApiUtil';

interface Credentials {
  refresh_token: string;
  access_token: string;
}

interface Tokens {
  access_token: string | undefined;
  refresh_token: string | undefined;
}

interface VerifyOtpResponse {
  tokens?: Tokens;
  token?: string;
}

interface PasswordData {
  password: string;
  confirmPassword: string;
}

interface EmailCheckResponse {
  exist?: boolean;
}

const loginCheck = (): unknown => {
  const credentials = JSON.parse(localStorage.getItem('credentials') as string);
  if (credentials?.access_token) {
    const { exp }: { exp: number } = jwt_decode(credentials.access_token);
    if (Date.now() <= exp * 1000) {
      return true;
    }
    localStorage.removeItem('credentials');
  }
  return false;
};

const storeAccessToken = async (credentials: Credentials): Promise<boolean> => {
  let localCredentials = JSON.parse(
    localStorage.getItem('credentials') as string,
  );

  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  return await new Promise(async (resolve, reject) => {
    try {
      if (
        Boolean(localCredentials?.refresh_token) &&
        Boolean(localCredentials?.access_token)
      ) {
        /* The refresh_token api doesn't return refresh_token. in that case we keep
         * Existing refresh token
         */
        localCredentials = {
          ...localCredentials,
          ...credentials,
        };
        localStorage.setItem('credentials', JSON.stringify(localCredentials));
      } else {
        localStorage.setItem('credentials', JSON.stringify(credentials));
      }

      setTimeout(() => {
        resolve(true);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

const removeAccessToken = async (): Promise<void> => {
  await new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};



async function login(email: string, password: string): Promise<unknown> {
  const response = await new Promise((resolve, reject) => {
    try {
      const result = ApiUtil.postWithoutToken('admin/auth/login', {
        email,
        password,
      });
      setTimeout(() => {
        resolve(result);
      }, 1000);
    } catch (error) {
      reject(error)
    }

  });
  return response;
}

const sendOtp = async (value: string, type: string): Promise<unknown> =>
  await ApiUtil.postWithoutToken('admin/auth/sendOtp', { value, type });

const verifyOtp = async (value: string, type: string, otp: string): Promise<string | undefined> => {
  const res = await ApiUtil.postWithoutToken('admin/auth/verifyOtp', {
    value,
    type,
    otp,
  }) as VerifyOtpResponse; // Add a type assertion to cast the response to VerifyOtpResponse

  // access and refresh tokens
  if (res?.tokens) {
    await storeAccessToken(res.tokens as Credentials);
  }
  // email token for otp
  return res?.token;
};

const logout = (): void => {
  void removeAccessToken();
  localStorage.clear();
  window.history.replaceState(null, '', RouteList.SignIn);
  window.location.reload();
};

const emailCheck = async (email: string): Promise<EmailCheckResponse | unknown> => {
  try {
    const employeeEmail: unknown = await ApiUtil.postWithoutToken(
      'admin/auth/emailAlreadyExists',
      {
        email,
      },
    );
    return employeeEmail;
  } catch (error) {
    throw new Error(`something went to wrong!. ${String(error)}`);
  }
};

const emailDetails = async (email: string): Promise<unknown> => {
  try {
    const employeeEmail = await ApiUtil.postWithoutToken(
      'admin/auth/emailDetails',
      {
        email,
      },
    );

    return employeeEmail;
  } catch (error) {
    throw new Error(`something went to wrong!. ${String(error)}`);
  }
};

const forgotPassword = async (email: string): Promise<void> => {
  try {
    const employeeEmail = await ApiUtil.postWithoutToken(
      'admin/auth/forgotpassword',
      {
        email,
      },
    );
    setTimeout(() => {
      return employeeEmail;
    }, 1000);
  } catch (error) {
    throw new Error(`something went to wrong!. ${String(error)}`);
  }
};

const updatePassword = async (empId: string, token: string, data: PasswordData): Promise<void> => {
  try {
    const result = await ApiUtil.postWithoutToken(
      `admin/auth/updatepassword/${empId}/${token}`,
      {
        password: data?.password,
        confirmPassword: data?.confirmPassword,
      },
    );
    setTimeout(() => {
      return result
    }, 1000);
  } catch (error) {
    throw new Error(`something went to wrong!. ${String(error)}`);
  }
};

export {
  loginCheck,
  storeAccessToken,
  removeAccessToken,
  login,
  sendOtp,
  verifyOtp,
  logout,
  emailCheck,
  emailDetails,
  forgotPassword,
  updatePassword,
}