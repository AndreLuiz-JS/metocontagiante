import React from 'react';
import Spinner from 'react-spinkit';
import { Load } from './styles';

import dark from '../../styles/themes/dark';

export default function Loading({ loading, message }) {
    return loading ? (
        <Load>
            <Spinner
                name='cube-grid'
                fadeIn='0.3s'
                color={dark.colors.effect}
            />
            <span className='message'>
                {message}
            </span>
        </Load>
    ) : null
}