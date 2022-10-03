import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const PatientAddScreen = () => {
    const {resultInfo, setResultInfo, error, setError, loggedUser} = useContext(Context);
    const [patient, setPatient] = useState({
        name: '',
        surname: '',
        diagnosis: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
    });
    const navigate = useNavigate();


    useEffect(() => {
        setError(false);
        !loggedUser && navigate('/login');
    }, []);

    const savePatient = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/patients`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', Authorization: 'Bearer ' + loggedUser.token,
            }, body: JSON.stringify({
                ...patient,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`${data.name} ${data.surname} has been added to patients database.`);
            setTimeout(() => {
                navigate("/patients");
                setResultInfo(null);
            }, 900);
        }
    };

    if (resultInfo) return (
        <div className="d-flex align-items-center justify-content-center m-5">
            <Card className="d-flex align-items-center justify-content-center">
                <Card.Title className="m-3">{resultInfo}</Card.Title>
                <Card.Body>
                    <Link to="/patients">
                        <Button variant="dark" className="mb-3">Database of Patients</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Add new patient</h1>
            <Link to="/patients">
                <Button variant="dark" className="mb-3">Back to database</Button>
            </Link>
            <div className="text-center">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
            <Form onSubmit={savePatient}>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={patient.name}
                                onChange={e => setPatient(patient => ({
                                    ...patient, name: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                value={patient.surname}
                                onChange={e => setPatient(patient => ({
                                    ...patient, surname: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="diagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={patient.diagnosis}
                        onChange={e => setPatient(patient => ({
                            ...patient, diagnosis: e.target.value,
                        }))}/>
                </Form.Group>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="dateOfAdmission">
                            <Form.Label>Date of admission</Form.Label>
                            <Form.Control type="date"
                                          value={patient.dateOfAdmission}
                                          onChange={e => setPatient(patient => ({
                                              ...patient, dateOfAdmission: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="dateOfDischarge">
                            <Form.Label>Date of discharge</Form.Label>
                            <Form.Control type="date"
                                          value={patient.dateOfDischarge}
                                          onChange={e => setPatient(patient => ({
                                              ...patient, dateOfDischarge: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="dark" className="mb-3">Save patient</Button>
            </Form>
        </Container>
    );
};

