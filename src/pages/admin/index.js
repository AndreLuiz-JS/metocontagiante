import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from '../../components/AdminNavbar';
import Loading from '../../components/Loading';

import { Container } from './styles';

import Home from './home';
import User from './user';
import UserManager from './userManager';
import Devotional from './devotional';
import AddDevotional from './devotional/new';
import Cell from './cell';
import AddCell from './cell/new';
import Advert from './advert';

import api from '../../services/api';


export const UserContext = React.createContext();

export default function Admin() {
    const [ userAccess, setUserAccess ] = useState([]);
    const [ userInfo, setUserInfo ] = useState({});
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState({ status: true, message: 'Verificando dados.' });

    async function authenticate() {
        const localToken = localStorage.getItem('ACCESS_TOKEN');
        if (!localToken) {
            setRedirect(true);
        } else {
            setLoading({ status: true, message: 'Verificando dados.' })
            try {
                const response = await api.get('/auth', { headers: { Authorization: `Bearer ${localToken}` } });
                const { user_types, user_info } = response.data;
                setUserInfo({ ...user_info, token: localToken });
                setUserAccess(user_types);
                setLoading({ status: false, message: '' });
                setIsAuthenticated(true);
            } catch (err) {
                console.log(err.response);
                localStorage.removeItem('ACCESS_TOKEN');
                setIsAuthenticated(false);
                setRedirect(true);
            }
        }
    }

    useEffect(() => {
        authenticate();
    }, []);

    if (redirect) return (
        <Redirect to="/login" />
    )
    if (isAuthenticated) return (
        <Container>
            <UserContext.Provider value={{ userAccess, userInfo }}>
                <Navbar />
                <Switch>

                    <Route exact path="/admin" component={Home} />
                    <Route exact path="/admin/user" component={User} />
                    <Route exact path="/admin/user-manager" component={UserManager} />
                    <Route exact path="/admin/devotional" component={Devotional} />
                    <Route exact path="/admin/devotional/new" component={AddDevotional} />
                    <Route exact path="/admin/cell" component={Cell} />
                    <Route exact path="/admin/cell/new" component={AddCell} />
                    <Route exact path="/admin/advert" component={Advert} />
                </Switch>
            </UserContext.Provider>
        </Container >
    )
    return (
        <>
            <Loading loading={loading.status} message={loading.message} />
        </>
    )
}