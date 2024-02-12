const mongoose = require("mongoose");
const Transaction = require("./models/transactionSchema");

mongoose
  .connect("mongodb://localhost:27017/bank-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const sampleTransactions = [
  { amount: 100, category: "Groceries", vendor: "Grocery Store" },
  { amount: 50, category: "Dining", vendor: "Restaurant" },
];

Transaction.create(sampleTransactions)
  .then((transactions) => {
    console.log("Sample data added to the database:", transactions);
  })
  .catch((err) => {
    console.error("Error adding sample data:", err);
  });
