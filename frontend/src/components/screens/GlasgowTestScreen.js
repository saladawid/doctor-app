import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const GlasgowTestScreen = ({id, test}) => {
    const {resultInfo, setResultInfo, error, setError, loggedUser, disabledBtn, setDisabledBtn} = useContext(Context);
    const [answerTest, setAnswerTest] = useState({
        name: "Glasgow Test",
        eye: 0,
        verbal: 0,
        motor: 0,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        setDisabledBtn(false);
    }, []);


    const change = (e) => setAnswerTest(answerTest => ({
        ...answerTest,
        [e.target.name]: Number(e.target.value),
    }));

    const saveTest = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}api/patients/${id}/${test}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + loggedUser.token,
            },
            body: JSON.stringify({
                ...answerTest,
            }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`The ${data.name} has been added to the patient`);
            setDisabledBtn(true);
            setError(false);
            window.scrollTo(0, 0);
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Glasgow Coma Scale</h1>
            <Link to={`/patients/${id}`}>
                <Button variant="dark" className="mb-3">Back to Patient Profile</Button>
            </Link>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>
            <Form onSubmit={saveTest}>
                <Form.Group className="mb-3">
                    <Form.Label>Ocular response:</Form.Label>
                    <Form.Check name="eye" label="4 = Opens eyes spontaneously" value="4" type="radio"
                                onChange={change}></Form.Check>
                    <Form.Check name="eye" label="3 = Opens eyes in response to voice" value="3" type="radio"
                                onChange={change}></Form.Check>
                    <Form.Check name="eye" label="2 = Opens eyes in response to pain" value="2" type="radio"
                                onChange={change}></Form.Check>
                    <Form.Check name="eye" label="1 = Does not open eyes" value="1" type="radio"
                                onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Oral response:</Form.Label>
                    <Form.Check name="verbal" label="5 = Oriented to time, person, and place, converses normally"
                                value="5"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="verbal" label="4 = Confused and disoriented, but able to answer questions"
                                value="4"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="verbal" label="3 = Inappropriate words" value="3" type="radio"
                                onChange={change}></Form.Check>
                    <Form.Check name="verbal" label="2 = Incomprehensible sounds" value="2" type="radio"
                                onChange={change}></Form.Check>
                    <Form.Check name="verbal" label="1 = Makes no sounds" value="1" type="radio"
                                onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Motoric response:</Form.Label>
                    <Form.Check name="motor" label="6 = Obeys commands" value="6"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="motor" label="5 = Moves to localize pain" value="5"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="motor" label="4 = Flexion / Withdrawal from painful stimuli" value="4"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="motor" label="3 = Abnormal flexion (decorticate posture)" value="3"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="motor" label="2 = Abnormal extension (decerebrate posture)" value="2"
                                type="radio" onChange={change}></Form.Check>
                    <Form.Check name="motor" label="1 = Makes no movements" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Button type="submit" variant="dark" className="mb-3" disabled={disabledBtn}>Save test</Button>
            </Form>
        </Container>
    );
};