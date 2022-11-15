import React, {useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {API_URL} from '../utils/url';
import axios from 'axios';
import {handleError} from '../utils/handleErrors';
import {HeaderText} from '../components/HeaderText';
import {ButtonNavigate} from '../components/ButtonNavigate';
import {Notification} from '../components/Notification';

export const HasBledTestScreen = ({id, test}) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [answerTest, setAnswerTest] = useState({
        name: "Has Bled Test",
        hypertension: 0,
        renal_disease: 0,
        liver_disease: 0,
        stroke_history: 0,
        bleeding: 0,
        inr: 0,
        age: 0,
        medication: 0,
        alcohol: 0,
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [readOnly, setReadOnly] = useState(false);


    const checkAnswer = (e) => setAnswerTest(answerTest => ({
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
            setError('');
            setReadOnly(true);
        } catch (e) {
            setError(handleError(e));
        }
    };

    return (
        <Container>
            <HeaderText header={'Has Bled Scale'}/>
            <ButtonNavigate link={`/patients/${id}`} title={"back to patient profile"}/>
            <Notification error={error} info={info}/>

            <Form onSubmit={saveTest}>
                <Form.Group className="mb-3">
                    <Form.Label>Hypertension: Uncontrolled, >160 mmHg systolic</Form.Label>
                    <Form.Check name="hypertension" label="No: 0" value="0" type="radio"
                                onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="hypertension" label="Yes: +1" value="1" type="radio"
                                onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Renal disease: Dialysis, transplant, Cr >2.26 mg/dL or >200 µmol/L:</Form.Label>
                    <Form.Check name="renal_disease" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="renal_disease" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Liver disease: Cirrhosis or bilirubin >2x normal with AST/ALT/AP >3x
                        normal:</Form.Label>
                    <Form.Check name="liver_disease" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="liver_disease" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stroke history:</Form.Label>
                    <Form.Check name="stroke_history" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="stroke_history" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prior major bleeding or predisposition to bleeding:</Form.Label>
                    <Form.Check name="bleeding" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="bleeding" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Labile INR: Unstable/high INRs, time in therapeutic range range over 60%:</Form.Label>
                    <Form.Check name="inr" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="inr" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age >65:</Form.Label>
                    <Form.Check name="age" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="age" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Medication usage predisposing to bleeding: Aspirin, clopidogrel, NSAIDs:</Form.Label>
                    <Form.Check name="medication" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="medication" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Alcohol use" ≥8 drinks/week:</Form.Label>
                    <Form.Check name="alcohol" label="No: 0" value="0"
                                type="radio" onChange={checkAnswer} defaultChecked></Form.Check>
                    <Form.Check name="alcohol" label="Yes: +1" value="1"
                                type="radio" onChange={checkAnswer}></Form.Check>
                </Form.Group>

                <Button type="submit" variant="dark" className="mb-3" disabled={readOnly}>Save test</Button>
            </Form>
        </Container>
    );
};