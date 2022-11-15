import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {API_URL} from '../utils/url';
import {HeaderText} from '../components/HeaderText';


export const HomeScreen = () => {
    const [chartData, setChartData] = useState([]);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Doctors', 'Patients', 'Tests', 'Messages'],
        datasets: [
            {
                data: [chartData.userLength, chartData.patientLength, chartData.testLength, chartData.messageLength],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        (() => (getData()))();
    }, []);

    const getData = async () => {
        const res = await fetch(`${API_URL}api/home`);
        const data = await res.json();
        setChartData(data);
    };

    return (
        <Container>
            <HeaderText header={'application for patient management'}/>
            <p className="text-center">Entered into the database</p>
            <div style={{height: "60vh"}} className="chart">

                <Pie data={data}
                     width={100}
                     height={50}
                     options={{maintainAspectRatio: false}}/>
            </div>
        </Container>
    );
};