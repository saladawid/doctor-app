import React, {useState, useEffect, useContext} from 'react';
import {Container} from 'react-bootstrap';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {API_URL} from '../../utils/url';


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
        getData();
    }, []);


    const getData = async () => {

        const res = await fetch(`${API_URL}api/home`);
        const data = await res.json();

        if (!res.ok) {

        } else {
            setChartData(data);
            console.log(data);
        }
    };


    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Welcome to the App Doctor</h1>
            <h2 className="text-center p-2 mt-4 mb-4">Simple application for patient management</h2>

            <div style={{height: "60vh"}} className="chart">

                <Pie data={data}
                     width={100}
                     height={50}
                     options={{maintainAspectRatio: false}}/>
            </div>


        </Container>
    );
};