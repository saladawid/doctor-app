import React, {useContext, useEffect} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Context} from '../App';
import {GiPlagueDoctorProfile} from 'react-icons/gi';

export const Header = () => {
    const {userLog, setUserLog, loggedUser} = useContext(Context);

    useEffect(() => {
        if (loggedUser) {
            setUserLog(true);
        }
    }, [setUserLog, loggedUser]);

    const logOut = () => {
        localStorage.removeItem("user");
        setUserLog(false);
    };

    return (
        <Navbar bg="black" variant="dark" expand="md" collapseOnSelect sticky="top">
            <Container>
                <GiPlagueDoctorProfile className="icon-main"/>
                <LinkContainer to="/">
                    <Navbar.Brand>Doctor APP</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex justify-content-between w-100">
                        <div className="d-md-inline-flex text-center">
                            <LinkContainer to="/patients">
                                <Nav.Link>Patients</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/doctors">
                                <Nav.Link>Doctors</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/messages">
                                <Nav.Link>All messages</Nav.Link>
                            </LinkContainer>
                        </div>
                        {userLog ?
                            (
                                <div className="d-md-inline-flex text-center">
                                    <LinkContainer to="/profile">
                                        <Nav.Link>Profile</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login" onClick={logOut}>
                                        <Nav.Link>Log out</Nav.Link>
                                    </LinkContainer>
                                </div>
                            ) :
                            (
                                <div className="d-md-inline-flex text-center">
                                    <LinkContainer to="/register">
                                        <Nav.Link>Registration</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Log in</Nav.Link>
                                    </LinkContainer>
                                </div>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};