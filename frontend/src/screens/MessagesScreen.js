import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import {RemoveModal} from '../components/RemoveModal';
import {AccessMessage} from '../components/AccessMessage';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {HeaderText} from '../components/HeaderText';
import {Notification} from '../components/Notification';
import {SpinnerModal} from '../components/Spinner';

export const MessagesScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [messages, setMessages] = useState([]);
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (() => (getMessages()))();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setError(null);
    };
    const handleShow = () => setShowModal(true);


    const getMessages = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`${API_URL}api/messages`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setMessages(data);
        } catch (e) {
            setError(handleError(e));
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id) => {
        try {
            const {data} = await axios.delete(`${API_URL}api/messages/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setShowModal(false);
            setMessages(messages => messages.filter(message => message._id !== data.message._id));
        } catch (e) {
            setError(handleError(e));
        }
    };

    const markMessage = async id => {
        const {data} = await axios.get(`${API_URL}api/messages/${id}`, {
            headers: {
                Authorization: 'Bearer ' + loggedUser.token,
            },
        });
        setMessages(messages => messages.map(message => {
            if (message._id === data._id) {
                message.complete = data.complete;
            }
            return message;
        }));
    };

    if (!loggedUser) return <AccessMessage/>;
    return (<Container>
            <HeaderText header={'messages'}/>
            <Notification error={error}/>
            {loading ? <SpinnerModal/> :
                <Row>
                    {messages.map((data) => (
                        <Col md={4} key={data._id}>
                            <Card className="my-2 me-2">
                                <Card.Header as="h5" className="text-center">
                                    <div className="text-center">
                                        Message from: {data.senderId?.email ? data.senderId.email : 'Doctor removed'}
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{data.message}</Card.Title>
                                    <Card.Footer className="text-center bg-white">
                                        <Button variant={data.complete ? "primary" : "danger"}
                                                onClick={() => markMessage(data._id)}
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
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>))}
                </Row>}
            <RemoveModal showModal={showModal} handleClose={handleClose}
                         handleDelete={() => deleteMessage(id)} descriptionBtn={'message'}/>
        </Container>
    );
};








