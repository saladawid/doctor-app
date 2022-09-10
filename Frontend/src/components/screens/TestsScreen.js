import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Spinner, Table} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Context} from '../../App';
import {API_URL} from '../../utils/url';
import {RemoveModal} from '../RemoveModal';

export const TestsScreen = () => {
    const {setUserLog, showModal, setShowModal} = useContext(Context);
    const [testsResults, setTestsResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login');
        }
        getTestsResults();

    }, []);

    const getTestsResults = async () => {
        try {
            setLoading(true);

            loggedUser && setUserLog(true);

            const res = await fetch(`${API_URL}api/patients/${id}/tests`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });

            const data = await res.json();

            setTestsResults(data);

            setLoading(false);

        } catch (e) {
            console.error(e);
        }
    };

    const deleteTest = async (test) => {

        const res = await fetch(`${API_URL}api/patients/${id}/tests/${test}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + loggedUser.token,
            },
        });
        const data = await res.json();
        setShowModal(false);

        setTestsResults(testsResults => testsResults.filter(test => test._id !== data.test._id));
    };

    return (
        <>
            <Container>
                <h1 className="text-center p-2 mt-4 mb-4">Patient Tests Results</h1>
                <Link to={`/patients/${id}`}>
                    <Button variant="dark" className="mb-3">Back to Patient Profile</Button>
                </Link>
                {loading && <Container className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>}

                <Table size="sm" responsive="md">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Test name</th>
                        <th>Total score</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {testsResults.map((test, index) => (
                        <tr className="align-text-bottom" key={test._id}>
                            <td>{index + 1}</td>
                            <td>{test.name}</td>
                            <td>{test.score}</td>
                            <td>{test.date}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    {/*<Link to={`${test._id}`}>*/}
                                    {/*    <Button size="sm" variant="dark" className="btn">View</Button>*/}
                                    {/*</Link>*/}
                                    <Button onClick={handleShow}
                                            variant="dark"
                                            size="sm">Delete</Button>
                                </div>
                            </td>
                            <RemoveModal showModal={showModal} handleClose={handleClose}
                                         handleDelete={() => deleteTest(test._id)} descriptionBtn={'test'}/>
                        </tr>))}
                    </tbody>
                </Table>
            </Container>
        </>);

};