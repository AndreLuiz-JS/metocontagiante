import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import api from '../services/api';


export default function Bible() {
    const [ bookMark, setBookMark ] = useState(JSON.parse(localStorage.getItem("bookMark")) || { testament: 'Antigo Testamento', bookName: "Gênesis", chapter: 1 });
    const [ dropDownBooks, setDropDownBooks ] = useState([]);
    const [ dropDownChapters, setDropDownChapters ] = useState([]);
    const [ textToShow, setTextToShow ] = useState([]);
    const [ dropDownTestament ] = useState([ 'Antigo Testamento', 'Novo Testamento' ]);
    const [ buttonNextDisabled, setButtonNextDisabled ] = useState(false);
    const [ buttonPreviousDisabled, setButtonPreviousDisabled ] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const chapterContent = JSON.parse(localStorage.getItem(`${bookMark.bookName}-${bookMark.chapter}-content`));
            const listOfBooks = await getListOfBooks();
            const listOfChapters = await getListOfChapters();
            if (chapterContent === null) {
                const { bookName, chapter } = bookMark;
                const verseObject = await api.get(`/bible/${bookName}/${chapter}`)
                setTextToShow(verseObject.data.paragraphs);
                localStorage.setItem(`${bookMark.bookName}-${bookMark.chapter}-content`, JSON.stringify(verseObject.data.paragraphs));
            } else {
                setTextToShow(chapterContent);
            }
            setDropDownBooks(listOfBooks);
            setDropDownChapters(listOfChapters);
            setButtonNextDisabled(bookMark.bookName === "Apocalipse" && bookMark.chapter === 21);
            setButtonPreviousDisabled(bookMark.bookName === "Gênesis" && bookMark.chapter === 1);
            localStorage.setItem(bookMark.testament, bookMark.bookName);
            localStorage.setItem(bookMark.bookName, bookMark.chapter);
        }
        fetchData();
        localStorage.setItem("bookMark", JSON.stringify(bookMark));
    }, [ bookMark ]);

    async function getListOfBooks() {
        const listOfBooks = JSON.parse(localStorage.getItem('listOfBooks'));
        if (listOfBooks === null || listOfBooks === undefined) {
            const response = await api.get('/bible');
            const oldTestament = response.data.oldTestament;
            const newTestament = response.data.newTestament;
            localStorage.setItem('listOfBooks', JSON.stringify({ oldTestament, newTestament }));
            if (bookMark.testament === dropDownTestament[ 0 ]) return oldTestament;
            if (bookMark.testament === dropDownTestament[ 1 ]) return newTestament;
        }
        if (bookMark.testament === dropDownTestament[ 0 ]) return listOfBooks.oldTestament;
        if (bookMark.testament === dropDownTestament[ 1 ]) return listOfBooks.newTestament;
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

    function isDropDownItemActive(itenInList, itenInBookMark) {
        if (itenInList === itenInBookMark) return "active"
    }
    function nextChapter() {
        const listOfBooks = dropDownBooks;
        const listOfChapters = dropDownChapters;
        const chapterIndex = listOfChapters.indexOf(bookMark.chapter) + 1;
        const chapter = listOfChapters[ chapterIndex ];
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) + 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookMark.bookName === "Apocalipse" && bookMark.chapter === 21) {
            alert('Não há mais capítulos anteriores.');
            return;
        }
        if (bookMark.bookName === "Malaquias" && bookMark.chapter === 3) {
            setBookMark({ testament: dropDownTestament[ 1 ], bookName: 'Mateus', chapter: 1 })
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
        const listOfBooks = dropDownBooks;
        const listOfChapters = dropDownChapters;
        const chapterIndex = listOfChapters.indexOf(bookMark.chapter) - 1;
        const chapter = listOfChapters[ chapterIndex ];
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) - 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookMark.bookName === "Gênesis" && bookMark.chapter === 1) {
            alert('Não há mais capítulos anteriores.');
            return;
        }
        if (bookMark.bookName === "Mateus" && bookMark.chapter === 1) {
            setBookMark({ testament: dropDownTestament[ 0 ], bookName: 'Malaquias', chapter: 3 })
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
        console.log(`Error: nextChapter function returned a invalid state.`)
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto text-white" >
                        <NavDropdown title={bookMark.testament} variant="dark" data-boundary="viewport"
                            onSelect={(eventKey) => { setBookMark({ testament: eventKey, bookName: localStorage.getItem(eventKey) || 'Mateus', chapter: Number(localStorage.getItem(localStorage.getItem(eventKey) || 'Mateus')) || 1 }); }}>
                            {dropDownTestament.map((testament, index) => (
                                <NavDropdown.Item className={isDropDownItemActive(testament, bookMark.testament)}
                                    key={index}
                                    eventKey={testament}>
                                    {testament}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <NavDropdown title={bookMark.bookName} id="basic-nav-dropdown" variant="dark" data-boundary="viewport"
                            onSelect={(eventKey) => { setBookMark({ ...bookMark, bookName: eventKey, chapter: Number(localStorage.getItem(eventKey)) || 1 }); }}>
                            {dropDownBooks.map((bookName, index) => (
                                <NavDropdown.Item className={isDropDownItemActive(bookName, bookMark.bookName)}
                                    key={index}
                                    eventKey={bookName}>
                                    {bookName}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <NavDropdown title={`Capítulo ${bookMark.chapter}`} variant="dark" data-boundary="viewport"
                            onSelect={(eventKey) => { setBookMark({ ...bookMark, chapter: Number(eventKey) }); }}>
                            {dropDownChapters.map((chapterNumber, index) => (
                                <NavDropdown.Item className={isDropDownItemActive(chapterNumber, bookMark.chapter)}
                                    key={index}
                                    eventKey={chapterNumber}>
                                    {chapterNumber}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar className="justify-content-between">
                <Nav >
                    <Nav.Item className="ml-auto mr-5 mr-5 text-dark"  >
                        <Button variant="secondary" disabled={buttonPreviousDisabled} onClick={previousChapter}>
                            {'<Anterior'}
                        </Button>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item className="mr-auto ml-5 text-dark" >
                        <Button variant="secondary" disabled={buttonNextDisabled} onClick={nextChapter}>
                            {'Próximo>'}
                        </Button>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <Jumbotron className="pt-4 pb-4 mt-0 bg-dark text-light">
                {textToShow.map((paragraph, paragraphIndex) => (
                    < p key={paragraphIndex} >
                        {paragraph.map((verse, verseIndex) => (
                            <span key={verseIndex}>
                                <span className="text-white-50">{verse.verseNumber}&nbsp;</span>
                                {verse.verseText} &nbsp;
                            </span>
                        ))}
                    </p>
                ))}
            </Jumbotron>
        </div >
    )

}