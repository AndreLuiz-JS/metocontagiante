import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Calendar from 'react-datetime-picker';
import Loading from '../../../components/Loading';
import Postbutton from '../../../components/Postbutton';

import { UserContext } from '../';
import api from '../../../services/api';
import normalizeDate from '../../../services/normalizeDate';

import { DropdownDevotional, DropdownItem, Section, Title, Author, Content, Verse, Footer } from './styles';

export default function Devotional() {
    const [ dropdownSelectedIndex, setDropdownSelectedIndex ] = useState(0);
    const [ available_at, setAvailable_at ] = useState(new Date());
    const [ devotionalState, setDevotionalState ] = useState({ available_at: new Date(), title: '', verses: '', content: '', visible: false });
    const [ dropDownDevotionalArray, setDropDownDevotionalArray ] = useState([ { value: '', label: '' } ]);
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const { userAccess, userInfo } = useContext(UserContext);
    const [ redirect, setRedirect ] = useState({ status: false, page: '/login' });
    const [ bookList, setBookList ] = useState([]);
    const [ chapterList, setChapterList ] = useState([]);
    const [ verseInList, setVerseInList ] = useState([]);
    const [ verseOutList, setVerseOutList ] = useState([]);
    const [ bookMark, setBookMark ] = useState({ book: 'Gênesis', chapter: '1', verseIn: '1', verseOut: '1' });
    const [ versesList, setVersesList ] = useState([]);

    async function fetchData() {
        if (!userAccess.includes('post_user')) {
            setRedirect({ status: true, page: '/admin' });
            return
        }
        const { oldTestament, newTestament } = (await api.get('bible')).data;
        setBookList([ ...oldTestament, ...newTestament ]);
        try {
            setLoading({ status: true, message: 'Carregando devocionais disponíveis.' })
            const response = await api.get('devotional/all', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            if (!response) setRedirect({ status: true, page: 'devotional/new' })
            const devotionalArray = response.data.map(element => normalizeToDropdown(element));
            setLoading({ ...loading, status: false })
            setDropDownDevotionalArray(devotionalArray);
            setDevotionalState(devotionalArray[ dropdownSelectedIndex ].value);
            setAvailable_at(new Date(devotionalArray[ dropdownSelectedIndex ].value.available_at));
            if (devotionalArray[ dropdownSelectedIndex ].value.verses) setVersesList(devotionalArray[ dropdownSelectedIndex ].value.verses.split(';'))
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data)
                setRedirect({ status: true, page: '/login' });
            } else {
                setRedirect({ status: true, page: 'devotional/new' });
            }
        }
    }

    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
        setDevotionalState({ ...devotionalState, available_at: available_at.toISOString() })
        //eslint-disable-next-line
    }, [ available_at ])

    useEffect(() => {
        async function fecthList() {
            const { chaptersCount } = (await api.get('bible/@' + bookMark.book)).data
            const chapters = [];
            for (let i = 1; i <= chaptersCount; i++) {
                chapters.push(i);
            }
            setChapterList(chapters);
            const { versesCount } = (await api.get(`bible/${bookMark.book}/@${bookMark.chapter}`)).data;
            const verses = [];
            for (let i = 1; i <= versesCount; i++) {
                verses.push(i);
            }
            setVerseInList(verses);
            setVerseOutList(verses.slice(bookMark.verseIn - 1));
        }
        fecthList();
        //eslint-disable-next-line
    }, [ bookMark ])

    if (redirect.status) return (<Redirect to={redirect.page} />);

    return (

        <Section>
            <Loading loading={loading.status} message={loading.message} ico={loading.ico} />
            <h1>Alteração de devocionais</h1>
            <DropdownDevotional>
                <DropdownItem
                    placeholder="Devocionais"
                    value={{ value: devotionalState, label: `${devotionalState.title} por ${devotionalState.name}` }}
                    onChange={handleChangeDevotional}
                    options={dropDownDevotionalArray}
                />
            </DropdownDevotional>

            <Content>
                <Postbutton onClick={() => setRedirect({ status: true, page: 'devotional/new' })} />
                <Author>
                    <p>criador: {devotionalState.name} ({devotionalState.email})</p>
                    <p>data da criação: {normalizeDate(devotionalState.created_at)}</p>
                </Author>
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
                    <p>Versículos base:</p>
                    <select id="book" onChange={handleChangeBook} value={bookMark.book}>
                        {bookList.map((book, index) =>
                            (<option value={book} key={index}>{book}</option>)
                        )}
                    </select>
                    <select id="chapter" onChange={handleChangeChapter} value={bookMark.chapter}>
                        {chapterList.map((chapter) =>
                            (<option value={chapter} key={chapter}>{chapter}</option>)
                        )}
                    </select>
                    <p>:</p>
                    <select id="verseIn" onChange={handleChangeVerseIn} value={bookMark.verseIn}>
                        {verseInList.map((verseIn) =>
                            (<option value={verseIn} key={verseIn}>{verseIn}</option>)
                        )}
                    </select>
                    <p> - </p>
                    <select id="verseOut" onChange={handleChangeVerseOut} value={bookMark.verseOut}>
                        {verseOutList.map((verseOut) =>
                            (<option value={verseOut} key={verseOut}>{verseOut}</option>)
                        )}
                    </select>
                    <button onClick={handleAddVerse} >+</button>
                </Verse>
                <ul>
                    {versesList.map((item, index) => (
                        <li key={index}>
                            <span>{item}</span>
                            <button onClick={() => handleDeleteVerse(index)}>-</button>
                        </li>
                    ))}
                </ul>
                <p>Conteúdo:</p>
                <textarea
                    value={devotionalState.content}
                    onChange={handleChangeDevotionalContent}
                />
                <Footer>
                    <PublishedOptions />
                    <DeleteButton />
                    <div>
                        <button onClick={handleSubmitDevotional}>Salvar</button>
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
                    value={true}
                    checked={devotionalState.visible}
                    onChange={handleChangeVisibility} />
                <label htmlFor="visible">Publicado </label>

                <input type='radio' id="hidden" name="visibility"
                    value={false}
                    checked={!devotionalState.visible}
                    onChange={handleChangeVisibility} />
                <label htmlFor="hidden">Não Publicado</label>
            </form>
        )
    }

    function handleChangeBook(e) {
        setBookMark({ book: e.target.value, chapter: '1', verseIn: '1', verseOut: '1' })
    }

    async function handleChangeChapter(e) {
        setBookMark({ ...bookMark, chapter: e.target.value, verseIn: '1', verseOut: '1' });
    }

    async function handleChangeVerseIn(e) {
        const verseOut = e.target.value > bookMark.verseOut ? e.target.value : bookMark.verseOut;
        setBookMark({ ...bookMark, verseIn: e.target.value, verseOut });
    }

    function handleChangeVerseOut(e) {
        setBookMark({ ...bookMark, verseOut: e.target.value });
    }

    function handleAddVerse() {
        const { book, chapter, verseIn, verseOut } = bookMark;
        const newVerse = `${book}.${chapter}:${verseIn}-${verseOut}`;
        const newVersesList = [ ...versesList, newVerse ];
        setVersesList(newVersesList);
        setDevotionalState({ ...devotionalState, verses: newVersesList.join(';') })
    }

    function handleDeleteVerse(indexToDelete) {
        const newVersesList = versesList.filter((item, index) => index !== indexToDelete);
        setVersesList(newVersesList);
        setDevotionalState({ ...devotionalState, verses: newVersesList.join(';') });
    }

    function DeleteButton() {
        if (!userAccess.includes('master_user')) return (null);
        return (
            <div>
                <button style={{ color: 'white', backgroundColor: 'red' }} onClick={deleteDevotional}>APAGAR</button>
            </div>
        )

        async function deleteDevotional() {
            if (window.confirm('Deseja realmente apagar este devocional?'))
                try {
                    setLoading({ status: true, message: 'Apagando devocional...' });
                    await api.delete('/devotional',
                        {
                            headers:
                            {
                                Authorization: `Bearer ${userInfo.token}`,
                                id: devotionalState.id
                            }
                        });
                    const newDropdownItens =
                        dropDownDevotionalArray.filter((item, index) => {
                            if (index === dropdownSelectedIndex)
                                return false;
                            return true;
                        });
                    if (newDropdownItens.length === 0) {
                        setRedirect({ status: true, page: 'devotional/new' });
                        return
                    }
                    setDropDownDevotionalArray(newDropdownItens);
                    setLoading({ status: true, message: 'Apagado!', ico: 'pulse' });
                    if (newDropdownItens[ dropdownSelectedIndex ])
                        handleChangeDevotional(newDropdownItens[ dropdownSelectedIndex ])
                    else
                        handleChangeDevotional(newDropdownItens[ dropdownSelectedIndex - 1 ])
                    setTimeout(function () { setLoading({ ...loading, status: false }) }, 2000);

                } catch (err) {
                    setLoading({ ...loading, status: false });
                    alert('Não foi possível apagar o devocional. Tente novamente')
                    console.log(err.response.data);
                }
        }
    }
    async function handleSubmitDevotional() {
        try {
            setLoading({ status: true, message: 'Alterando dados do devocional...' });
            await api.put('/devotional', devotionalState, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            setDropDownDevotionalArray(
                dropDownDevotionalArray.map((item, index) => {
                    if (index === dropdownSelectedIndex)
                        return normalizeToDropdown(devotionalState);
                    return item;
                }));
            setLoading({ status: true, message: 'Alterado!', ico: 'pulse' });
            setTimeout(function () { setLoading({ ...loading, status: false }) }, 2000)

        } catch (err) {
            setLoading({ ...loading, status: false });
            alert('Não foi possível alterar o devocional. Tente novamente')
            console.log(err.response.data);
        }
    }

    async function handleChangeDevotional(selectedState) {
        setDropdownSelectedIndex(dropDownDevotionalArray.findIndex(item => item.value === selectedState.value));
        setDevotionalState(selectedState.value);
        setAvailable_at(new Date(selectedState.value.available_at))
        if (selectedState.value.verses) {
            setVersesList(selectedState.value.verses.split(';'));
        } else {
            setVersesList([]);
        }
    }
    function normalizeToDropdown(value) {
        const data = normalizeDate(value.available_at);
        return { value, label: `${value.title} (${data}) por ${value.name}:${value.email}` };

    }
    function handleChangeTitle(e) {
        setDevotionalState({ ...devotionalState, title: e.target.value });
    }
    function handleChangeDevotionalContent(e) {
        setDevotionalState({ ...devotionalState, content: e.target.value });
    }
    function handleChangeVisibility(e) {
        setDevotionalState({ ...devotionalState, visible: (e.target.value === 'true') });
    }

}