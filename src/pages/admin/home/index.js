import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../';
import links from '../../../components/AdminNavbar/links';

export default function Home() {
    const { userAccess } = useContext(UserContext);
    const link = links.find(element => userAccess.includes(element.user_access));
    return (
        <Redirect to={{
            pathname: link.to
        }} />
    )

}