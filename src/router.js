import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@iso/components/utility/loader';

//const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('@iso/containers/A_monitor/monitorpage.js')),
    //component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  }
];

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            {/*
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            */}
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
