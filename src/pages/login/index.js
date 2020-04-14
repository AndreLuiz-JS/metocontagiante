import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading';

import { Form } from './styles';

import api from '../../services/api';

export default function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ statusMessage, setStatusMessage ] = useState('');
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const [ redirect, setRedirect ] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setStatusMessage('');
        if (validateEmail())
            try {
                setLoading({ status: true, message: 'Efetuando seu login' });
                const response = await api.post('/auth', { email, password });
                setLoading({ status: false, message: '' });
                const { token } = response.data;
                localStorage.setItem('ACCESS_TOKEN', token);
                setRedirect(true);
            } catch (err) {
                setLoading({ status: false, message: '' });
                setStatusMessage('Autenticação falhou. Tente novamente.');
                console.log(err);
            }
    }
    function validateEmail() {
        if (email.indexOf('@') === -1) {
            setStatusMessage('Seu endereço de e-mail deve conter uma "@"')
            return false;
        }
        const [ user, domain ] = email.split('@');
        if (user.length < 3) {
            setStatusMessage('Seu usuário antes da "@" deve conter pelo menos 3 caracteres.')
            return false;
        }
        if (domain.indexOf('.') === -1) {
            setStatusMessage('Seu endereço de email precisa ter um domínio. Ex.: .co, .com, .com.br')
            return false;
        }
        const [ server, topDomain ] = domain.split('.');
        if (server.length < 3) {
            setStatusMessage('O servidor de email após "@" deve conter pelo menos 3 caracteres')
            return false;
        }
        if (topDomain.length < 2) {
            setStatusMessage('O domínio do email deve conter pelo menos 2 caracteres. Ex.: .co, .com, .com.br')
            return false;
        }
        return true;
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    if (redirect) return (<Redirect to="/admin" />);
    return (
        <Form method="POSt">
            <Loading loading={loading.status} message={loading.message} />
            <label htmlFor="email">E-mail:</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChangeEmail} />
            <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password" value={password} onChange={handleChangePassword} />
            <div>
                <button onClick={handleSubmit}>Login</button>
            </div>
            <div><p>{statusMessage}</p></div>
        </Form>
    )
}