import React from "react";
import { Link } from "react-router-dom";

const BreakdownComponent = ({ transactions }) => {
  const calculateBreakdown = () => {
    if (!transactions || transactions.length === 0) return [];

    const categoryMap = {};
    transactions.forEach((transaction) => {
      const { category, amount } = transaction;
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  const categoryBreakdown = calculateBreakdown();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Breakdown</h2>
        <div className="breakdown-container">
          <h2 className="text-lg font-semibold mb-2">
            Breakdown of Expenses by Category
          </h2>
          {categoryBreakdown.length > 0 ? (
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Total Amount Spent</th>
                </tr>
              </thead>
              <tbody>
                {categoryBreakdown.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.category}</td>
                    <td
                      className={`px-4 py-2 ${
                        item.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ${Math.abs(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No transactions data available.</p>
          )}
          <div className="text-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              <Link to="/breakdown/transactionSum">
                Transactions by Category
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakdownComponent;
