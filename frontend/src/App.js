import React, {useState, createContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomeScreen} from './components/screens/HomeScreen';
import {PatientAddScreen} from './components/screens/PatientAddScreen';
import {PatientsScreen} from './components/screens/PatientsScreen';
import {PatientProfileScreen} from './components/screens/PatientProfileScreen';
import {RegisterScreen} from './components/screens/RegisterScreen';
import {LoginScreen} from './components/screens/LoginScreen';
import {UserProfileScreen} from './components/screens/UserProfileScreen';
import {TestsScreen} from './components/screens/TestsScreen';
import {Header} from './components/Header';
import {TestScreen} from './components/screens/TestScreen';
import {DoctorsScreen} from './components/screens/DoctorsScreen';
import {SendMessageScreen} from './components/screens/SendMessageScreen';
import {MessagesScreen} from './components/screens/MessagesScreen';

export const Context = createContext(null);

function App() {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const [userLog, setUserLog] = useState(false);
    const [patients, setPatients] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [resultInfo, setResultInfo] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [readOnly, setReadOnly] = useState(false);
    const [editData, setEditData] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');

    return (
        <Context.Provider value={{
            userLog,
            setUserLog,
            patients,
            setPatients,
            users,
            setUsers,
            error,
            setError,
            resultInfo,
            setResultInfo,
            loading,
            setLoading,
            loggedUser,
            disabledBtn,
            setDisabledBtn,
            readOnly,
            setReadOnly,
            editData,
            setEditData,
            showModal,
            setShowModal,
            id,
            setId,
        }}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/patients" element={<PatientsScreen/>}/>
                    <Route path="/patients/:id" element={<PatientProfileScreen/>}/>
                    <Route path="/add-patient" element={<PatientAddScreen/>}/>
                    <Route path="/register" element={<RegisterScreen/>}/>
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="/profile" element={<UserProfileScreen/>}/>
                    <Route path="patients/:id/:test" element={<TestScreen/>}/>
                    <Route path="patients/:id/tests" element={<TestsScreen/>}/>
                    <Route path="/doctors" element={<DoctorsScreen/>}/>
                    <Route path="/doctors/:id/message" element={<SendMessageScreen/>}/>
                    <Route path="/messages" element={<MessagesScreen/>}/>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
