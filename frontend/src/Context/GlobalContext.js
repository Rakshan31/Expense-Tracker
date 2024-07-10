import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://expense-buddy-9aqs.onrender.com/api/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}signup`, userData);
      setError(null); // Clear any previous error
      const { token, email ,name} = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const login = async (userData) =>{
    try{
        const response = await axios.post(`${BASE_URL}login`, userData);
        const { token, email,name } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        navigate('/')
    }
    catch(err){
        setError(err.response?.data?.message);
    }
}


  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, {
        headers: {
          'userEmail': localStorage.getItem('userEmail')
        }
      });
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  const addExpense = async (expense) => {

    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`, {
        headers: {
          'userEmail': localStorage.getItem('userEmail')
        }
      });
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const History = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history;
  };
  // eslint-disable-next-line
  const value = useMemo(
    () => ({
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      expenses,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      History,
      error,
      setError,
      signup,
      login,
    }),//eslint-disable-next-line
    [incomes, expenses, error, token]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
