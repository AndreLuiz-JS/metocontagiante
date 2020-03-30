import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Bible from './pages/bible';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/bible" component={Bible} />
    </Switch>
)

export default Routes;