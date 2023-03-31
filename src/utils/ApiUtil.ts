import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from 'axios';
import { storeAccessToken } from 'service/AuthService';

axios.defaults.baseURL = process.env.REACT_APP_MARSHMALLOW_API;
interface IgetTokenCredentials {
  accessToken: string | null;
  refreshToken: string | null;
}
interface Credentials {
  access_token: string;
  token_type: string;
  refresh_token: string;
}
interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}
interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const getToken = (): { access_token: string | null; token_type: string; refresh_token: string | null; } => {
  const credentials: IgetTokenCredentials | null = JSON.parse(
    localStorage.getItem('credentials') as string,
  );
  const accessToken = credentials?.accessToken ?? null;
  const refreshToken = credentials?.refreshToken ?? null;
  if ((accessToken != null) && (refreshToken != null)) {
    return {
      access_token: accessToken,
      token_type: 'bearer',
      refresh_token: refreshToken,
    };
  } else {
    return {
      access_token: null,
      token_type: 'bearer',
      refresh_token: null,
    };
  }
};

const apiUtils = {
  getWithoutToken: async (uri: string) =>
    await new Promise((resolve, reject) => {
      axios
        .get(`api/${uri}`, {
          headers: {
            zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    }),

  postWithoutToken: async (uri: string, body?: unknown) =>
    await new Promise((resolve, reject) => {
      axios
        .post(`api/${uri}`, body, {
          headers: {
            zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    }),

  getWithToken: async (uri: string) =>
    await new Promise((resolve, reject) => {
      const credentials = getToken() as Credentials;
      if (
        credentials?.access_token != null &&
        (credentials.token_type.length > 0) &&
        credentials.token_type.length > 0
      ) {
        axios
          .get(`api/${uri}`, {
            headers: {
              'x-access-token': credentials.access_token,
              'x-access-token-type': credentials.token_type,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            reject(error);
          });
      } else {
        reject(new Error('token is not valid'));
      }
    }),

  postWithToken: async (uri: string, body: unknown) =>
    await new Promise((resolve, reject) => {
      const credentials = getToken() as Credentials;

      if (
        credentials?.access_token != null &&
        credentials.token_type.length > 0
      ) {
        axios
          .post(`api/${uri}`, body, {
            headers: {
              'x-access-token': credentials.access_token,
              'x-access-token-type': credentials.token_type,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            reject(error);
          });
      } else {
        reject(new Error('token is not valid'));
      }
    }),

  putWithToken: async (uri: string, body: unknown) =>
    await new Promise((resolve, reject) => {
      const credentials = getToken() as Credentials;

      if (
        credentials?.access_token != null &&
        credentials.token_type.length > 0
      ) {
        axios
          .put(`api/${uri}`, body, {
            headers: {
              'x-access-token': credentials.access_token,
              'x-access-token-type': credentials.token_type,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            reject(error);
          });
      } else {
        reject(new Error('token is not valid'));
      }
    }),

  deleteWithToken: async (uri: string) =>
    await new Promise((resolve, reject) => {
      const credentials = getToken() as Credentials;

      if (
        credentials?.access_token != null &&
        credentials.token_type.length > 0
      ) {
        axios
          .delete(`api/${uri}`, {
            headers: {
              'x-access-token': credentials.access_token,
              'x-access-token-type': credentials.token_type,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            reject(error);
          });
      } else {
        reject(new Error('token is not valid'));
      }
    }),
};

export default apiUtils;

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null): void => {
  failedQueue.forEach((prom: FailedQueueItem) => {
    if (error !== null && error !== undefined) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = err.config as InternalAxiosRequestConfig;
    if (err.response?.status === 401 && !originalRequest?.retry) {
      if (isRefreshing) {
        return await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(async (token: unknown) => {
            if (typeof token === 'string' && originalRequest?.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return await axios(originalRequest);
            }
            return await Promise.reject(new Error('originalRequest is undefined'));
          })
          .catch(async (e) => await Promise.reject(e));
      }

      if (originalRequest) {
        originalRequest.retry = true;
      }
      isRefreshing = true;

      return await new Promise((resolve, reject) => {
        const credentials = getToken() as Credentials;
        void axios
          .get('api/user/auth/refreshToken', {
            headers: {
              'x-access-token': credentials.refresh_token,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          })
          .then(({ data }) => {
            if (originalRequest?.headers) {
              originalRequest.headers['x-access-token'] = data.access_token;
              originalRequest.headers['x-access-token-type'] =
                credentials.token_type;
              void storeAccessToken(data);
              processQueue(null, data.fooToken);
              resolve(axios(originalRequest));
            } else {
              reject(new Error('originalRequest is undefined'));
            }
          })
          .catch((error: AxiosError) => {
            processQueue(error, null);
            reject(error);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return await Promise.reject(err);
  },
);
