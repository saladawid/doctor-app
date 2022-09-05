import React, {useEffect, useContext, useState} from 'react';
import {Button, Card, Container, Spinner, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Context} from '../../App';
import {API_URL} from '../../utils/url';
import {RemoveModal} from '../RemoveModal';

export const PatientsScreen = () => {
    const {
        userLog,
        setUserLog,
        patients,
        setPatients,
        error,
        setError,
        loading,
        setLoading,
        loggedUser,
        showModal,
        setShowModal,
        id,
        setId,
    } = useContext(Context);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
    };

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            setLoading(true);

            loggedUser && setUserLog(true);

            const res = await fetch(`${API_URL}api/patients`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setPatients(data);
                setLoading(false);
            }

        } catch (e) {
            console.log('ACCESS FOR LOGGED IN USERS');
        }
    };

    const deletePatient = async (id) => {

        const res = await fetch(`${API_URL}api/patients/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + loggedUser.token,
            },
        });
        const data = await res.json()

        setShowModal(false);

        setPatients(patients => patients.filter(patient => patient._id !== data.patient._id));
    };

    if (!userLog)
        return (
            <Container className="d-flex justify-content-center mt-5">
                <div><Card className="d-flex align-items-center">
                    <Card.Title className="m-3">ACCESS FOR LOGGED IN USERS</Card.Title>
                    <Card.Body>
                        <Link to="/login">
                            <Button variant="dark" className="mb-3">Log in</Button>
                        </Link>
                    </Card.Body>
                </Card>
                </div>
            </Container>
        );

    return (
        <Container fluid="md">
            <h1 className="text-center p-2 mt-4 mb-4">Database of patients</h1>
            <Link to="/add-patient">
                <Button variant="dark" className="mb-3 mx-2">Add new patient</Button>
            </Link>

            {loading && <Container className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>}
            <div>
                <Table size="sm" responsive="md">
                    <thead>
                    <tr className="">
                        <th>No</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Patient added by </th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map((patient, index) => (
                        <tr className="align-text-bottom" key={patient._id}>
                            <td>{index + 1}</td>
                            <td>{patient.name}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.user?.email ? patient.user.email : 'Doctor removed' }</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <Link to={`${patient._id}`}>
                                        <Button size="sm" variant="dark" className="btn">View</Button>
                                    </Link>
                                    <Button onClick={() => {
                                        handleShow();
                                        setId(patient._id);
                                    }}
                                            variant="dark"
                                            size="sm">
                                        Delete
                                    </Button>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <RemoveModal showModal={showModal} handleClose={handleClose}
                             handleDelete={() => deletePatient(id)} descriptionBtn={'patient'}/>
            </div>
        </Container>);
};

