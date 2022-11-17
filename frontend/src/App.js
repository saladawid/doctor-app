import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomeScreen} from './screens/HomeScreen';
import {NewPatientScreen} from './screens/NewPatientScreen';
import {PatientsScreen} from './screens/PatientsScreen';
import {PatientScreen} from './screens/PatientScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {LoginScreen} from './screens/LoginScreen';
import {LoggedScreen} from './screens/LoggedScreen';
import {TestsScreen} from './screens/TestsScreen';
import {NavBar} from './components/NavBar';
import {TestScreen} from './screens/TestScreen';
import {DoctorsScreen} from './screens/DoctorsScreen';
import {MessageScreen} from './screens/MessageScreen';
import {MessagesScreen} from './screens/MessagesScreen';
import {UserContext} from './context/UserContext';

function App() {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const [userLog, setUserLog] = useState(false);

    return (
        <UserContext.Provider value={{userLog, setUserLog, loggedUser}}>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/patients" element={<PatientsScreen/>}/>
                    <Route path="/patients/:id" element={<PatientScreen/>}/>
                    <Route path="/add-patient" element={<NewPatientScreen/>}/>
                    <Route path="/register" element={<RegisterScreen/>}/>
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="/profile" element={<LoggedScreen/>}/>
                    <Route path="/tests/:test/:id" element={<TestScreen/>}/>
                    <Route path="/tests/:id" element={<TestsScreen/>}/>
                    <Route path="/doctors" element={<DoctorsScreen/>}/>
                    <Route path="/doctors/:id" element={<MessageScreen/>}/>
                    <Route path="/messages" element={<MessagesScreen/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
