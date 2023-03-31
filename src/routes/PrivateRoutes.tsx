import { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { loginCheck } from 'service/AuthService';
import { PrivateLayouts } from '../layouts';
import { RouteList, userRoles } from './Constant';

interface IPrivateRoutes {
  expectedRoles?: string[];
  userDetails?: unknown;
}

const PrivateRoutes: FC<IPrivateRoutes> = ({ expectedRoles, userDetails }) => {
  const isAuthorized = loginCheck();
  const areRolesRequired = !!expectedRoles?.length;
  const roles = [userRoles.superAdmin, userRoles.admin];

  const rolesMatch = areRolesRequired
    ? expectedRoles.some((r) => roles.includes(r))
    : true;

  if (!isAuthorized || !rolesMatch) {
    return (
      <Navigate
        to={{
          pathname: RouteList.SignIn,
        }}
        replace
      />
    );
  }

  return <PrivateLayouts />;
};

export default PrivateRoutes;
