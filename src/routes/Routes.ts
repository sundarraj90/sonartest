import { RouteList } from './Constant';
import {
  SignIn,
  Home,
  VerifyOtp,
  Complaints,
  Customers,
  Users,
  NotFound,
  CreatePassword,
  ForgotPassword,
  TokenVaildError,
  CustomerDetails,
} from '../pages';
import { type ComponentType } from 'react';

interface IRouteListProps {
  name?: string;
  path?: string;
  Component: ComponentType<unknown> | null;
}


export const privateRoutes: IRouteListProps[] = [
  {
    name: 'Home',
    path: RouteList.Home,
    Component: Home,
  },
  {
    name: 'Complaints',
    path: RouteList.Complaints,
    Component: Complaints,
  },
  {
    name: 'Customers',
    path: RouteList.Customers,
    Component: Customers,
  },
  {
    name: 'Users',
    path: RouteList.Users,
    Component: Users,
  },
  {
    name: 'Logout',
    path: RouteList.Logout,
    Component: Home
  },
  {
    path: RouteList.CustomerDetails,
    Component: CustomerDetails,
  },
];

export const authRoutes: IRouteListProps[] = [
  {
    Component: SignIn,
    path: RouteList.SignIn,
  },
  {
    Component: VerifyOtp,
    path: RouteList.VerifyOtp,
  },
  {
    Component: CreatePassword,
    path: RouteList.CreatePassword,
  },
  {
    Component: ForgotPassword,
    path: RouteList.ForgotPassword,
  },
  {
    Component: TokenVaildError,
    path: RouteList.TokenError,
  },
];

export const publicRoutes = [
  {
    Component: NotFound,
    path: RouteList.NotFound,
  },
];
