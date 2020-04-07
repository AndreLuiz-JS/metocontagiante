import React from "react";
import { Section, Brand, Link } from './styles';

export default function Main() {
    return (
        <Section>
            <Brand src="brand.png" />
            <p>Somos a Igreja Metodista Contagiante</p>
            <Link to="/maps">
                <p>Localizada na Rua Francisco de Souza Beltrão, nº 318<br />
                São Pedro da Aldeia/RJ
                </p>
            </Link>
            <p>Venha nos fazer uma visita! Esperamos por você e sua família!!</p>
        </Section>
    )
}