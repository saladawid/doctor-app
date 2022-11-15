import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {API_URL} from '../utils/url';
import {RemoveModal} from '../components/RemoveModal';
import {AccessMessage} from '../components/AccessMessage';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {SpinnerModal} from '../components/Spinner';
import {HeaderText} from '../components/HeaderText';
import {Notification} from '../components/Notification';
import {TableHead} from '../components/TableHead';

export const DoctorsScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (() => (getUsers()))();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setError(null);
    };
    const handleShow = () => setShowModal(true);

    const getUsers = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`${API_URL}api/users`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setUsers(data);
        } catch (e) {
            setError(handleError(e));
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const {data} = await axios.delete(`${API_URL}api/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setShowModal(false);
            setUsers(users => users.filter(user => user._id !== data.user._id));
        } catch (e) {
            setError(handleError(e));
        }
    };

    if (!loggedUser) return <AccessMessage title={'ACCESS FOR LOGGED IN USERS'}/>;
    return (
        <Container fluid="md">
            <HeaderText header={'doctor database'}/>
            <Notification error={error}/>

            {loading ? <SpinnerModal/> :
                <Table className="mt-5" size="sm" responsive="md">
                    <TableHead th_1={'No'} th_2={'Name'} th_3={'Surname'} th_4={'Email'}/>

                    <tbody>
                    {users.map((user, index) => (
                        <tr className="align-text-bottom" key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <Link to={`${user._id}`}>
                                        <Button size="sm" variant="dark" className="btn">Send text</Button>
                                    </Link>
                                    <Button onClick={() => {
                                        handleShow();
                                        setId(user._id);
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
            <RemoveModal showModal={showModal} handleClose={handleClose}
                         handleDelete={() => deleteUser(id)} descriptionBtn={'doctor'}/>
        </Container>);
};

