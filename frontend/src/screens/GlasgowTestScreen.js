import React, {useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../utils/url';
import {handleError} from '../utils/handleErrors';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';

export const GlasgowTestScreen = ({id, test}) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [answerTest, setAnswerTest] = useState({
        name: "Glasgow Test",
        eye: 0,
        verbal: 0,
        motor: 0,
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [readOnly, setReadOnly] = useState(false);

    const changeAnswer = (e) => setAnswerTest(answerTest => ({
        ...answerTest,
        [e.target.name]: Number(e.target.value),
    }));

    const saveTest = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}api/tests/${test}/${id}`, {...answerTest}, {
                headers: {
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setInfo(`The ${data.name} has been added to the patient`);
            setReadOnly(true);
            setError(null)
        } catch (e) {
            setError(handleError(e));
        }
    };

    return (
        <Container>
            <HeaderText header={'Glasgow Coma Scale'}/>
            <ButtonNavigate link={`/patients/${id}`} title={"back to patient profile"}/>
            <Notification error={error} info={info}/>
            <Form onSubmit={saveTest}>
                <Form.Group className="mb-3">
                    <Form.Label>Ocular response:</Form.Label>
                    <Form.Check name="eye" label="4 = Opens eyes spontaneously" value="4" type="radio"
                                onChange={changeAnswer}></Form.Check>
                    <Form.Check name="eye" label="3 = Opens eyes in response to voice" value="3" type="radio"
                                onChange={changeAnswer}></Form.Check>
                    <Form.Check name="eye" label="2 = Opens eyes in response to pain" value="2" type="radio"
                                onChange={changeAnswer}></Form.Check>
                    <Form.Check name="eye" label="1 = Does not open eyes" value="1" type="radio"
                                onChange={changeAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Oral response:</Form.Label>
                    <Form.Check name="verbal" label="5 = Oriented to time, person, and place, converses normally"
                                value="5"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="verbal" label="4 = Confused and disoriented, but able to answer questions"
                                value="4"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="verbal" label="3 = Inappropriate words" value="3" type="radio"
                                onChange={changeAnswer}></Form.Check>
                    <Form.Check name="verbal" label="2 = Incomprehensible sounds" value="2" type="radio"
                                onChange={changeAnswer}></Form.Check>
                    <Form.Check name="verbal" label="1 = Makes no sounds" value="1" type="radio"
                                onChange={changeAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Motoric response:</Form.Label>
                    <Form.Check name="motor" label="6 = Obeys commands" value="6"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="motor" label="5 = Moves to localize pain" value="5"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="motor" label="4 = Flexion / Withdrawal from painful stimuli" value="4"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="motor" label="3 = Abnormal flexion (decorticate posture)" value="3"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="motor" label="2 = Abnormal extension (decerebrate posture)" value="2"
                                type="radio" onChange={changeAnswer}></Form.Check>
                    <Form.Check name="motor" label="1 = Makes no movements" value="1"
                                type="radio" onChange={changeAnswer}></Form.Check>
                </Form.Group>
                <Button type="submit" variant="dark" className="mb-3" disabled={readOnly}>Save test</Button>
            </Form>
        </Container>
    );
};