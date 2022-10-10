import React, {useEffect, useContext} from 'react';
import {Alert, Button, Card, Container, Spinner, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Context} from '../../App';
import {API_URL} from '../../utils/url';
import {RemoveModal} from '../RemoveModal';

export const DoctorsScreen = () => {
    const {
        userLog,
        setUserLog,
        users,
        setUsers,
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

    const handleClose = () => {
        setShowModal(false);
        setError(false);
    };
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        try {
            setError(false);
            setLoading(true);

            loggedUser && setUserLog(true);

            const res = await fetch(`${API_URL}api/users`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setUsers(data);
                setLoading(false);
            }

        } catch (e) {
            console.log('ACCESS FOR LOGGED IN USERS');
        }
    };

    const deleteDoctor = async (id) => {

        const res = await fetch(`${API_URL}api/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + loggedUser.token,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setShowModal(false);
            setUsers(users => users.filter(user => user._id !== data.doctor._id))
        }
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
            <h1 className="text-center p-2 mt-4 mb-4">Database of doctors</h1>
            {loading && <Container className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>}
            <div className="d-flex align-items-center justify-content-center">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
            <Table size="sm" responsive="md">
                <thead>
                <tr className="">
                    <th>No</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr className="align-text-bottom" key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>
                            <div className="d-flex justify-content-between">
                                <Link to={`${user._id}/message`}>
                                    <Button size="sm" variant="dark" className="btn">Send Message</Button>
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

                    </tr>
                ))}
                </tbody>
            </Table>
            <RemoveModal showModal={showModal} handleClose={handleClose}
                         handleDelete={() => deleteDoctor(id)} descriptionBtn={'doctor'}/>
        </Container>);
};

