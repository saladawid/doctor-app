import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const AccessMessage = ({title, path, nameButton}) => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="align-items-center">
                <Card.Title className="m-3">{title}</Card.Title>
                <Card.Body>
                    <Link to={path}>
                        <Button variant="dark" className="mb-3">{nameButton}</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};