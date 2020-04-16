import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Bible from './pages/bible';
import Maps from './pages/maps';
import Podcast from './pages/podcast';
import Devotional from './pages/devotional';
import Login from './pages/login';
import Admin from './pages/admin';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/bible" component={Bible} />
        <Route path="/maps" component={Maps} />
        <Route path="/podcast" component={Podcast} />
        <Route path="/devotional" component={Devotional} />
        <Route path="/login" component={Login} />

        <Route path="/admin" component={Admin} />
    </Switch>
)

export default Routes;