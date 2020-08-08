import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Calendar from 'react-datetime-picker';
import Loading from '../../../../components/Loading';

import api from '../../../../services/api';

import { Section, Title, Content, Verse, Footer } from './styles';

export default function Devotional(props) {
    const [ available_at, setAvailable_at ] = useState(new Date());
    const [ devotionalState, setDevotionalState ] = useState({ available_at: new Date(), title: '', verses: '', content: '', visible: 0 });
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const { userInfo, userAccess } = useContext(props.UserContext);
    const [ redirect, setRedirect ] = useState({ status: false, page: '/login' });
    const [ bookList, setBookList ] = useState([]);
    const [ chapterList, setChapterList ] = useState([]);
    const [ verseInList, setVerseInList ] = useState([]);
    const [ verseOutList, setVerseOutList ] = useState([]);
    const [ bookMark, setBookMark ] = useState({ book: 'Gênesis', chapter: '1', verseIn: '1', verseOut: '1' });
    const [ versesList, setVersesList ] = useState([]);

    useEffect(() => {
        setDevotionalState({ ...devotionalState, available_at: available_at.toISOString() });
        //eslint-disable-next-line
    }, [ available_at ])

    useEffect(() => {
        async function fetchData() {
            const { oldTestament, newTestament } = (await api.get('bible')).data;
            setBookList([ ...oldTestament, ...newTestament ]);
        }
        fetchData();
    }, [])

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
                    <p>Versículos base: </p>
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
    function handleChangeDevotionalContent(e) {
        setDevotionalState({ ...devotionalState, content: e.target.value });
    }
    function handleChangeVisibility(e) {
        setDevotionalState({ ...devotionalState, visible: Number(e.target.value) });
    }

}