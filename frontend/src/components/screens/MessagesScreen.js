import React, {useContext, useState, useEffect} from 'react';
import {Alert, Button, Card, Container, Spinner, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Context} from '../../App';

import {API_URL} from '../../utils/url';
import {RemoveModal} from '../RemoveModal';

export const MessagesScreen = () => {
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
        resultInfo,
    } = useContext(Context);

    const [messages, setMessages] = useState([]);
    const [statusBtn, setStatusBtn] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setError(false);
    };
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        try {
            setLoading(true);

            loggedUser && setUserLog(true);

            const res = await fetch(`${API_URL}api/users/messages`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setMessages(data);
                setLoading(false);
            }

        } catch (e) {
            console.log('ACCESS FOR LOGGED IN USERS');
        }
    };

    const complete = async id => {

        const res = await fetch(`${API_URL}api/users/messages/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + loggedUser.token,
            },
        });

        const data = await res.json();


        setMessages(messages => messages.map(message => {
            if (message._id === data._id) {
                message.complete = data.complete;
            }
            return message;
        }));
    };

    const deleteMessage = async (id) => {

        const res = await fetch(`${API_URL}api/users/messages/${id}`, {
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
            setMessages(messages => messages.filter(message => message._id !== data.message._id));
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
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">All messages</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>

            {loading &&
                <Container className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>}


            {messages.map((data, index) => (
                <Card key={data._id} className="mb-2">
                    <Card.Header as="h5" className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
                            Message from: {data.senderId?.email ? data.senderId.email : 'Doctor removed'}
                        </div>
                        <Button variant={data.complete ? "primary" : "danger"}
                                onClick={() => complete(data._id)}
                                size="sm"
                        >
                            {data.complete ? 'Done' : 'To do'}
                        </Button>
                        <Button onClick={() => {
                            handleShow();
                            setId(data._id);
                        }}
                                variant="dark"
                                size="sm">
                            Delete
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {/*<Card.Title>No message: {index + 1}</Card.Title>*/}
                        <Card.Text>
                            {data.message}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            <RemoveModal showModal={showModal} handleClose={handleClose}
                         handleDelete={() => deleteMessage(id)} descriptionBtn={'message'}/>
        </Container>
    );

};