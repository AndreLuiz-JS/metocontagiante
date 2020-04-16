import React from 'react';
import Spinner from 'react-spinkit';
import { Load } from './styles';

import theme from '../../styles/themes/default';

export default function Loading({ loading, message }) {
    return loading ? (
        <Load>
            <Spinner
                name='cube-grid'
                fadeIn='full'
                color={theme.colors.effect}
            />
            <span className='message'>
                {message}
            </span>
        </Load>
    ) : null
}