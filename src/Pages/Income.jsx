import React, { useContext, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import IncomeForm from "../Components/IncomeForm";
import { incomeExpenseContext } from "../Context/IncomeExpenseProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noData from "../assets/no-data.png";
import api from "../Services/api";

const Income = () => {
  const { incomeData, setIncomeData, calculateIncomeTotal } =
    useContext(incomeExpenseContext);
  const [data, setData] = useState({});

  //Edit
  const handleEdit = (id) => {
    const editData = { ...incomeData[id], id: id };
    setData(editData);
  };

  //Delete
  const handleDelete = (id) => {
    const newIncomeData = incomeData.filter((item, index) => index !== id);
    localStorage.setItem("incomes", JSON.stringify(newIncomeData));
    toast.info("Deleted Successfully", {
      autoClose: 3000,
    });
    setIncomeData([...newIncomeData]);
    calculateIncomeTotal([...newIncomeData]);
  };

  //Submit
  const handleSubmitForm = async (updatedData) => {
    let toastMessage = "";

    try {
      if (updatedData._id) {
        // ✅ UPDATE
        const response = await api.put(
          `/income/update-income/${updatedData._id}`,
          {
            amount: updatedData.amount,
            date: updatedData.date,
            note: updatedData.note,
          },
        );

        // ✅ Update state immutably
        const updatedList = incomeData.map((item) =>
          item._id === updatedData._id ? { ...item, ...updatedData } : item,
        );

        setIncomeData(updatedList);
        calculateIncomeTotal(updatedList); // ✅ pass the new array directly

        toastMessage = response?.data?.message || "Updated Successfully";
      } else {
        // ✅ ADD
        const response = await api.post(`/income/add-income/`, {
          amount: updatedData.amount,
          date: updatedData.date,
          note: updatedData.note,
        });

        // ✅ Get new data from backend
        const newIncome = response?.data?.data || updatedData;
        const updatedList = [...incomeData, newIncome];

        setIncomeData(updatedList);
        calculateIncomeTotal(updatedList); // ✅ pass the new array directly

        toastMessage = response?.data?.message || "Added Successfully";
      }

      toast.success(toastMessage, {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {data.id === undefined ? (
          <IncomeForm handleSubmitForm={handleSubmitForm} />
        ) : (
          <IncomeForm data={data} handleSubmitForm={handleSubmitForm} />
        )}
        <div className="bg-white col-span-2 xs:h-80 lg:h-auto lg:mx-h-screen  overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          {incomeData.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
              <thead className="text-sm text-gray-950 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Notes
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
                {incomeData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white font-semibold text-sm text-gray-900 dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item.note}</td>
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
            <div className="flex flex-col justify-center items-center h-full w-full">
              <h1 className="text-xl font-semibold text-gray-500">No Data!</h1>
              <img className="h-20 w-20 m-5" src={noData} alt="No Data" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Income;