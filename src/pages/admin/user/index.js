import React, { useState, useContext } from 'react';

import { UserContext } from '../';
import PasswordDialog from './passwordDialog';

import { Section, Header, Form } from './styles';

export default function Home(props) {
    const { userInfo } = useContext(UserContext);
    const [ newName, setNewName ] = useState(userInfo.name);
    const [ newEmail, setNewEmail ] = useState(userInfo.email);
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConfirm, setNewPasswordConfirm ] = useState('');
    const [ statusMessage, setStatusMessage ] = useState('');
    const [ disabledEmailButton, setDisabledEmailButton ] = useState(true);
    const [ disabledNameButton, setDisabledNameButton ] = useState(true);
    const [ disabledPasswordButton, setDisabledPasswordButton ] = useState(true);

    return (
        <Section>
            <Header>
                <p>{userInfo.name}: {userInfo.email}</p>
                <p>({userInfo.user_type})</p>
            </Header>
            <h1>Alterar dados do usuário</h1>
            <Form method="POST">

                <label htmlFor="name">novo Nome:</label>
                <input type="name" name="name" id="name" value={newName}
                    onChange={handleChangeName}
                    onFocus={handleChangeName}
                />
                <PasswordDialog name={newName} disabled={disabledNameButton} reference={'name'} />

                <label htmlFor="newEmail">novo E-mail:</label>
                <input type="email" name="newEmail" id="newEmail" value={newEmail} onChange={handleChangeEmail} onFocus={handleChangeEmail} />
                <PasswordDialog email={newEmail} disabled={disabledEmailButton} reference='email' />
                <div><h2>Troca de senha</h2></div>
                <label htmlFor="newPassword">nova senha:</label>
                <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={handleChangePassword} onFocus={handleChangePassword} />
                <span></span>
                <label htmlFor="newPasswordConfirm">confirme nova senha:</label>
                <input type="password" name="newPasswordConfirm" id="newPasswordConfirm" value={newPasswordConfirm} onChange={handleChangePasswordConfirm} onFocus={handleChangePasswordConfirm} />
                <PasswordDialog newPassword={newPassword} disabled={disabledPasswordButton} reference='pass' />

                <div><p id="statusMessage">{statusMessage}</p></div>
            </Form>
        </Section>
    )

    function handleChangeName(e) {
        setStatusMessage('')
        if (e.target.value.length <= 50) setNewName(e.target.value)
        if (e.target.value.length > 50) {
            if (statusMessage === 'Nome com limite máximo de 50 caracteres')
                blinkStatusElement();
            setStatusMessage('Nome com limite máximo de 50 caracteres');
        }
        if (e.target.value.length < 2) {
            setDisabledNameButton(true);
            setStatusMessage('Nome deve conter pelo menos 2 caracteres.')
        } else {
            setDisabledNameButton(false);
        }
    }
    function handleChangeEmail(e) {
        setNewEmail(e.target.value);
        if (!validateEmail(e.target.value)) setDisabledEmailButton(true);
        else setDisabledEmailButton(false);
    }
    function handleChangePassword(e) {
        setStatusMessage('');
        if (e.target.value.length <= 30) setNewPassword(e.target.value);
        if (e.target.value.length > 30) {
            if (statusMessage === 'Senha com limite máximo de 30 caracteres')
                blinkStatusElement();
            setStatusMessage('Senha com limite máximo de 30 caracteres');
        }
        if (newPassword.length < 6) {
            setDisabledPasswordButton(true);
            setStatusMessage('A senha deve conter pelo menos 6 caracteres.')
        } else {
            setDisabledPasswordButton(false);
        }
    }
    function handleChangePasswordConfirm(e) {
        setNewPasswordConfirm(e.target.value);
        if (e.target.value !== newPassword) {
            setDisabledPasswordButton(true);
            setStatusMessage('As senhas não conferem.');
        } else {
            setDisabledPasswordButton(false);
            setStatusMessage('')
        }
    }

    function validateEmail(email) {
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
            statusElement.style.filter = `hue-rotate(${value * 30}deg) drop-shadow(0 0 ${value}rem #990000) brightness(${value + 1})`;
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