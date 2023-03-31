import { type IRouteListProps } from 'types';

export const RouteList: IRouteListProps = {
  Home: '/',
  Dashboard: '/dashboard',
  Complaints: '/complaints',
  CustomerDetails: '/customer-details/:id',
  Customers: '/customers',
  Users: '/users',
  Logout: '/logout',

  /* AuthRouteList */
  SignIn: '/login',
  VerifyOtp: '/verifyotp',
  CreatePassword: '/createpassword/:empId/:token',
  ForgotPassword: '/forgotpassword',
  TokenError: '/tokenerror',
  NotFound: '*',
};

// export const AuthRouteList: any = {

// }

// export const PublicRouteList: any = {
//   NotFound: '*'
// }

export const userRoles = {
  superAdmin: 'Super Admin',
  admin: 'Admin',
  guest: 'Guest',
};
