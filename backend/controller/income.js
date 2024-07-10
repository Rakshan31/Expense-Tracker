const IncomeSchema = require("../models/income");
const user = require("../models/user");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date,email } = req.body;

    const income = new IncomeSchema({
        title,
        amount: Number(amount),
        category,
        description,
        date,email
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    const email = req.headers['useremail'];
    try {
        const incomes = await IncomeSchema.find({email}).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await IncomeSchema.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
