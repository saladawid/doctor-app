import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {API_URL} from '../../utils/url';
import {Context} from '../../App';

export const HasBledTestScreen = ({id, test}) => {
    const {resultInfo, setResultInfo, error, setError, loggedUser, disabledBtn, setDisabledBtn} = useContext(Context);
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

        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Has Bled Scale</h1>
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
                    <Form.Label>Hypertension: Uncontrolled, >160 mmHg systolic</Form.Label>
                    <Form.Check name="hypertension" label="No: 0" value="0" type="radio"
                                onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="hypertension" label="Yes: +1" value="1" type="radio"
                                onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Renal disease: Dialysis, transplant, Cr >2.26 mg/dL or >200 µmol/L:</Form.Label>
                    <Form.Check name="renal_disease" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="renal_disease" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Liver disease: Cirrhosis or bilirubin >2x normal with AST/ALT/AP >3x
                        normal:</Form.Label>
                    <Form.Check name="liver_disease" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="liver_disease" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stroke history:</Form.Label>
                    <Form.Check name="stroke_history" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="stroke_history" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prior major bleeding or predisposition to bleeding:</Form.Label>
                    <Form.Check name="bleeding" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="bleeding" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Labile INR: Unstable/high INRs, time in therapeutic range range over 60%:</Form.Label>
                    <Form.Check name="inr" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="inr" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age >65:</Form.Label>
                    <Form.Check name="age" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="age" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Medication usage predisposing to bleeding: Aspirin, clopidogrel, NSAIDs:</Form.Label>
                    <Form.Check name="medication" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="medication" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Alcohol use" ≥8 drinks/week:</Form.Label>
                    <Form.Check name="alcohol" label="No: 0" value="0"
                                type="radio" onChange={change} defaultChecked></Form.Check>
                    <Form.Check name="alcohol" label="Yes: +1" value="1"
                                type="radio" onChange={change}></Form.Check>
                </Form.Group>

                <Button type="submit" variant="dark" className="mb-3" disabled={disabledBtn}>Save test</Button>
            </Form>
        </Container>
    );
};