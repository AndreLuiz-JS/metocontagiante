import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import normalizeDate from "../../services/normalizeDate";
import { Section, Verses, DevotionalContent } from "./styles";

export default function Devotional() {
  const [loading, setLoading] = useState({
    status: true,
    message: "Carregando",
  });
  const [devotionalContent, setDevotionalContent] = useState({
    title: "",
    verses: [],
    content: [],
    verseContent: [],
    date: "",
  });
  const [showVerses, setShowVerses] = useState(true);
  async function getDevotional() {
    const devotional = await api.get("/devotional");
    if (!devotional.data.content) {
      setDevotionalContent({ hasDevotional: false });
      setLoading({ status: false });
      return null;
    }
    const title = devotional.data.title;
    const content = devotional.data.content.split(/(?:\r\n|\r|\n)/g);
    const hasDevotional = content ? true : false;
    const date = normalizeDate(devotional.data.available_at);
    const { verses, verseContent } = await getVerses();
    setDevotionalContent({
      title,
      verses,
      content,
      verseContent,
      date,
      hasDevotional,
    });
    async function getVerses() {
      try {
        if (!devotional.data.verses) {
          setShowVerses(false);
          setLoading({ status: false });
          return { verses: [], verseContent: [] };
        }

        const bibleIndexes = devotional.data.verses.split(";");
        const verseContent = new Array(bibleIndexes.length);
        const verses = new Array(bibleIndexes.length);
        for (let i = 0; i < bibleIndexes.length; i++) {
          const book = bibleIndexes[i].split(".");
          const chapter = book[1].split(":");
          const verseRange = chapter[1];
          const content = await api.get(
            `/bible/${book[0]}/${chapter[0]}/${verseRange}`
          );
          console.log(content);
          if (!content.data) {
            setShowVerses(false);
            setLoading({ status: false });
            return { verses: [], verseContent: [] };
          }
          verseContent[i] = content.data;
          const verseInit = verseRange.split("-")[0];
          const verseEnd = verseRange.split("-")[1];
          if (verseInit === verseEnd) {
            verses[i] = `${book[0]} ${chapter[0]} : ${verseInit}`;
          } else {
            verses[i] = `${book[0]} ${chapter[0]} : ${verseRange}`;
          }
        }
        setLoading({ status: false });
        return { verses, verseContent };
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getDevotional();
  }, []);
  if (loading.status)
    return <Loading loading={loading.status} message={loading.message} />;
  if (!devotionalContent.hasDevotional)
    return (
      <Section>
        <h1>
          Sem devocional no momento, tente novamente mais tarde! Obrigado.
        </h1>
      </Section>
    );

  return (
    <Section>
      <h1>{devotionalContent.title}</h1>
      <h2>Publicado {devotionalContent.date}</h2>
      {showVerses && (
        <Verses style={showVerses}>
          <h2>Versículos base:</h2>
          {devotionalContent.verses.map((verse, index) => {
            return (
              <div key={index}>
                <h1>{verse}</h1>
                {devotionalContent.verseContent[index].map(
                  (paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraph.map((verse, verseIndex) => (
                        <span key={verseIndex}> {verse.verseText} &nbsp;</span>
                      ))}
                    </p>
                  )
                )}
              </div>
            );
          })}
        </Verses>
      )}
      <DevotionalContent>
        {devotionalContent.content.map((text, index) => {
          return (
            <p
              key={index}
              style={{ textAlign: text.startsWith("#") ? "center" : "justify" }}
            >
              {text}
            </p>
          );
        })}
      </DevotionalContent>
    </Section>
  );
}
