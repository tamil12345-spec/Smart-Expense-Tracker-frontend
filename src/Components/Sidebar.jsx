import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AiFillPieChart } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    toggleSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-white shadow-2xl shadow-blue-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  onClick={toggleSidebar}
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>
                <a href="/" className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3" alt="Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    Smart Expense Tracker
                  </span>
                </a>
              </div>
              {user?.email && (
                <span className="hidden sm:block text-sm text-gray-600 truncate max-w-[200px]">
                  {user.email}
                </span>
              )}
            </div>
          </div>
        </nav>
        <aside
          id="logo-sidebar"
          className={`fixed shadow-2xl top-0 left-0 z-40 w-40 h-screen pt-20 transition-transform ${
            isSidebarOpen ? " -translate-x-full " : " transform-none"
          } bg-white border-r border-gray-100 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar">
          <div
            className={`h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col`}>
            <ul className="space-y-2 font-medium flex-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-blue-200" : ""
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                  }>
                  <AiFillPieChart />
                  <span className="ms-3">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/income"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-blue-200" : ""
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                  }>
                  <GiCash />
                  <span className="flex-1 ms-3 whitespace-nowrap">Income</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/expense"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-blue-200" : ""
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                  }>
                  <FaMoneyBillTrendUp />
                  <span className="flex-1 ms-3 whitespace-nowrap">Expense</span>
                </NavLink>
              </li>
            </ul>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center w-full p-2 mt-2 text-gray-900 rounded-lg hover:bg-red-100 group">
              <FiLogOut />
              <span className="ms-3">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
