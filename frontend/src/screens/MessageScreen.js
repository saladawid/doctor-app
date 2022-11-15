import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {HeaderText} from '../components/HeaderText';
import {Notification} from '../components/Notification';
import {ButtonNavigate} from '../components/ButtonNavigate';


export const MessageScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const {id} = useParams();

    useEffect(() => {
        (() => (getUser()))();
    }, []);

    const getUser = async () => {
        try {
            const {data} = await axios(`${API_URL}api/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setUser(data);
        } catch (e) {
            setError(handleError(e));
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}api/messages/${id}`, {message}, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setInfo(data.message)
            setError(null)
        } catch (e) {
            setError(handleError(e));
        }
    };

    return (
        <Container>
            <HeaderText header={'send a message'}/>
            <ButtonNavigate link={"/doctors"} title={"Back to doctors database"}/>
            <Notification error={error} info={info}/>

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
                            <Form.Group className="mb-3" controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    cols={10}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="dark" className="mb-3" disabled={info && true}>Send</Button>
            </Form>
        </Container>
    );
};