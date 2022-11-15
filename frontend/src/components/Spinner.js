import React from 'react';
import {Container, Spinner} from 'react-bootstrap';

export const SpinnerModal = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
};