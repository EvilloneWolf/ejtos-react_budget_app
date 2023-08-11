import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch,currency  } = useContext(AppContext);
    const [updatedBudget, setUpdatedBudget] = useState(budget);

    const totalAllocatedSpending = expenses.reduce((total, item) => total + item.cost, 0);
    const lowerLimit = totalAllocatedSpending;

    const handleBudgetChange = (event) => {
        const newValue = parseFloat(event.target.value);
        if (newValue >= lowerLimit && newValue <= 20000) {
            setUpdatedBudget(newValue);
        } else if (newValue < lowerLimit) {
            alert('Budget cannot be lower than allocated spending');
        } else {
            alert('Budget cannot exceed 20,000');
        }
    };

    const handleIncrease = () => {
        const newValue = updatedBudget + 10;
        if (newValue <= 20000) {
            setUpdatedBudget(newValue);
        } else {
            alert('Budget cannot exceed 20,000');
        }
    };

    const handleDecrease = () => {
        const newValue = updatedBudget - 10;
        if (newValue >= lowerLimit) {
            setUpdatedBudget(newValue);
        } else {
            alert('Budget cannot be lower than allocated spending');
        }
    };

    const handleSave = () => {
        if (updatedBudget >= lowerLimit && updatedBudget <= 20000) {
            dispatch({ type: 'SET_BUDGET', payload: updatedBudget });
        } else if (updatedBudget < lowerLimit) {
            alert('Budget cannot be lower than allocated spending');
        } else {
            alert('Budget cannot exceed 20,000');
        }
    };

    return (
        <div className='alert alert-secondary'>
            <div>
                <span>Budget: {currency}</span>
                <input
                    type='number'
                    value={updatedBudget}
                    onChange={handleBudgetChange}
                    onBlur={handleSave}
                />
                <button onClick={handleIncrease}>+10</button>
                <button onClick={handleDecrease}>-10</button>
            </div>
        </div>
    );
};

export default Budget;
