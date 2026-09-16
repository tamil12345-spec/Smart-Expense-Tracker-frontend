import React, { useContext } from "react";
import { incomeExpenseContext } from "../Context/IncomeExpenseProvider";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import noData from "../assets/no-data.png";

const Dashboard = () => {
  const { totalList, expenseData } = useContext(incomeExpenseContext);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  let foodTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) => (curr.category === "food" ? acc + +curr.amount : acc),
          0
        )
      : 0;

  let travelTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) =>
            curr.category === "travel" ? acc + +curr.amount : acc,
          0
        )
      : 0;
  let billTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) => (curr.category === "bill" ? acc + +curr.amount : acc),
          0
        )
      : 0;
  let othersTotal =
    expenseData.length > 0
      ? expenseData.reduce(
          (acc, curr) =>
            curr.category === "others" ? acc + +curr.amount : acc,
          0
        )
      : 0;
  const chartData = [
    { name: "Food", value: foodTotal },
    { name: "Travel", value: travelTotal },
    { name: "Bill", value: billTotal },
    { name: "others", value: othersTotal },
  ];

  const renderCustomizedLabel = ({ name, value }) => {
    if (value === 0) return null;
    return `${name}: ${value}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
      <div className="col-span-2 bg-white rounded-lg shadow-2xl w-full h-full">
        <h1 className="text-2xl font-bold text-center mt-4">
          Expenses by Category
        </h1>
        {totalList.totalExpense > 0 ? (
          <ResponsiveContainer width="100%" height={450} className="p-5">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false} // Optional: hide the lines connecting labels to slices
                label={renderCustomizedLabel} // Your custom label function
                outerRadius={150}
                fill="#8884d8"
                dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col justify-start items-center mt-5 w-full">
            <h1 className="text-lg font-semibold text-gray-500 p-5">
              No expenses yet. Add some expense to see the chart!
            </h1>
            <img
              className="h-30 w-30 m-5 sm:h-40 sm:w-40 "
              src={noData}
              alt="No Data"
            />
          </div>
        )}
      </div>
      <div className="col-span-1 gap-1 grid grid-cols-2 sm:grid-cols-1 text-center">
        <div className="max-w-lg  sm:max-w-xs flex flex-col justify-center items-center  bg-blue-400 border border-gray-200 rounded-lg shadow-sm hover:bg-blue-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-1 text-lg sm:text-xl  font-bold tracking-tight text-gray-900 dark:text-white">
            Food
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            ${foodTotal}
          </p>
        </div>
        <div className="max-w-lg sm:max-w-xs  flex flex-col justify-center items-center bg-green-400 border border-gray-200 rounded-lg shadow-sm hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Travel
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            ${travelTotal}
          </p>
        </div>
        <div className="max-w-lg sm:max-w-xs  flex flex-col justify-center items-center bg-yellow-300 border border-gray-200 rounded-lg shadow-sm hover:bg-yellow-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bill
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            ${billTotal}
          </p>
        </div>
        <div className="max-w-lg sm:max-w-xs  flex flex-col justify-center items-center bg-orange-300 border border-gray-200 rounded-lg shadow-sm hover:bg-orange-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Other
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            ${othersTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;