import React, {forwardRef, useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Container, Table} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import {RemoveModal} from '../components/RemoveModal';
import {AccessMessage} from '../components/AccessMessage';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {SpinnerModal} from '../components/Spinner';
import {Notification} from '../components/Notification';
import {handleError} from '../utils/handleErrors';
import {SearchBar} from '../components/SearchBar';
import {TableHead} from '../components/TableHead';

export const PatientsScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [query, setQuery] = useState('');
    const [patients, setPatients] = useState([]);
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (() => (getPatients()))();
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getPatients = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`${API_URL}api/patients`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setPatients(data);
        } catch (e) {
            setError(handleError(e));
        } finally {
            setLoading(false);
        }
    };

    const deletePatient = async (id) => {
        try {
            const {data} = await axios.delete(`${API_URL}api/patients/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setPatients(patients => patients.filter(patient => patient._id !== data.patient._id));
        } catch (e) {
            setError(handleError(e));
        } finally {
            setShowModal(false);
        }
    };

    if (!loggedUser) return <AccessMessage title={'ACCESS FOR LOGGED IN USERS'} path={'/login'} nameButton={'Log in'}/>;
    return (
        <Container fluid="md">
            <HeaderText header={'patient database'}/>
            {!error && <ButtonNavigate link={"/add-patient"} title={"add patient"} diastable={true}/>}
            <Notification error={error}/>
            <SearchBar onChange={(e) => setQuery(e.target.value)}/>

            {loading ? <SpinnerModal/> :
                <Table className="mt-5" size="sm" responsive="md">
                    <TableHead th_1={'No'} th_2={'Name'} th_3={'Surname'} th_4={'Patient added by'}/>
                    <tbody>
                    {patients.filter((user) => user.surname.toLowerCase().includes(query)).map((patient, index) => (
                        <tr className="align-text-bottom" key={patient._id}>
                            <td>{index + 1}</td>
                            <td>{patient.name}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.user?.email ? patient.user.email : 'Doctor removed'}</td>
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
                        </tr>))}
                    </tbody>
                </Table>}
            <RemoveModal showModal={showModal}
                         handleClose={handleClose}
                         handleDelete={() => deletePatient(id)}
                         descriptionBtn={'patient'}
            />
        </Container>);
};

