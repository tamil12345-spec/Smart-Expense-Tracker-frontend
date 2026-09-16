import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import ExpenseForm from "../Components/ExpenseForm";
import useFilteredData from "../Components/useFilteredData";
import { useContext } from "react";
import { incomeExpenseContext } from "../Context/IncomeExpenseProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noData from "../assets/no-data.png";
import api from "../Services/api";

const Expense = () => {
  const { expenseData, setExpenseData, calculateExpenseTotal } =
    useContext(incomeExpenseContext);

  const [editData, setEditData] = useState({});
  const [filters, setFilters] = useState({
    category: "",
    amountRange: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredData = useFilteredData(expenseData, filters) || [];

  const handleEdit = (id) => {
    const temp = { ...expenseData[id], id: id };
    setEditData(temp);
  };

  const handleDelete = (id) => {
    const newExpenseData = expenseData.filter((item, index) => index !== id);
    localStorage.setItem("expenses", JSON.stringify(newExpenseData));
    toast.info("Deleted Successfully", {
      autoClose: 3000,
    });
    setExpenseData([...newExpenseData]);
    calculateExpenseTotal([...newExpenseData]);
  };

  //Submit
  const handleSubmitForm = async (updatedData) => {
    let toastMessage = "";

    try {
      if (updatedData._id) {
        // ✅ UPDATE
        const response = await api.put(
          `/expense/update-expense/${updatedData._id}`,
          {
            amount: updatedData.amount,
            category: updatedData.category,
            date: updatedData.date,
            note: updatedData.note,
          },
        );

        // ✅ Update state properly
        const updatedList = expenseData.map((item) =>
          item._id === updatedData._id ? { ...item, ...updatedData } : item,
        );

        setExpenseData(updatedList);

        toastMessage = response?.data?.message || "Updated Successfully";
      } else {
        // ✅ ADD
        const response = await api.post(`/expense/add-expense/`, {
          amount: updatedData.amount,
          category: updatedData.category,
          date: updatedData.date,
          note: updatedData.note,
        });

        // ✅ Add new item from backend response
        const newExpense = response?.data?.data || updatedData;

        setExpenseData((prev) => [...prev, newExpense]);

        toastMessage = response?.data?.message || "Added Successfully";
      }

      toast.success(toastMessage, {
        autoClose: 3000,
      });

      calculateExpenseTotal(); // no need to pass state if it uses latest
    } catch (error) {
      console.log("Error", error);
    }
  };

  //filter reset
  const handleFilterReset = () => {
    setFilters({
      category: "",
      amountRange: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="mt-5 grid grid-cols-1  lg:grid-cols-3 gap-3">
        {editData.id === undefined ? (
          <ExpenseForm handleSubmitForm={handleSubmitForm} />
        ) : (
          <ExpenseForm data={editData} handleSubmitForm={handleSubmitForm} />
        )}

        <div className="bg-white w-full col-span-2  max-h-screen  shadow-md sm:rounded-lg overflow-y-auto">
          <form className="m-3 mb-5 sm:mb-0 border-b relative sm:border-none grid grid-cols-1 sm:grid-col-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 pb-3">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, category: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">All</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="bill">Bill</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Range
              </label>
              <select
                value={filters.amountRange}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, amountRange: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">All</option>
                <option value="0-50">0-50</option>
                <option value="50-100">50-100</option>
                <option value="100-500">100-500</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateTo: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-2 flex items-end  md:items-center justify-center">
              <button
                type="reset"
                onClick={handleFilterReset}
                className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                Reset
              </button>
            </div>
          </form>
          {filteredData.length > 0 ? (
            <table className="w-full relative text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 overflow-x-auto">
              <thead className="text-sm text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white font-semibold text-sm text-gray-900 dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item.note}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4 font-bold ">$ {item.amount}</td>
                      <td className="px-6 py-4 flex gap-3 items-center">
                        <span
                          className="font-medium text-2xl cursor-pointer"
                          onClick={() => handleEdit(index)}>
                          <TiEdit />
                        </span>
                        <span
                          className="font-medium text-xl cursor-pointer"
                          onClick={() => handleDelete(index)}>
                          <FaTrashCan />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-start items-center mt-10 w-full">
              <h1 className="text-xl font-semibold text-gray-500">No Data!</h1>
              <img className="h-20 w-20 m-5" src={noData} alt="No Data" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Expense;
