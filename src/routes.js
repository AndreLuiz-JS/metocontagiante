import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Bible from './pages/bible';
import Maps from './pages/maps';
import Podcast from './pages/podcast';
import Devotional from './pages/devotional';
import Contact from './pages/contact';
import Login from './pages/login';
import ChangePwd from './pages/changePassword';
import LostPwd from './pages/lostPassword';
import SignUp from './pages/login/signUp';
import Admin from './pages/admin';

const Routes = () => (
    <Switch>
        <Route path="/bible" component={Bible} />
        <Route path="/maps" component={Maps} />
        <Route path="/podcast" component={Podcast} />
        <Route path="/devotional" component={Devotional} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/lostPwd" component={LostPwd} />

        <Route path="/admin" component={Admin} />

        <Route path="/:token" component={ChangePwd} />
        <Route path="/" component={Main} />
    </Switch>
)

export default Routes;