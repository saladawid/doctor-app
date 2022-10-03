import React from 'react';
import {Accordion, Container} from 'react-bootstrap';

export const HomeScreen = () => {

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Welcome to the App Doctor</h1>
            <h2 className="text-center p-2 mt-4 mb-4">Simple application for patient management</h2>
            <Accordion>
                <Accordion.Header><p className="h3">Possibilities</p></Accordion.Header>
                <Accordion.Body className="d-flex justify-content-between">
                    <p>For User: registration, login, editing</p>
                    <p>For Patient: adding, editing, removing</p>
                    <p>Performing and adding a test for a patient</p>
                </Accordion.Body>
            </Accordion>
            <Accordion>
                <Accordion.Header><p className="h3">Used technologies:</p></Accordion.Header>
                <Accordion.Body className="d-flex justify-content-between">
                    <p>Node</p>
                    <p>Express</p>
                    <p>MongoDb</p>
                    <p>React</p>
                </Accordion.Body>
            </Accordion>
        </Container>
    );
};