# Expense Buddy

# Clone the repository
$ git clone https://github.com/your-username/expense-buddy.git
$ cd expense-buddy

# Project Overview
Expense Buddy is a web application that helps you manage your finances effectively. It allows users to track incomes, expenses, and provides a comprehensive financial overview.

## Features

### Authentication
- Users can sign up securely.
- Existing users can log in to access their accounts.

### Income Management
- Add new incomes with titles, amounts, categories, descriptions, and dates.
- View a list of all incomes.
- Delete individual incomes.

### Expense Management
- Add new expenses with titles, amounts, categories, descriptions, and dates.
- View a list of all expenses.
- Delete individual expenses.

### Financial Overview
- Displays total income, total expenses, and overall balance.

### Transaction History
- Detailed history of all transactions, including both incomes and expenses.

## Setup

### Install Dependencies
$ npm install

### Set Environment Variables
$ echo "REACT_APP_API_BASE_URL=http://localhost:8000/api/" > .env

### Start Frontend (localhost:3000)
$ npm start

### Start Backend (localhost:8000)
$ cd backend
$ npm start

Open [http://localhost:3000](http://localhost:3000) in your browser to use Expense Buddy.

## Contributing

### Fork the Repository
$ git clone https://github.com/your-username/expense-buddy.git
$ cd expense-buddy

### Create a New Branch
$ git checkout -b feature/new-feature

### Make Changes and Commit
$ git add .
$ git commit -m "Add new feature"

### Push Changes to Your Fork
$ git push origin feature/new-feature

### Submit a Pull Request
