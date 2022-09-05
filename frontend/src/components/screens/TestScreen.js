import React from 'react';
import {useParams} from 'react-router-dom';
import {GlasgowTestScreen} from './GlasgowTestScreen';
import {HasBledTestScreen} from './HasBledTestScreen';

export const TestScreen = () => {
    const {id, test} = useParams();

    switch (test) {
        case 'glasgow-test':
            return <GlasgowTestScreen id={id} test={test}/>;
        case 'hasbled-test':
            return <HasBledTestScreen id={id} test={test}/>;
    }
};