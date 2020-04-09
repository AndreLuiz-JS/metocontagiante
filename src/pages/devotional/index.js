import React, { useEffect, useState } from "react";
import api from '../../services/api';
import normalizeDate from '../../services/normalizeDate';
import { Section, Verses, DevotionalContent } from './styles';

export default function Devotional() {
    const [ devotionalContent, setDevotionalContent ] = useState({
        title: '',
        verses: [],
        content: [],
        verseContent: [],
        date: ''
    })
    async function getDevotional() {
        const devotional = await api.get('/devotional');
        const bibleIndexes = devotional.data.verses.split(';');
        const verseContent = new Array(bibleIndexes.length);
        const verses = new Array(bibleIndexes.length);
        for (let i = 0; i < bibleIndexes.length; i++) {
            const book = bibleIndexes[ i ].split('.');
            const chapter = book[ 1 ].split(':');
            const verseRange = chapter[ 1 ];
            const content = await api.get(`/bible/${book[ 0 ]}/${chapter[ 0 ]}/${verseRange}`);
            verseContent[ i ] = content.data;
            const verseInit = verseRange.split('-')[ 0 ];
            const verseEnd = verseRange.split('-')[ 1 ];
            if (verseInit === verseEnd) { verses[ i ] = `${book[ 0 ]} ${chapter[ 0 ]} : ${verseInit}` }
            else { verses[ i ] = `${book[ 0 ]} ${chapter[ 0 ]} : ${verseRange}` }
        }

        const title = devotional.data.title;
        const content = devotional.data.content.split(/(?:\r\n|\r|\n)/g);
        const date = normalizeDate(devotional.data.available_at);
        setDevotionalContent({ title, verses, content, verseContent, date });
    }

    useEffect(() => {
        getDevotional();
    }, [])
    return (
        <Section>
            <h1>{devotionalContent.title}</h1>
            <h2>Publicado {devotionalContent.date}</h2>
            <Verses><h2>Versículos base:</h2>
                {devotionalContent.verses.map((verse, index) => {
                    return (<div key={index}>
                        <h1>{verse}</h1>
                        {
                            devotionalContent.verseContent[ index ].map((paragraph, paragraphIndex) => (
                                < p key={paragraphIndex} >
                                    {paragraph.map((verse, verseIndex) => (
                                        <>{verse.verseText} &nbsp;</>
                                    ))}
                                </p>
                            ))
                        }
                    </div>)
                })}
            </Verses>
            <DevotionalContent>{devotionalContent.content.map((text, index) => {
                return (
                    <p key={index}>{text}</p>
                )
            })}</DevotionalContent>
        </Section>
    )
}
