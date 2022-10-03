import React, {useContext, useEffect} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Context} from '../App';
import {GiPlagueDoctorProfile} from 'react-icons/gi';
import {BiLogIn, BiLogOut} from 'react-icons/bi';
import {MdAppRegistration} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';


export const Header = () => {
    const {userLog, setUserLog, loggedUser} = useContext(Context);

    useEffect(() => {
        if (loggedUser) {
            setUserLog(true);
        }
    }, [setUserLog]);

    const logOut = () => {
        localStorage.removeItem("user");
        setUserLog(null);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect sticky="top">
            <Container>
                <GiPlagueDoctorProfile className="icon-main"/>
                <LinkContainer to="/">
                    <Navbar.Brand>Doctor APP</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="align-items-center w-100 justify-content-between">
                        <div className="d-md-inline-flex">
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

                        <div className="d-md-inline-flex">
                            {userLog ? (
                                    <>

                                        <LinkContainer to="/profile">
                                            <Nav.Link>Profile <CgProfile className="icon"/></Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/login" onClick={logOut}>
                                            <Nav.Link>Log out <BiLogOut className="icon"/></Nav.Link>
                                        </LinkContainer>

                                    </>
                                ) :
                                (
                                    <>
                                        <LinkContainer to="/register">
                                            <Nav.Link>Registration <MdAppRegistration className="icon"/></Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                            <Nav.Link>Log in <BiLogIn className="icon"/></Nav.Link>
                                        </LinkContainer>
                                    </>
                                )
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
        ;
};