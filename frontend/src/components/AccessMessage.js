import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const AccessMessage = ({title}) => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="align-items-center">
                <Card.Title className="m-3">{title}</Card.Title>
                <Card.Body>
                    <Link to="/login">
                        <Button variant="dark" className="mb-3">Log in</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};