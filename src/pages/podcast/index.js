import React, { useEffect, useState } from "react";
import anchorFm from '../../services/anchorfm';
import normalizeDate from '../../services/normalizeDate';
import { Section, Dropdown, DropdownItem, EmbedPodcast, Podcast } from './styles';

export default function Spotify() {
    const [ podcasts, setPodcasts ] = useState([ { link: '', description: '' } ]);
    const [ currentPodcast, setCurrentPodcast ] = useState(podcasts[ 0 ]);

    async function fetchData() {
        const response = await anchorFm.get();
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(response.data, "text/xml");
        const xmlItems = xmlData.getElementsByTagName('item');
        const podcastArray = [];
        for (let i = 0; i < xmlItems.length; i++) {
            const image = xmlItems[ i ].getElementsByTagName('itunes:image')[ 0 ].getAttribute('href');
            console.log(image);
            const title = xmlItems[ i ].children[ 0 ].textContent;
            const description = xmlItems[ i ].children[ 1 ].textContent.replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, '');
            const date = normalizeDate(xmlItems[ i ].children[ 5 ].textContent);
            const link = xmlItems[ i ].children[ 2 ].textContent.replace('episodes', 'embed/episodes');
            podcastArray.push({ title, description, link, image, date })

        };
        setPodcasts(podcastArray);
        setCurrentPodcast(JSON.parse(localStorage.getItem('podcast')) || podcastArray[ 0 ]);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {

    }, [ currentPodcast ])
    return (
        <Section>
            <Dropdown>
                <DropdownItem
                    placeholder='Busque por uma palavra chave...'
                    value={{ value: currentPodcast, label: `${currentPodcast.title} por ${currentPodcast.description}` }}
                    onChange={handleChangePodcast}
                    options={podcasts.map((item) => {
                        return { value: item, label: `${item.title} por ${item.description}` }
                    })}
                />
            </Dropdown>
            <h1>Podcast</h1>
            <p>Gravado por {currentPodcast.description.trim()}</p>
            <p>Publicado: {currentPodcast.date}</p>
            <EmbedPodcast scrolling="no" src={currentPodcast.link} />
            <h1>Últimos Podcasts:</h1>
            {podcasts.slice(0, 4).map((item, key) => {
                return (
                    <Podcast key={key} onClick={() => handleChangePodcast({ value: item })}>
                        <img src={item.image} alt="" />
                        <div>
                            <h2>{item.title}</h2>
                            <p>por {item.description}</p>
                            <p>{item.date}</p>
                        </div>
                    </Podcast>
                )
            })}
        </Section>
    )
    function handleChangePodcast(selectedState) {
        setCurrentPodcast(selectedState.value);
        localStorage.setItem('podcast', JSON.stringify(selectedState.value))
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
