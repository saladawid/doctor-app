import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../utils/url';
import {handleError} from '../utils/handleErrors';
import {Notification} from '../components/Notification';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';

export const LoggedScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState({
        name: '',
        surname: '',
        password: '',
        newPassword: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [readOnly, setReadOnly] = useState(true);

    useEffect(() => {
        (() => (getLoggedUser()))();
    }, []);

    const getLoggedUser = async () => {
        try {
            const {data} = await axios(`${API_URL}api/users/profile`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setUser(data);
        } catch (e) {
            setError(handleError(e));
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`${API_URL}api/users/profile`, {...user}, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setUser(data);
            setError('');
            setReadOnly(true);
            await getLoggedUser();
        } catch (e) {
            setError(handleError(e));
        }
    };

    const editUser = (e) => {
        e.preventDefault();
        setReadOnly(!readOnly);
        setError('');
        setInfo('');
        (() => (getLoggedUser()))();
    };

    return (
        <Container>
            <HeaderText header={'user profile'}/>
            <ButtonNavigate link={"/"} title={"back to main page"}/>
            <Notification error={error} info={info}/>
            <Form onSubmit={updateUser}>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly={readOnly}
                                value={user.name ?? ''}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    name: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly={readOnly}
                                value={user.surname ?? ''}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    surname: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text"
                                          readOnly={readOnly}
                                          value={user.email ?? ''}
                                          onChange={e => setUser(user => ({
                                              ...user,
                                              email: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text"
                                          readOnly={readOnly}
                                          value={user.password ?? ''}
                                          onChange={e => setUser(user => ({
                                              ...user,
                                              password: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="text"
                                          readOnly={readOnly}
                                          value={user.newPassword ?? ''}
                                          onChange={e => setUser(user => ({
                                              ...user,
                                              newPassword: e.target.value,
                                          }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="dark" className="me-3" disabled={readOnly}>Save</Button>
                <Button type="submit" variant="dark" onClick={editUser}>{readOnly ? 'Edit' : 'Cancel'}</Button>
            </Form>
        </Container>
    );
};

