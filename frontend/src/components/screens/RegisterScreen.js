import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const RegisterScreen = () => {
    const {resultInfo, setResultInfo, error, setError} = useContext(Context);
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        setError(false)
    }, []);

    const saveUser = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...user,
            }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`User: ${data.email} has been registered`);
        }
    };

    if (resultInfo) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Card className="align-items-center">
                    <Card.Title className="m-3">{resultInfo}</Card.Title>
                    <Card.Body>
                        <Link to="/login">
                            <Button variant="dark" className="mb-3">Log in</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">User Registration</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <div className="text-center w-50">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
            <Form  noValidate className="w-50" onSubmit={saveUser}>
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
                <Button type="submit" variant="dark">Save user</Button>
            </Form>
        </Container>
    );
};

