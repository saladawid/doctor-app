import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const PatientProfileScreen = () => {
    const {
        resultInfo,
        setResultInfo,
        error,
        setError,
        disabledBtn,
        setDisabledBtn,
        editData,
        setEditData,
        loggedUser,
    } = useContext(Context);
    const [patient, setPatient] = useState({
        name: '',
        surname: '',
        diagnosis: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
    });
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        !loggedUser && navigate('/login');
        getProfileData();
    }, []);

    const getProfileData = async () => {
        setResultInfo(false);
        setError(false);
        setEditData(true);
        setDisabledBtn(true);
        try {
            const res = await fetch(`${API_URL}api/patients/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setPatient(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const saveProfileData = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + loggedUser.token,

            },
            body: JSON.stringify({
                ...patient,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setPatient(data);
            setError(false);
            setResultInfo('The patient profile has been updated');
            setEditData(true);
            setDisabledBtn(true);
        }
    };

    const editProfileData = async (e) => {
        e.preventDefault();
        if (editData) {
            setResultInfo(false);
            setEditData(false);
            setDisabledBtn(false);
        } else {
            getProfileData();
        }
    };

    const openTest = async (e) => {
        switch (e.target.value) {
            case 'glasgow-test':
                navigate(`/patients/${id}/${e.target.value}`);
                break;
            case 'hasbled-test':
                navigate(`/patients/${id}/${e.target.value}`);
                break;
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Patient data</h1>
            <Link to="/patients">
                <Button variant="dark" className="mb-3">Back to database</Button>
            </Link>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>

            <Row>
                <Col md={4} sm={12}>
                   <div className="form-pointer">


                    <Form.Select as="button" className="text-center p-2 my-2 bg-dark text-white" size="md"
                                 onChange={openTest}
                                 varian="dark">
                        <option>Perform a test for the patient</option>
                        <option value="glasgow-test">Glasgow test</option>
                        <option value="hasbled-test">Has Bled test</option>
                    </Form.Select>
                   </div>
                    <Link className="text-decoration-none" to="tests">
                        <div className="bg-dark p-2 text-white text-center">Tests Results</div>
                    </Link>
                </Col>
                <Col md={8} sm={12}>
                    <Form onSubmit={saveProfileData}>
                        <Row>
                            <Col md={6} xs={12}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        readOnly={editData}
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
                                        readOnly={editData}
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
                                readOnly={editData}
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
                                                  readOnly={editData}
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
                                                  readOnly={editData}
                                                  value={patient.dateOfDischarge ?? ''}
                                                  onChange={e => setPatient(patient => ({
                                                      ...patient,
                                                      dateOfDischarge: e.target.value,
                                                  }))}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" variant="dark" className="me-3" disabled={disabledBtn}>Save</Button>
                        <Button type="submit" variant="dark"
                                onClick={editProfileData}>{editData ? 'Edit data' : 'Cancel'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

