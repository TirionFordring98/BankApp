import React from "react";

const TransactionSum = ({ transactions }) => {
  const calculateTransactionSum = () => {
    const categoryCountMap = {};
    transactions.forEach((transaction) => {
      const { category } = transaction;
      categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
    });

    return Object.entries(categoryCountMap).map(([category, count]) => ({
      category,
      count,
    }));
  };

  const categoryCounts = calculateTransactionSum();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Transactions by Category</h2>
        <div className="divide-y divide-gray-200">
          {categoryCounts.map((item, index) => (
            <div key={index} className="py-4">
              <p className="text-lg font-semibold mb-2">
                Category: {item.category}
              </p>
              <p className="text-gray-600">
                Number of Transactions: {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionSum;
