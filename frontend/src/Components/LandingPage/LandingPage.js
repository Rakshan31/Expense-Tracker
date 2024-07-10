import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import dashboard from "../../images/dashboard.png";
import expense from "../../images/expense.png";
import income from "../../images/income.png";
import transaction from "../../images/transaction.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    // Wake up the backend server
    axios.get('https://expense-buddy-9aqs.onrender.com/api/wake-up')
      .then(response => {
        console.log('Backend server is waking up:', response.data);
        setNotification(true);
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error waking up the backend server:', error);
      });
  }, []);

  return (
    <div id="landing-page">
      {notification && (
        <div id="notification">
          Backend server is ready!
        </div>
      )}
      <div id="header">
        <div id="logo">
          <h1>EXPENSE BUDDY</h1>
        </div>
        <ul id="nav-head">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#faq-section">FAQ</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/signup" className="btn btn-signup">
            SignUp
          </Link>
        </ul>
      </div>

      <div id="hero-section">
        <div id="texts">
          <h2 id="fade-in">WELCOME TO</h2>
          <h1 id="slide-in">EXPENSE BUDDY</h1>
          <p id="fade-in">
            Track expenses, manage budgets, and achieve your financial goals.
          </p>
          <Link to="/signup" id="">
            Get Started {">"}
          </Link>
        </div>
      </div>

      <div id="features">
        <h2 id="section-title">What do we do?</h2>
        <div id="feature-cards">
          <div className="feature-card odd">
            <div className="ftext">
              <h1>Track Your Expenses</h1>
              <p>
                Effortlessly log and categorize your daily expenses to stay on top of your finances.
              </p>
            </div>
            <img src={transaction} alt="Track Your Expenses" />
          </div>
          <div className="feature-card even">
            <img src={dashboard} alt="Manage Your Budget" />
            <div className="ftext">
              <h1>Manage Your Budget</h1>
              <p>
                Set budget limits and get notified when you're nearing them to avoid overspending.
              </p>
            </div>
          </div>
          <div className="feature-card odd">
            <div className="ftext">
              <h1>Visualize Your Data</h1>
              <p>
                Use charts and graphs to understand your spending patterns and make informed decisions.
              </p>
            </div>
            <img src={income} alt="Visualize Your Data" />
          </div>
        </div>
      </div>

      <div id="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is Expense Buddy?</h3>
          <p>
            Expense Buddy is a comprehensive tool to help you track your
            expenses, manage your budgets, and achieve your financial goals.
          </p>
        </div>
        <div className="faq-item">
          <h3>How do I sign up?</h3>
          <p>
            You can sign up by clicking the 'Sign Up' button on the top right
            corner and filling out the registration form with your details.
          </p>
        </div>
        <div className="faq-item">
          <h3>Is my data secure?</h3>
          <p>
            Yes, we prioritize your data security. All your data is encrypted
            and stored securely on our servers.
          </p>
        </div>
        <div className="faq-item">
          <h3>What features does Expense Buddy offer?</h3>
          <p>
            Expense Buddy offers expense tracking, budget management, financial
            goal setting, and detailed reports to help you manage your finances
            effectively.
          </p>
        </div>
      </div>

      <div id="contact">
        <h2 id="section-title">Contact Us</h2>
        <div id="social-media-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>

      <footer id="footer">
        <div id="footer-content">
          <p>Made By Shivendra Mishra</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
