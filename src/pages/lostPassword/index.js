import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

import Loading from '../../components/Loading';

import { Section, Form } from './styles';

require('dotenv/config');

export default function Home() {
    const [ email, setEmail ] = useState('');
    const [ statusMessage, setStatusMessage ] = useState('');
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const [ redirect, setRedirect ] = useState({ status: false, page: '' });
    const googleCaptchaKey = '6LciV-wUAAAAACNecfbl1yg64ogCQyBNMSlo6KS_';

    if (redirect.status) return (<Redirect to={redirect.page} />);

    const callback = document.createElement('script');
    callback.type = 'text/javascript';
    callback.innerHTML = `function recaptchaCallback(res) {
        sessionStorage.setItem('captchaKey', res);
    }`
    document.body.appendChild(callback);

    const captcha = document.createElement('script');
    captcha.src = 'https://www.google.com/recaptcha/api.js';
    captcha.async = true;
    captcha.defer = true;
    document.head.appendChild(captcha);


    return (
        <>
            <Loading loading={loading.status} message={loading.message} />
            <Section>
                <h1>Recuperação de senha</h1>
                <h2>Informe o e-mail cadastrado para iniciar o processo</h2>
                <Form method="POST" id="lostPwd">

                    <label htmlFor="Email">E-mail:</label>
                    <input type="email" name="Email" id="Email" value={email} onChange={handleChangeEmail} onFocus={handleChangeEmail} />

                    <div>
                        <button onClick={submitData}>Enviar</button>
                    </div>
                    <div><p id="statusMessage">{statusMessage}</p></div>
                    <div id="g-recaptcha" className="g-recaptcha" data-theme="dark" data-callback="recaptchaCallback" data-sitekey={googleCaptchaKey}></div>
                </Form>
            </Section>
        </>
    );

    async function submitData(e) {
        e.preventDefault();
        const captcha = sessionStorage.getItem('captchaKey');
        if (!captcha) {
            setStatusMessage('Resolva o reCAPTCHA ⇩');
            blinkStatusElement();
            return
        }
        if (validateEmail()) {
            const grecaptcha = document.getElementById('g-recaptcha');
            const form = grecaptcha.parentNode;
            form.removeChild(grecaptcha);
            form.appendChild(grecaptcha);
            sessionStorage.removeItem('captchaKey');
            try {
                setLoading({ status: true, message: 'Enviando dados.' });
                const response = await api.post('/user/lostPwd', { email, captcha });
                console.log(response)
                if (response) {
                    alert('Um email foi enviado com as instruções para recuperar sua senha. Verifique sua caixa de entrada.');
                    setRedirect({ status: true, page: '/login' })
                }

            } catch (err) {
                if (err.response) {
                    if (err.response.data.error.search('Captcha') !== -1) setStatusMessage('Resolva novamente o reCAPTCHA');
                    if (err.response.data.error.search('Email') !== -1) {
                        setEmail('');
                        setStatusMessage('Email não cadastrado');
                    }
                    if (err.response.data.error.search('banned') !== -1) {
                        setEmail('');
                        setStatusMessage('Sua conta está bloqueada.');
                    }
                    console.log(err.response.data);
                }
                else console.log(err);
                setLoading({ status: false })

            }

        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
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
        setStatusMessage('');
        return true;
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
