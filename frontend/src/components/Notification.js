import React from 'react';
import {Alert} from 'react-bootstrap';

export const Notification = ({error, info}) => {
    return (
        <div className="text-center">
            {error && <Alert variant="danger">
                {error}
            </Alert>}
            {info && <Alert variant="dark">
                {info}
            </Alert>}
        </div>
    );
};