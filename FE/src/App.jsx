import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import OperationsComponent from "./components/Operations";
import BreakdownComponent from "./components/BreakDown";
import Transactions from "./components/Transactions";
import TransactionSum from "./components/TransactionSum";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

const App = () => {
  const [budget] = useState(-2500);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <Router>
      <div>
        <NavBar budget={budget} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/transactions"
            element={
              <Transactions
                setTransactions={setTransactions}
                transactions={transactions}
              />
            }
          />
          <Route
            path="/operations"
            element={
              <OperationsComponent addTransaction={handleAddTransaction} />
            }
          />
          <Route
            path="/breakdown"
            element={<BreakdownComponent transactions={transactions} />}
          />
          <Route
            path="/breakdown/transactionSum"
            element={<TransactionSum transactions={transactions} />}
          />
        </Routes>
      </div>
      <div className="bg-blue-500"></div>
    </Router>
  );
};

export default App;
