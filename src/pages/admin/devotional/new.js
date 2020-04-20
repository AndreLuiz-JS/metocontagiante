import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Calendar from 'react-datetime-picker';
import Loading from '../../../components/Loading';

import { UserContext } from '../';
import api from '../../../services/api';

import { Section, Title, Content, Verse, Footer } from './styles';

export default function Devotional() {
    const [ available_at, setAvailable_at ] = useState(new Date());
    const [ devotionalState, setDevotionalState ] = useState({ available_at: new Date(), title: '', verses: '', content: '', visible: 0 });
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const { userInfo, userAccess } = useContext(UserContext);
    const [ redirect, setRedirect ] = useState({ status: false, page: '/login' });

    useEffect(() => {
        setDevotionalState({ ...devotionalState, available_at: available_at.toISOString() });
        //eslint-disable-next-line
    }, [ available_at ])

    if (redirect.status) return (<Redirect to={redirect.page} />);

    return (

        <Section>
            <Loading loading={loading.status} message={loading.message} ico={loading.ico} />
            <h1>Novo devocional</h1>
            <Content>
                <Title>
                    <p>Título:</p>
                    <input type="text"
                        value={devotionalState.title}
                        onChange={handleChangeTitle} />
                </Title>
                <header>
                    <p>disponível a partir de</p>
                    <Calendar
                        value={available_at}
                        onChange={available_at => setAvailable_at(available_at)}
                        minDetail="year"
                        disableClock={true}
                        clearIcon={null}
                        calendarClassName="calendar"
                        className="dateTimePicker"
                    />
                </header>
                <Verse>
                    <p>Versículos base: (Separados por ";")
                        <span>formato: "Livro.Capítulo:Versículo-Versículo"</span>
                    </p>
                    <input
                        type="text"
                        value={devotionalState.verses}
                        onChange={handleChangeVerses}
                    />
                </Verse>
                <p>Conteúdo:</p>
                <textarea
                    value={devotionalState.content}
                    onChange={handleChangeDevotionalContent}
                />
                <Footer>
                    <PublishedOptions />
                    <div>
                        <button onClick={handleSubmitDevotional}>Postar</button>
                    </div>
                </Footer>
            </Content>

        </Section>

    )
    function PublishedOptions() {
        if (!userAccess.includes('revisor_user')) return (<div></div>);
        return (
            <form>
                <input type='radio' id="visible" name="visibility"
                    value={1}
                    checked={(devotionalState.visible === 1) ? true : false}
                    onChange={handleChangeVisibility} />
                <label htmlFor="visible">Publicado </label>

                <input type='radio' id="hidden" name="visibility"
                    value={0}
                    checked={(devotionalState.visible === 0) ? true : false}
                    onChange={handleChangeVisibility} />
                <label htmlFor="hidden">Não Publicado</label>
            </form>
        )
    }
    async function handleSubmitDevotional() {
        try {
            setLoading({ status: true, message: 'Postando novo devocional...' });
            await api.post('/devotional', devotionalState, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            setLoading({ status: true, message: 'Devocional postado com sucesso', ico: 'pulse' });
            setTimeout(function () {
                setLoading({ ...loading, status: false });
                setRedirect({ status: true, page: '/admin/devotional' })
            }, 2000)

        } catch (err) {
            setLoading({ ...loading, status: false });
            alert('Não foi possível postar o devocional. Tente novamente')
            console.log(err.response.data);
        }
    }

    function handleChangeTitle(e) {
        setDevotionalState({ ...devotionalState, title: e.target.value });
    }
    function handleChangeVerses(e) {
        setDevotionalState({ ...devotionalState, verses: e.target.value });
    }
    function handleChangeDevotionalContent(e) {
        setDevotionalState({ ...devotionalState, content: e.target.value });
    }
    function handleChangeVisibility(e) {
        setDevotionalState({ ...devotionalState, visible: Number(e.target.value) });
    }

}