import { type FC } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import PrivateRoutes from './PrivateRoutes';
import { authRoutes, privateRoutes, publicRoutes } from './Routes';
import { userRoles } from './Constant';

const RoutesConfig: FC = (): JSX.Element => (
  <Switch>
    <Route element={<AuthRoutes />}>
      {authRoutes.map(({ path, Component }, index: number) =>
        Component ? (
          <Route
            key={`${index}-${String(path)}`}
            path={path}
            element={<Component />}
          />
        ) : null,
      )}
    </Route>

    <Route
      element={
        <PrivateRoutes
          expectedRoles={[userRoles.admin, userRoles.superAdmin]}
        />
      }
    >
      {privateRoutes.map(({ path, Component }, index) =>
        Component ? (
          <Route key={`${index}`} path={path} element={<Component />} />
        ) : null,
      )}
    </Route>

    {publicRoutes.map(({ path, Component }, index: number) => (
      <Route
        key={`${index}-${String(path)}`}
        path={path}
        element={<Component />}
      />
    ))}
  </Switch>
);

export default RoutesConfig;
