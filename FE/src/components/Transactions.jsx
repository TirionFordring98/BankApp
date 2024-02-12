import React, { useState, useEffect } from "react";
import axios from "axios";
import { playClickSound } from "../../sfx.js";

const Transactions = ({ setTransactions, transactions }) => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    setTransactionData(transactions);
  }, [transactions]);

  const handleDeleteTransaction = async (id, index) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`);

      const updatedTransactions = [...transactionData];
      updatedTransactions.splice(index, 1);
      setTransactionData(updatedTransactions);

      setTransactions(updatedTransactions);

      playClickSound();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold p-4 bg-gray-200">All Transactions</h2>
        <div className="divide-y divide-gray-300">
          {transactionData.map((transaction, index) => {
            return (
              <div
                key={index}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{transaction.vendor}</p>
                  <p className="text-gray-600">{transaction.category}</p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`text-lg font-bold ${
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {transaction.amount < 0 ? "-" : "+"}$
                    {Math.abs(transaction.amount)}
                  </p>
                  <p className="ml-2 font-bold text-orange-500">Month:</p>{" "}
                  {/* Display "Month:" */}
                  <p className="ml-1 text-gray-500">{transaction.month}</p>{" "}
                  {/* Display month */}
                  <button
                    className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                    onClick={() =>
                      handleDeleteTransaction(transaction._id, index)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
