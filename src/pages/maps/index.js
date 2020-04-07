import React, { useEffect, useState } from 'react';
import { Container, StyledLink, StyledMap } from './styles';

export default function Maps() {
    const [ position, setPosition ] = useState({ lat: null, long: null });
    const [ routeLink, setRouteLink ] = useState('https://maps.google.com/maps?ll=-22.832806,-42.143218&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&daddr=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218');

    useEffect(() => {
        if (position.lat !== undefined
            && position.lat !== null
            && position.long !== undefined
            && position.long !== null) {
            if (navigator.platform === 'iPhone') {
                setRouteLink(`http://maps.apple.com/?saddr=${position.lat},${position.long}&daddr=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218`);
            } else {
                setRouteLink(`https://www.google.com/maps/dir/?api=1&origin=${position.lat},${position.long}&destination=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218&travelmode=driving`);
            }
        }
        if (position.lat === null || position.long === null) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = pos.coords.latitude;
                const long = pos.coords.longitude;
                setPosition({ lat, long });
            }, () => { }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 60000 });
        }
    }, [ position ])


    return (
        <Container>
            <StyledLink href={routeLink} target="_blank">Clique aqui e acesse a rota<br />para a Igreja Metotista Contagiante</StyledLink>
            <StyledMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.180632423063!2d-42.14540668459345!3d-22.832805685049472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x970e10da4d7d13%3A0xfe9d6eb76ae3e508!2sMetodista%20Contagiante!5e0!3m2!1spt-BR!2sbr!4v1586128008887!5m2!1spt-BR!2sbr" />
        </Container>
    )
}
