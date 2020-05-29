import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import api from '../../services/api';

import Loading from '../../components/Loading';

import { Section, Form } from './styles';

require('dotenv/config');

export default function Home() {
    const params = useParams();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');
    const [ statusMessage, setStatusMessage ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ redirect, setRedirect ] = useState({ status: false, page: '' });


    useEffect(() => {
        async function fetchData() {
            const { token } = params;
            setLoading(true);
            try {
                const response = await api.get('/auth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(response.data.user_info.name);
                setEmail(response.data.user_info.email);
                setLoading(false);
            }
            catch (err) {
                alert('Link de redefinição de senha inválido ou expirado, solicite um novo link de redefinição de senha.')
                setRedirect({ status: true, page: '/login' })
            }
        }
        fetchData();
    }, [ params ]);

    if (redirect.status) return (<Redirect to={redirect.page} />);
    if (loading) return <Loading status={true} message="verificando link" />
    return (
        <Section>
            <Loading loading={loading.status} message={loading.message} />
            <h1>Recuperação de senha</h1>
            <p>Bem-vindo de volta <span>{name}</span> <br /><span>{email}</span></p >
            <Form method="POST" id="userSignup">

                <label htmlFor="Password">nova senha:</label>
                <input type="password" name="Password" id="Password" value={password} onChange={handleChangePassword} onFocus={handleChangePassword} />
                <label htmlFor="PasswordConfirm">confirme a nova senha:</label>
                <input type="password" name="PasswordConfirm" id="PasswordConfirm" value={passwordConfirm} onChange={handleChangePasswordConfirm} onFocus={handleChangePasswordConfirm} />
                <div>
                    <button onClick={submitData}>Alterar</button>
                </div>
                <div><p id="statusMessage">{statusMessage}</p></div>
            </Form>
        </Section >
    );

    async function submitData(e) {
        e.preventDefault();
        if (verifyData()) {
            try {
                setLoading({ status: true, message: "Alterando senha" });
                await api.put('user/changePwd', { password }, { headers: { Authorization: `Bearer ${params.token}` } });
                alert('Senha alterada com sucesso');
            } catch (err) {
                if (err.response)
                    console.log(err.response.data);
                alert('Link expirado ou já utilizado. Realize o processo de recuperação de senha novamente.')
                setLoading({ status: false })
            }
            finally {
                setRedirect({ status: true, page: '/login' });
            }
        }
    }

    function verifyData() {
        setStatusMessage('');
        if (password.length < 6) {
            setStatusMessage('A senha deve conter pelo menos 6 caracteres.')
            return false;
        }
        if (passwordConfirm !== password) {
            setStatusMessage('As senhas não conferem.');
            return false;
        }

        return true;

    }
    function handleChangePassword(e) {
        setStatusMessage('');
        if (e.target.value.length <= 30) setPassword(e.target.value);
        if (e.target.value.length > 30) {
            if (statusMessage === 'Senha com limite máximo de 30 caracteres')
                blinkStatusElement();
            setStatusMessage('Senha com limite máximo de 30 caracteres');
        }
    }

    function handleChangePasswordConfirm(e) {
        setPasswordConfirm(e.target.value);
    }

    function blinkStatusElement() {
        const statusElement = document.getElementById('statusMessage');
        let value = 0;
        let direction = 'up';
        let repeat = 3;
        function setFilter() {
            statusElement.style.filter = `hue-rotate(${value * 30}deg) drop-shadow(0 0 ${value * 2}rem #ff0000) brightness(${value + 1})`;
            if (direction === 'up') {
                value += 0.1;
            }
            if (direction === 'down') {
                value -= 0.1;
            }
            if (value > 1) {
                direction = 'down'
            }
            if (value < 0 && repeat > 0) {
                direction = 'up';
                repeat--;
            }
            if (repeat > 0) setTimeout(setFilter, 20)
        }
        setFilter();
    }
}
