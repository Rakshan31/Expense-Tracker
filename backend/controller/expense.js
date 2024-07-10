const ExpenseSchema = require("../models/expense");

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date,email} = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,email
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required!'});
        }
        if (amount <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number!'});
        }
        await expense.save();
        res.status(200).json({message: 'Expense Added'});
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getExpense = async (req, res) => {
    const email = req.headers['useremail'];
    try {
        const expenses = await ExpenseSchema.find({email}).sort({createdAt: -1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Expense Deleted'});
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'});
        });
};
