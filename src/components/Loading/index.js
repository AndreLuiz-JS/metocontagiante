import React from 'react';
import Spinner from 'react-spinkit';
import { Load } from './styles';

import theme from '../../styles/themes/default';

export default function Loading({ loading, message, ico = 'cube-grid' }) {
    return loading ? (
        <Load>
            <Spinner
                name={ico}
                fadeIn='none'
                color={theme.colors.effect}
            />
            <span className='message'>
                {message}
            </span>
        </Load>
    ) : null
}