import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import api from "../Services/api";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const incomeExpenseContext = createContext({});

const IncomeExpenseProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalList, setTotalList] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  //Fetching data for list
  const fetchData = async () => {
    try {
      const incomes = (await api.get("/income/get-incomes/")) || [];
      const expenses = (await api.get("/expense/get-expenses/")) || [];
      const responseIncome = incomes.data || [];
      const responseExpense = expenses.data || [];

      setExpenseData(responseExpense);
      setIncomeData(responseIncome);
      let totalIncome =
          responseIncome.length > 0
            ? responseIncome.reduce((acc, curr) => acc + +curr.amount, 0)
            : 0,
        totalExpense =
          responseExpense.length > 0
            ? responseExpense.reduce((acc, curr) => acc + +curr.amount, 0)
            : 0;

      setTotalList({
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        netBalance: totalIncome - totalExpense,
      });
    } catch (error) {
      console.error("Failed to fetch income/expense data", error);
    }
  };

  const calculateIncomeTotal = (incomeData) => {
    let totalIncome =
      incomeData.length > 0
        ? incomeData.reduce((acc, curr) => acc + +curr.amount, 0)
        : 0;
    setTotalList((prevItem) => ({
      totalIncome: totalIncome,
      totalExpense: prevItem.totalExpense,
      netBalance: totalIncome - prevItem.totalExpense,
    }));
  };

  const calculateExpenseTotal = (expenseData) => {
    let totalExpense =
      expenseData.length > 0
        ? expenseData.reduce((acc, curr) => acc + +curr.amount, 0)
        : 0;
    setTotalList((prevItem) => ({
      totalIncome: prevItem.totalIncome,
      totalExpense: totalExpense,
      netBalance: prevItem.totalIncome - totalExpense,
    }));
  };

  useEffect(() => {
    if (auth?.token) {
      fetchData();
    } else {
      setIncomeData([]);
      setExpenseData([]);
      setTotalList({
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
      });
    }
  }, [auth?.token]);

  return (
    <incomeExpenseContext.Provider
      value={{
        incomeData,
        setIncomeData,
        expenseData,
        setExpenseData,
        totalList,
        calculateIncomeTotal,
        calculateExpenseTotal,
        fetchData,
      }}>
      {children}
    </incomeExpenseContext.Provider>
  );
};

export default IncomeExpenseProvider;