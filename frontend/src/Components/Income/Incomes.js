import React, { useEffect } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';
import { InnerLayout } from '../../Styles/Layouts';
import Form from './IncomeForm';
import IncomeItem from '../Item/Item';
import './Income.css';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();// eslint-disable-next-line 
    }, [incomes]);

    return (
        <div id="income-container">
            <div className="income-styled">
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>₹ {totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div id="incomeslist">
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
        </div>
    );
}

export default Income;
