import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {AccessMessage} from '../components/AccessMessage';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';

export const NewPatientScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [patient, setPatient] = useState({
        name: '',
        surname: '',
        diagnosis: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        !loggedUser && navigate('/login');
    }, []);

    const savePatient = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}api/patients`, {...patient}, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setInfo(`${data.name} ${data.surname} has been added to patients database.`);
            setTimeout(() => {
                navigate("/patients");
            }, 900);
        } catch (e) {
            setError(handleError(e));
        }
    };

    if (info) return <AccessMessage title={info} path={'/patients'} nameButton={'Back to database'}/>;


    return (
        <Container>
            <HeaderText header={'Add new patient'}/>
            <ButtonNavigate link={"/patients"} title={"Back to database"}/>
            <Notification error={error}/>
            <Form onSubmit={savePatient}>
                <Row>
                    <Col md={6} xm={12}>
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

