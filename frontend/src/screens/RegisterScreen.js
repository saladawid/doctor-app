import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {AccessMessage} from '../components/AccessMessage';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';

export const RegisterScreen = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}api/users`, {...user});

            setInfo(`User: ${data.email} has been registered`);
        } catch (e) {
            setError(handleError(e));
        }
    };

    if (info) return <AccessMessage title={info}/>;

    return (
        <Container>
            <HeaderText header={'user registration'}/>
            <ButtonNavigate link={"/"} title={"Back to main page"}/>
            <Notification error={error}/>

            <Form onSubmit={registerUser}>
                <Row>
                    <Col md={6} l={6} xl={6}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.name}
                                onChange={e => setUser(
                                    user => ({
                                        ...user,
                                        name: e.target.value,
                                    }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} l={6} xl={6}>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.surname}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    surname: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} l={6} xl={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={user.email}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    email: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} l={6} xl={6}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          autoComplete="on"
                                          value={user.password}
                                          onChange={e => setUser(user => ({
                                              ...user,
                                              password: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mb-4" type="submit" variant="dark">Save user</Button>
            </Form>
        </Container>
    );
};

