import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {API_URL} from '../utils/url';
import {RemoveModal} from '../components/RemoveModal';
import {handleError} from '../utils/handleErrors';
import axios from 'axios';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {TableHead} from '../components/TableHead';
import {SpinnerModal} from '../components/Spinner';
import {Notification} from '../components/Notification';


export const TestsScreen = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [tests, setTests] = useState([]);
    const [idTest, setIdTest] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        !loggedUser && navigate('/login');
        getTests();
    }, []);

    const getTests = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`${API_URL}api/tests/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setTests(data);
        } catch (e) {
            setError(handleError(e));
        } finally {
            setLoading(false);
        }
    };

    const deleteTest = async (test) => {
        try {
            const {data} = await axios.delete(`${API_URL}api/tests/${test}`, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setTests(tests => tests.filter(test => test._id !== data.test._id));
        } catch (e) {
            setError(handleError(e));
        } finally {
            setShowModal(false);
        }
    };

    return (
        <>
            <Container>
                <HeaderText header={'Patient Tests'}/>
                <ButtonNavigate link={`/patients/${id}`} title={"back to patient profil"}/>
                <Notification error={error}/>

                {loading ? <SpinnerModal/> :
                    <Table className="mt-5" size="sm" responsive="md">
                        <TableHead th_1={'No'} th_2={'Test name'} th_3={'Total score'} th_4={'Date'}/>

                        <tbody>
                        {tests.map((test, index) => (
                            <tr className="align-text-bottom" key={test._id}>
                                <td>{index + 1}</td>
                                <td>{test.name}</td>
                                <td>{test.score}</td>
                                <td>{test.date}</td>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <Button onClick={() => {
                                            handleShow();
                                            setIdTest(test._id);
                                        }}
                                                variant="dark"
                                                size="sm">Delete</Button>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </Table>}
                <RemoveModal showModal={showModal} handleClose={handleClose}
                             handleDelete={() => deleteTest(idTest)} descriptionBtn={'test'}/>
            </Container>
        </>);
};