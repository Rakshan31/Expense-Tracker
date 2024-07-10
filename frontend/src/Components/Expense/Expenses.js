import React, { useEffect } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';
import { InnerLayout } from '../../Styles/Layouts';
import ExpenseForm from './ExpenseForm';
import Item from '../Item/Item';
import './Expense.css';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses();// eslint-disable-next-line 
    }, []);

    return (
        <div id="expense-container">
            <div className="expense-styled">
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span style={{color:"#8B0000"}}>₹ {totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <Item
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="#752626"
                                    deleteItem={deleteExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </div>
        </div>
    );
}

export default Expenses;
