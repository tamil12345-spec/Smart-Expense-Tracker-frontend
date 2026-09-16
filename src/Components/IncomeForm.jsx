import React, { useEffect, useState } from "react";

const IncomeForm = ({ data, handleSubmitForm }) => {
  const initialData = {
    amount: "",
    date: "",
    note: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!data) {
      setFormData(data);
      setIsEditMode(true);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitForm(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData(initialData);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        className="max-w-full col-span-1 shadow-2xl bg-white p-5 rounded-lg"
        onSubmit={handleSubmit}>
        <h1 className="text-2xl  mb-4 font-bold">
          {isEditMode ? "Edit Income" : "Add Income"}
        </h1>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter the Amount"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Note
          </label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Note"
          />
        </div>
        <div className="flex gap-2 justify-end items-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
            {isEditMode ? "Update" : "Submit"}
          </button>
          <button
            type="reset"
            onClick={handleReset}
            className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default IncomeForm;
