import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { playClickSound } from "../../sfx.js";

const Operations = ({ addTransaction }) => {
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleAddTransaction = async () => {
    if (
      !amount ||
      isNaN(amount) ||
      !vendor ||
      !category ||
      !transactionType ||
      !month ||
      month < 1 ||
      month > 12
    ) {
      alert(
        "Please fill in all required fields and enter a valid month (1-12)."
      );
      return;
    }

    try {
      const newTransaction = {
        amount: Number(transactionType === "withdrawal" ? -amount : amount),
        vendor,
        category,
        month: Number(month),
      };
      if (month > 12) {
        setSnackbarMessage("Entered number is not a month (1-12)");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
        return;
      }

      const nTrans = await axios.post(
        "http://localhost:3000/transactions",
        newTransaction
      );

      addTransaction({ ...newTransaction, _id: nTrans.data._id });
      setAmount("");
      setVendor("");
      setCategory("");
      setMonth("");
      setTransactionType(""); // RESETS THE TRANSACTION
      setSnackbarMessage("Transaction added successfully!");
      setShowSnackbar(true); // Update showSnackbar state to true
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                // only allows digits and numbers
                setAmount(value);
              }
            }}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter amount (Numbers Only)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vendor" className="block mb-1">
            Vendor:
          </label>
          <input
            type="text"
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter vendor"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter category"
          />
          <div className="mb-4">
            <label htmlFor="month" className="block mb-1">
              Month:
            </label>
            <input
              type="number"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter month (1-12)"
              min="1"
              max="12"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setTransactionType("deposit")}
            className={
              transactionType === "deposit"
                ? "mr-2 px-4 py-2 rounded-md bg-green-500 text-white"
                : "mr-2 px-4 py-2 rounded-md bg-gray-300 text-gray-600"
            }
          >
            Deposit
          </button>
          <button
            onClick={() => setTransactionType("withdrawal")}
            className={
              transactionType === "withdrawal"
                ? "px-4 py-2 rounded-md bg-red-500 text-white"
                : "px-4 py-2 rounded-md bg-gray-300 text-gray-600"
            }
          >
            Withdrawal
          </button>
        </div>
        {amount && vendor && category && transactionType && (
          <Link to="/transactions">
            <button
              onClick={() => {
                handleAddTransaction();
                playClickSound();
              }}
              className="w-full px-4 py-2 rounded-md bg-blue-500 text-white"
            >
              Add Transaction
            </button>
          </Link>
        )}
        {showSnackbar && (
          <div className="fixed bottom-4 left-4 w-10 h-10 bg-gray-900 text-white flex items-center justify-center rounded">
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Operations;
