import React, { useContext } from "react";
import { incomeExpenseContext } from "../Context/IncomeExpenseProvider";

const Cards = () => {
  const { totalList } = useContext(incomeExpenseContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total Income
        </h5>
        <p className="font-bold text-gray-700 dark:text-gray-400">
          $ {totalList.totalIncome}
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total Expense
        </h5>
        <p className="font-bold text-gray-700 dark:text-gray-400">
          $ {totalList.totalExpense}
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Net Balance
        </h5>
        <p className="font-bold text-gray-700 dark:text-gray-400">
          $ {totalList.netBalance}
        </p>
      </div>
    </div>
  );
};

export default Cards;
