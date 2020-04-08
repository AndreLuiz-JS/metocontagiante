import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Bible from './pages/bible';
import Maps from './pages/maps';
import Podcast from './pages/podcast';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/bible" component={Bible} />
        <Route path="/maps" component={Maps} />
        <Route path="/podcast" component={Podcast} />
    </Switch>
)

export default Routes;