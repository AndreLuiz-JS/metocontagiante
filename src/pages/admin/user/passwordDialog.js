import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../';
import Loading from '../../../components/Loading';

import api from '../../../services/api';

import { Dialog } from './styles';


export default function PasswordDialog({ name, email, newPassword, disabled, reference }) {
    const { userInfo } = useContext(UserContext);
    const [ password, setPassword ] = useState('');
    const [ active, setActive ] = useState(false);
    const [ loading, setLoading ] = useState({ status: false, message: '' });

    useEffect(() => {
        document.getElementById('pwd' + reference).focus();
        //eslint-disable-next-line
    }, [ active ])
    return (
        <>
            <button
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault();
                    setActive(true);
                }}>Alterar</button >

            <Loading loading={loading.status} message={loading.message} />
            <Dialog style={active ? {} : { display: 'none' }}>
                <label htmlFor="pwd">Digite sua senha atual</label >
                <input autoFocus={true} type="password" id={"pwd" + reference} value={password} onKeyPress={handleKeyPressed} onChange={handleChangeInputPassword} />
                <div>
                    <button onClick={handleClickOk}>ok</button>
                    <button onClick={handleClickCancel}>cancelar</button>
                </div>
            </Dialog>
        </>

    );
    function handleChangeInputPassword(e) {
        setPassword(e.target.value);
    }
    function handleClickCancel(e) {
        e.preventDefault();
        setPassword('');
        setActive(false);
    }
    function handleKeyPressed(e) {
        if (e.charCode === 13)
            handleClickOk(e);

    }
    async function handleClickOk(e) {
        e.preventDefault();
        if (name && userInfo.name !== name) {
            const token = localStorage.getItem('ACCESS_TOKEN');
            setLoading({ status: true, message: "Alterando nome" });
            try {
                await api.put('user', { name, password }, { headers: { Authorization: `Bearer ${token}` } });
                window.location.reload();
            } catch (err) {
                console.log(err);
                alert('Senha incorreta');
            }
        }
        if (email && userInfo.email !== email) {
            const token = localStorage.getItem('ACCESS_TOKEN');
            setLoading({ status: true, message: "Alterando email" });
            try {
                await api.put('user', { email, password }, { headers: { Authorization: `Bearer ${token}` } });
                window.location.reload();
            } catch (err) {
                console.log(err);
                alert('Senha incorreta');
            }
        }
        if (newPassword) {
            const token = localStorage.getItem('ACCESS_TOKEN');
            setLoading({ status: true, message: "Alterando senha" });
            try {
                await api.put('user', { newPassword, password }, { headers: { Authorization: `Bearer ${token}` } });
                alert('Senha alterada com sucesso');
            } catch (err) {
                console.log(err);
                alert('Senha incorreta');
            }
        }
        setActive(false);
    }
}

