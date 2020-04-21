import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../';

import api from '../../../services/api';

import Loading from '../../../components/Loading';

import { Section, Content, Radio, DropdownUsers, DropdownItem, Dialog } from './styles';

export default function ManageUsers() {
    const { userInfo, userAccess } = useContext(UserContext);
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const [ usersTypes, setUsersTypes ] = useState([]);
    const [ dropDownUsersArray, setDropdownUsersArray ] = useState([ { value: {}, label: '' } ]);
    const [ selectedUser, setSelectedUser ] = useState({});
    const [ dialogActive, setDialogActive ] = useState(false);
    const [ password, setPassword ] = useState('');


    async function fetchData() {
        try {
            setLoading({ status: true, message: 'Carregando lista de usuários...' })
            const response = await api.get('/user', { headers: { Authorization: `Bearer ${userInfo.token}` } });
            const usersArray = response.data.users.map(user => normalizeToDropdown(user));
            setUsersTypes(response.data.usersTypes)
            setDropdownUsersArray(usersArray);
            setSelectedUser(usersArray[ 0 ].value);
            setLoading({ status: false, message: '' });

        } catch (err) {
            setLoading({ status: false, message: '' });
            if (err.response) console.log(err.response.data)
            else console.log(err);
        }
    }


    fetchData();

    useEffect(() => {
        document.getElementById('pwd').focus();
    }, [ dialogActive ]);

    if (!userAccess.includes('administrator_user')) return (<Redirect to="/admin" />)

    return (
        <Section>
            <Loading loading={loading.status} message={loading.message} ico={loading.ico} />
            <h1>Gerenciamento de Usuários</h1>
            <DropdownUsers>
                <DropdownItem
                    placeholder="Usuários"
                    onChange={handleChangeSelectedUser}
                    options={dropDownUsersArray}
                />
            </DropdownUsers>
            <Content>
                <p>Nome:</p>
                <span>{selectedUser.name} </span>
            </Content>
            <Content>
                <p>Email:</p>
                <span>{selectedUser.email}</span>
            </Content>
            <Radio>
                <p>Tipo de acesso:</p>

                {usersTypes.map((element, index) => {
                    return (
                        <div key={index}>
                            <input type="radio"
                                name="users_access"
                                id={element}
                                value={element}
                                checked={(element === selectedUser.user_type) ? true : false}
                                onChange={handleChangeUserType}

                            />
                            <label htmlFor={element}> {element}</label>
                        </div>
                    )
                })}
            </Radio>
            <button onClick={() => {
                setDialogActive(true);
            }}>Alterar acesso</button>
            <Dialog style={dialogActive ? {} : { display: 'none' }}>
                <label htmlFor="pwd">Digite sua senha atual</label >
                <input autoFocus={true} type="password" id="pwd" value={password} onChange={handlePasswordChange} onKeyPress={handleKeyPressed} />
                <div>
                    <button onClick={handleClickOk}>ok</button>
                    <button onClick={() => {
                        setPassword('');
                        setDialogActive(false);
                    }}>cancelar</button>
                </div>
            </Dialog>
        </Section>
    );
    function handleKeyPressed(e) {
        if (e.charCode === 13)
            handleClickOk();
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    async function handleClickOk() {
        try {
            const email = userInfo.email;
            const emailToChangeAccess = selectedUser.email;
            const user_type = selectedUser.user_type;
            const response = await api.patch('/user',
                {
                    email,
                    emailToChangeAccess,
                    user_type,
                    password
                }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            if (response) alert('Acesso do usuário alterado com sucesso.');
            setDialogActive(false);
            setPassword('');
        } catch (err) {
            if (err.response) console.log(err.response.data);
            alert('Senha incorreta.');
        }
    }
    function handleChangeSelectedUser(selectedState) {
        setSelectedUser(selectedState.value);
    }

    function handleChangeUserType(e) {
        const user_type = e.target.value;
        setSelectedUser({ ...selectedUser, user_type });
    }

    function normalizeToDropdown(value) {
        return { value, label: `${value.name}:${value.email} [ ${value.user_type} ]` };
    }
}