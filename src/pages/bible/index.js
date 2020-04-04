import React, { useLayoutEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { ButtonGroup, Dropdown, DropdownItem, Button, Section } from './styles';

export default function Bible() {
    const listOfTestaments = [ 'Antigo Testamento', 'Novo Testamento' ];
    const [ dropDownTestament, setDropDownTestament ] = useState([ { value: '', label: '' } ]);
    const [ dropDownBooks, setDropDownBooks ] = useState([ { value: '', label: '' } ]);
    const [ dropDownChapters, setDropDownChapters ] = useState([ { value: '', label: '' } ]);
    const [ buttonNextDisabled, setButtonNextDisabled ] = useState(false);
    const [ buttonPreviousDisabled, setButtonPreviousDisabled ] = useState(false);
    const [ testamentState, setTestamentState ] = useState({ selectedOption: null });
    const [ bookState, setBookState ] = useState({ selectedOption: null });
    const [ chapterState, setChapterState ] = useState({ selectedOption: null });
    const [ bookMark, setBookMark ] = useState(JSON.parse(localStorage.getItem("bookMark")) || { testament: '', bookName: '', chapter: 0 });
    const [ textToShow, setTextToShow ] = useState([]);

    useLayoutEffect(() => {
        async function fetchData() {
            const listOfBooks = await getListOfBooks();
            const listOfChapters = await getListOfChapters();
            const chapterContent = await getChapterContent();
            setTextToShow(chapterContent);
            setDropDownTestament(normalizeToDropDown(listOfTestaments));
            setDropDownBooks(normalizeToDropDown(listOfBooks));
            setDropDownChapters(normalizeToDropDown(listOfChapters));
            setTestamentState({ value: bookMark.testament, label: bookMark.testament });
            setBookState({ value: bookMark.bookName, label: bookMark.bookName });
            setChapterState({ value: bookMark.chapter, label: bookMark.chapter });
            setButtonNextDisabled(bookMark.bookName === "Apocalipse" && bookMark.chapter === 22);
            setButtonPreviousDisabled(bookMark.bookName === "Gênesis" && bookMark.chapter === 1);
            localStorage.setItem("bookMark", JSON.stringify(bookMark));
            localStorage.setItem(bookMark.testament, bookMark.bookName);
            localStorage.setItem(bookMark.bookName, bookMark.chapter);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        (bookMark.testament === "") ? setInitialState() : fetchData();

    }, [ bookMark ]);

    async function setInitialState() {
        const testament = listOfTestaments[ 0 ];
        const response = await api.get('/bible');
        const bookName = response.data.oldTestament[ 0 ];
        setBookMark({ testament, bookName, chapter: 1 });
        localStorage.setItem("bookMark", JSON.stringify({ testament, bookName, chapter: 1 }));
    }

    async function getListOfBooks() {
        const listOfBooks = JSON.parse(localStorage.getItem('listOfBooks'));
        if (listOfBooks === null || listOfBooks === undefined) {
            const response = await api.get('/bible');
            const oldTestament = response.data.oldTestament;
            const newTestament = response.data.newTestament;
            localStorage.setItem('listOfBooks', JSON.stringify({ oldTestament, newTestament }));
            if (bookMark.testament === listOfTestaments[ 0 ]) return oldTestament;
            if (bookMark.testament === listOfTestaments[ 1 ]) return newTestament;
        }
        if (bookMark.testament === listOfTestaments[ 0 ]) return listOfBooks.oldTestament;
        if (bookMark.testament === listOfTestaments[ 1 ]) return listOfBooks.newTestament;
    }

    async function getListOfChapters(bookName = bookMark.bookName) {
        const listOfChapters = JSON.parse(localStorage.getItem(`${bookName}-listOfChapters`));
        if (listOfChapters !== null && listOfChapters !== undefined && listOfChapters.lenght > 0) return listOfChapters;
        else {
            const listOfChapters = [];
            const response = await api.get(`/bible/@${bookName}`);
            const chaptersCount = response.data.chaptersCount;
            for (let i = 0; i < chaptersCount; i++) {
                listOfChapters.push(i + 1)
            }
            localStorage.setItem(`${bookName}-listOfChapters`, JSON.stringify(listOfChapters));
            return listOfChapters;
        }
    }

    async function getChapterContent() {
        const chapterContent = JSON.parse(localStorage.getItem(`${bookMark.bookName}-${bookMark.chapter}-content`));
        if (chapterContent === null || chapterContent === undefined) {
            const { bookName, chapter } = bookMark;
            const response = await api.get(`/bible/${bookName}/${chapter}`);
            const chapterContent = response.data.paragraphs;
            localStorage.setItem(`${bookMark.bookName}-${bookMark.chapter}-content`, JSON.stringify(chapterContent));
            return chapterContent;
        }
        return chapterContent;

    }

    function normalizeToDropDown(array) {
        const dropDownItems = array.map(item => ({ value: item, label: item }))
        return dropDownItems;
    }

    function handleChangeTestament(selectedState) {
        const testament = selectedState.value;
        const bookName = localStorage.getItem(testament) || 'Mateus';
        const chapter = Number(localStorage.getItem(bookName) || 1);
        setBookMark({ testament, bookName, chapter });
    }
    function handleChangeBook(selectedState) {
        const bookName = selectedState.value;
        const chapter = Number(localStorage.getItem(bookName) || 1);
        setBookState(selectedState);
        setBookMark({ ...bookMark, bookName, chapter });
    }
    function handleChangeChapter(selectedState) {
        const chapter = selectedState.value;
        setChapterState(selectedState);
        setBookMark({ ...bookMark, chapter });
    }

    async function nextChapter() {
        const listOfBooks = await getListOfBooks();
        const listOfChapters = await getListOfChapters();
        const chapterIndex = listOfChapters.indexOf(bookMark.chapter) + 1;
        const chapter = listOfChapters[ chapterIndex ];
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) + 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookMark.bookName === "Apocalipse" && bookMark.chapter === 22) {
            console.log('Não há mais próximos capítulos');
            return;
        }
        if (bookMark.bookName === "Malaquias" && bookMark.chapter === 3) {
            setBookMark({ testament: listOfTestaments[ 1 ], bookName: 'Mateus', chapter: 1 })
            return;
        }
        if (chapter !== undefined) {
            setBookMark({ ...bookMark, chapter });
            return;

        }
        if (bookName !== undefined) {
            setBookMark({ ...bookMark, bookName, chapter: 1 })
            return;
        }
        console.log(`Error: nextChapter function returned a invalid state.`)

    }
    async function previousChapter() {
        const listOfBooks = await getListOfBooks();
        const listOfChapters = await getListOfChapters();
        const chapterIndex = listOfChapters.indexOf(bookMark.chapter) - 1;
        const chapter = listOfChapters[ chapterIndex ];
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) - 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookMark.bookName === "Gênesis" && bookMark.chapter === 1) {
            alert('Não há mais capítulos anteriores.');
            return;
        }
        if (bookMark.bookName === "Mateus" && bookMark.chapter === 1) {
            setBookMark({ testament: listOfTestaments[ 0 ], bookName: 'Malaquias', chapter: 3 })
            return;
        }
        if (chapter !== undefined) {
            setBookMark({ ...bookMark, chapter });
            return;

        }
        if (bookName !== undefined) {
            const chapterList = await getListOfChapters(bookName);
            const chapter = chapterList[ chapterList.length - 1 ]
            setBookMark({ ...bookMark, bookName, chapter })
            return;
        }
        console.log(`Error: previousChapter function returned a invalid state.`)
    }
    return (
        <div>
            <Dropdown>
                <DropdownItem
                    placeholder="Testamento"
                    value={testamentState}
                    onChange={handleChangeTestament}
                    options={dropDownTestament}
                />
                <DropdownItem
                    placeholder="Livro"
                    value={bookState}
                    onChange={handleChangeBook}
                    options={dropDownBooks}
                />
                <DropdownItem
                    placeholder="Capítulo"
                    value={chapterState}
                    onChange={handleChangeChapter}
                    options={dropDownChapters}
                />
            </Dropdown>
            <Section >
                {textToShow.map((paragraph, paragraphIndex) => (
                    < p key={paragraphIndex} >
                        {paragraph.map((verse, verseIndex) => (
                            <span key={verseIndex}>
                                <span>{verse.verseNumber}&nbsp;</span>
                                {verse.verseText} &nbsp;
                            </span>
                        ))}
                    </p>
                ))}
            </Section>
            <ButtonGroup >
                <Button disabled={buttonPreviousDisabled} onClick={previousChapter}>
                    <FiChevronLeft size={20} /><span>Anterior</span>
                </Button>
                <Button disabled={buttonNextDisabled} onClick={nextChapter}>
                    <span>Próximo</span><FiChevronRight size={20} />
                </Button>
            </ButtonGroup>
        </div >
    )

}