import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import ScrollToTop from './ScrollToTop';

function AppRouter() {
  return (
        <ScrollToTop>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} exact={route.exact} component={route.component} />
            ))}
          </Switch>
        </ScrollToTop>

  );
}

export default AppRouter;
