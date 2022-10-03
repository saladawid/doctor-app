import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {Context} from '../../App';
import {API_URL} from '../../utils/url';

export const LoginScreen = () => {
    const {setUserLog, error, setError}  = useContext(Context);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
       setError(false)
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}api/users/login`, {
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
            localStorage.setItem('user', JSON.stringify(data));
            setUserLog(true);
            navigate('/');
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Log in</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <div className="text-center w-50">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
            <Form className="w-50" onSubmit={loginUser}>
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
                <Button type="submit" variant="dark">Log in</Button>
            </Form>
        </Container>
    );
};

