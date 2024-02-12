const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Transaction = require("./models/transactionSchema");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
// CHECK IF CORS IS WORKING?
// MIDDLEWARE IS WORKING?!

app.use(bodyParser.json());

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

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedNewTransaction = await newTransaction.save();
    res.status(201).send(savedNewTransaction);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "Not saved! try again!" });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Transaction.findByIdAndDelete(id);
    res.sendStatus(201);
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}); // make sure to reaplce ID by object for easier use

app.get("/transactions/breakdown", async (req, res) => {
  try {
    const transactionsTotal = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).send(transactionsTotal);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
