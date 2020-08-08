import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import links from '../../components/AdminNavbar/links';

export default function Home(props) {
    const { userAccess } = useContext(props.UserContext);
    const link = links.find(element => userAccess.includes(element.user_access));
    return (
        <Redirect to={{
            pathname: link.to
        }} />
    )

}