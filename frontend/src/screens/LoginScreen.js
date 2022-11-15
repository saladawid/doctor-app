import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';
import {UserContext} from '../context/UserContext';
import {handleError} from '../utils/handleErrors';

export const LoginScreen = () => {
    const {setUserLog} = useContext(UserContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}api/users/login`, {
                ...user,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('user', JSON.stringify(data));
            setUserLog(true);
            navigate('/');
        } catch (e) {
            setError(handleError(e));
        }
    };

    return (
        <Container>
            <HeaderText header={'log in'}/>
            <ButtonNavigate link={"/"} title={"Back to main page"}/>
            <Notification error={error}/>
            <Form onSubmit={loginUser}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="admin@admin.com"
                                value={user.email}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    email: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="admin"
                                          autoComplete="on"
                                          value={user.password}
                                          onChange={e => setUser(user => ({
                                              ...user,
                                              password: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="dark">Log in</Button>
            </Form>
        </Container>
    );
};

