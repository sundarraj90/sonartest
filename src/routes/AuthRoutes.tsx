import { AuthLayouts } from 'layouts';
import { type FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type RootState } from '../store';
import { RouteList } from './Constant';

const AuthRoutes: FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: RouteList.Home,
        }}
        replace
      />
    );
  }
  return <AuthLayouts />;
};

export default AuthRoutes;
