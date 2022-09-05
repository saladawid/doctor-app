import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const UserProfileScreen = () => {
    const {
        resultInfo,
        setResultInfo,
        error,
        setError,
        disabledBtn,
        setDisabledBtn,
        editData,
        setEditData,
        loggedUser,
    } = useContext(Context);
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        !loggedUser && navigate('/login');
        getProfileData();
    }, []);

    const getProfileData = async () => {
        setResultInfo(false);
        setError(false);
        setEditData(true);
        setDisabledBtn(true);
        try {
            const res = await fetch(`${API_URL}api/users/profile`, {
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
            console.error(e);
        }
    };

    const saveProfileData = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + loggedUser.token,

            },
            body: JSON.stringify({
                ...user,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setUser(data);
            setError(false);
            setResultInfo('The user profile has been updated');
            setEditData(true);
            setDisabledBtn(true);
        }
    };

    const editProfileData = async (e) => {
        e.preventDefault();
        if (editData) {
            setResultInfo(false);
            setEditData(false);
            setDisabledBtn(false);
        } else {
            getProfileData();
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">User profile</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>
            <Form onSubmit={saveProfileData}>
                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly={editData}
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
                                readOnly={editData}
                                value={user.surname ?? ''}
                                onChange={e => setUser(user => ({
                                    ...user,
                                    surname: e.target.value,
                                }))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                                  readOnly={editData}
                                  value={user.email ?? ''}
                                  onChange={e => setUser(user => ({
                                      ...user,
                                      email: e.target.value,
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password"
                                  autoComplete="on"
                                  readOnly={editData}
                                  value={user.password ?? ''}
                                  onChange={e => setUser(user => ({
                                      ...user,
                                      password: e.target.value,
                                  }))}/>
                </Form.Group>
                <Button type="submit" variant="dark" className="me-3" disabled={disabledBtn}>Save</Button>
                <Button type="submit" variant="dark"
                        onClick={editProfileData}>{editData ? 'Edit data' : 'Cancel'}</Button>
            </Form>
        </Container>
    );
};

