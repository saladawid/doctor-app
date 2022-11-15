import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const ButtonNavigate = ({link, title}) => {

    return (
        <Link to={link}>
            <Button variant="dark" className="mb-3">{title}</Button>
        </Link>
    );
};
