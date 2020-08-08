import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

import { Section, Content } from './styles';

export default function Carousel(props) {
    const { userAccess, userInfo } = useContext(props.UserContext);
    const [ imageList, setImageList ] = useState([]);
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const [ redirect, setRedirect ] = useState({ status: false, page: '/login' });

    useEffect(() => {
        if (!userAccess.includes('post_user')) {
            setRedirect({ status: true, page: '/admin' });
            return
        }
        async function fetchData() {
            try {
                const { data } = await api.get('/carousel');
                setImageList(data);
                setLoading({ status: false });
            } catch (err) {
                console.log(err);
                setLoading({ status: false });
            }
        }
        fetchData();
    }, [ userAccess ])

    async function handleDeleteImg(id, index) {
        try {
            setLoading({ status: true, message: 'Removendo imagem' })
            const response = await api.delete('/carousel/' + id, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            if (response.status === 200) {
                const newArray = imageList;
                newArray.splice(index, 1);
                setImageList(newArray);
                setLoading({ status: true, message: 'Imagem removida!', ico: 'pulse' });
                setTimeout(() => setLoading({ status: false }), 500);
            }
        } catch (err) {
            alert('Erro ao remover imagem, tente novamente.');
            setLoading({ status: false });
            console.log(err.response);
        }
    }

    async function handleUploadImg(e) {
        e.preventDefault();
        setLoading({ status: true, message: 'Carregando imagens.' })
        const files = e.target.files;
        const target = e.target;
        for (let file of files) {
            if (file.type === 'image/jpeg'
                || file.type === 'image/jpg'
                || file.type === 'image/png') {
                const formData = new FormData();
                formData.append("file", file);
                const response = await api.post('/carousel', formData, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    const { id } = response.data;
                    const base64 = reader.result;
                    const newArray = imageList;
                    newArray.push({ id, base64 });
                    setImageList(newArray);
                }
            } else {
                alert(`O arquivo ${file.name} não é uma imagem válida e foi ignorado, somente imagens JPG/PNG são aceitas.`);
            }
        }
        target.value = null;
        setLoading({ status: true, message: 'Imagens carregadas', ico: 'pulse' });
        setTimeout(() => setLoading({ status: false }), 1000);
    }

    if (redirect.status) return (<Redirect to={redirect.page} />);

    return (
        <Section>
            <Loading loading={loading.status} message={loading.message} ico={loading.ico} />
            <h1>Carrossel de anúncios</h1>
            <Content>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImg}
                    id="file"
                    name="file"
                    multiple
                />
                <ul>
                    {imageList.map((item, index) => {
                        return (
                            <li key={index}>
                                <img src={item.base64} alt="" />
                                <button onClick={() => handleDeleteImg(item.id, index)}>remover</button>
                            </li>
                        )
                    })}
                </ul>
            </Content>
        </Section>
    )
}