import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';
import fileDownload from 'js-file-download';

export const PatientScreen = () => {
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
    const [readOnly, setReadOnly] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        !loggedUser && navigate('/login');
        (() => (getPatient()))();
    }, []);

    const getPatient = async () => {
        try {
            const {data} = await axios(`${API_URL}api/patients/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setPatient(data);
        } catch (e) {
            setError(handleError(e));
        }
    };

    const updatePatient = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`${API_URL}api/patients/${id}`, {...patient}, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setPatient(data);
            setError('');
            setInfo(data.message);
            setReadOnly(true);
            await getPatient();
        } catch (e) {
            setError(handleError(e));
        }
    };

    const editPatient = async (e) => {
        e.preventDefault();
        setReadOnly(readOnly ? false : true);
        setError('');
        setInfo('');
        await getPatient();
    };

    const createPDF = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${API_URL}api/patients/${id}/summary`, {
                responseType: 'blob',
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            fileDownload(res.data, `${patient.name}_${patient.surname}_summary.pdf`);
        } catch (e) {
            setError(handleError(e));
        }

    };

    const openTest = async (e) => {
        switch (e.target.value) {
            case 'glasgow-test':
                navigate(`/tests/${e.target.value}/${id}`);
                break;
            case 'hasbled-test':
                navigate(`/tests/${e.target.value}/${id}`);
                break;
            case 'tests-results':
                navigate(`/tests/${id}`);
                break;
        }
    };

    return (
        <Container>
            <HeaderText header={`Patient ${patient.name} ${patient.surname}`}/>
            <ButtonNavigate link={"/patients"} title={"back to database"}/>
            <Notification error={error} info={info}/>

            <Row>
                <Form onSubmit={updatePatient}>
                    <Col md={4} sm={12}>
                        <Form.Select as="button" className="text-center p-2 my-2 bg-dark text-white" size="md"
                                     onChange={openTest}
                                     varian="dark">
                            <option>Perform a test for the patient</option>
                            <option value="glasgow-test">Glasgow test</option>
                            <option value="hasbled-test">Has Bled test</option>
                            <option value="tests-results">Test Results</option>
                        </Form.Select>
                    </Col>
                    <Row>
                        <Col md={6} xs={12}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    readOnly={readOnly}
                                    value={patient.name ?? ''}
                                    onChange={e => setPatient(patient => ({
                                        ...patient,
                                        name: e.target.value,
                                    }))}/>
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12}>
                            <Form.Group className="mb-3" controlId="surname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    readOnly={readOnly}
                                    value={patient.surname ?? ''}
                                    onChange={e => setPatient(patient => ({
                                        ...patient,
                                        surname: e.target.value,
                                    }))}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="diagnosis">
                        <Form.Label>Diagnosis</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            readOnly={readOnly}
                            value={patient.diagnosis ?? ''}
                            onChange={e => setPatient(patient => ({
                                ...patient,
                                diagnosis: e.target.value,
                            }))}/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="dateOfAdmission">
                                <Form.Label>Date of admission</Form.Label>
                                <Form.Control type="date"
                                              readOnly={readOnly}
                                              value={patient.dateOfAdmission ?? ''}
                                              onChange={e => setPatient(patient => ({
                                                  ...patient,
                                                  dateOfAdmission: e.target.value,
                                              }))}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="dateOfDischarge">
                                <Form.Label>Date of discharge</Form.Label>
                                <Form.Control type="date"
                                              readOnly={readOnly}
                                              value={patient.dateOfDischarge ?? ''}
                                              onChange={e => setPatient(patient => ({
                                                  ...patient,
                                                  dateOfDischarge: e.target.value,
                                              }))}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="dark" className="me-3" disabled={readOnly}>Save</Button>
                    <Button type="submit" variant="dark" className="me-3"
                            onClick={editPatient}>{readOnly ? 'Edit data' : 'Cancel'}</Button>
                    <Button type="submit" variant="primary" onClick={(e) => createPDF(e)}>Create hospital
                        discharge</Button>
                </Form>


            </Row>
        </Container>
    );
};

