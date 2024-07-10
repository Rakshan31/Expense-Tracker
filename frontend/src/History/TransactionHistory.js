import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import "./History.css";

const TransactionHistory = () => {
    const { transactionHistory, getIncomes, getExpenses } = useGlobalContext();
    const [sortedTransactions, setSortedTransactions] = useState([]);
    const [sortType, setSortType] = useState("latest");

    const name = localStorage.getItem("userName");

    useEffect(() => {
        if (name) {
            getIncomes();
            getExpenses();
        }
        // eslint-disable-next-line
    }, [name]);

    useEffect(() => {
        sortTransactions();
        // eslint-disable-next-line
    }, [transactionHistory, sortType]);

    const sortTransactions = () => {
        const allTransactions = transactionHistory();
        const sortFunc = {
            latest: (a, b) => new Date(b.date) - new Date(a.date),
            oldest: (a, b) => new Date(a.date) - new Date(b.date),
            least: (a, b) => a.amount - b.amount,
            most: (a, b) => b.amount - a.amount,
        };

        setSortedTransactions([...allTransactions].sort(sortFunc[sortType]));
    };

    const expenses = sortedTransactions.filter(item => item.type === 'expense');
    const incomes = sortedTransactions.filter(item => item.type === 'income');

    return (
        <div id="transactionhistory-container">
            <div className="transactionhistory-styled">
                <h1>Recent History</h1>
                <div className="sort-buttons">
                    <button onClick={() => setSortType("latest")}>Sort by Latest</button>
                    <button onClick={() => setSortType("oldest")}>Sort by Oldest</button>
                    <button onClick={() => setSortType("least")}>Sort by Least Amount</button>
                    <button onClick={() => setSortType("most")}>Sort by Most Amount</button>
                </div>

                <div className="transactionhistory-section">
                    <h2>Incomes</h2>
                    {incomes.map((item) => {
                        const { _id, title, amount } = item;
                        return (
                            <div key={_id} className="transactionhistory-item incomeHistory">
                                <p>{title}</p>
                                <p>{`+ ₹ ${amount <= 0 ? 0 : amount}`}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="transactionhistory-section">
                    <h2>Expenses</h2>
                    {expenses.map((item) => {
                        const { _id, title, amount } = item;
                        return (
                            <div key={_id} className="transactionhistory-item expenseHistory">
                                <p>{title}</p>
                                <p>{`- ₹ ${amount <= 0 ? 0 : amount}`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory;
