import React from 'react';
import "./App.css"
import Navigation from './Components/Navigation/Navigation.js';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Incomes.js';
import Expenses from './Components/Expense/Expenses.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './Context/GlobalContext.js';
import TransactionHistory from './History/TransactionHistory.js';
import Login from './Auth/Login.js';
import Signup from './Auth/SignUp.js';

function App() {

    return (
        <Router>
            <div className="App" style={{backgroundColor:"rgba(0, 0, 0, 0.9)",height:"100vh"}}>
               
                  <GlobalProvider>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expenses />} />
                        <Route path="/transaction" element={<TransactionHistory/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<Signup/>} />
                    </Routes>
                    </GlobalProvider>
                
            </div>
        </Router>
    );
}



export default App;
