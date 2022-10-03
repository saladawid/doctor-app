import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Context} from '../../App';
import {API_URL} from '../../utils/url';


export const SendMessageScreen = () => {
    const {
        error,
        setError,
        loggedUser,
        disabledBtn,
        setDisabledBtn,
        resultInfo,
        setResultInfo,
    } = useContext(Context);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const {id} = useParams();

    useEffect(() => {
        getDoctor();
        setDisabledBtn(false);
        setResultInfo(false);
    }, []);

    const getDoctor = async () => {

        try {
            const res = await fetch(`${API_URL}api/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setUser(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/users/${id}/message`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', Authorization: 'Bearer ' + loggedUser.token,
            }, body: JSON.stringify({
                message,
            }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`The message has been send`);
            setDisabledBtn(true);
            setError(false);
        }

    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Send a message</h1>
            <Link to="/doctors">
                <Button variant="dark" className="mb-3">Back to database</Button>
            </Link>
            <div className="text-center w-50">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>
            <Form onSubmit={sendMessage}>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Send to:</Form.Label>
                            <Form.Control
                                value={`${user.email}` ?? ''}
                                readOnly
                            />
                        </Form.Group>
                        <Col md={6} xs={12}>
                            <Form.Group className="mb-3" controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Col>
                </Row>
                <Button type="submit" variant="dark" className="mb-3" disabled={disabledBtn}>Send</Button>
            </Form>
        </Container>
    );
};