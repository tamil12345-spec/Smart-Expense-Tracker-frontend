import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import IncomeExpenseProvider from "./Context/IncomeExpenseProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <IncomeExpenseProvider>
      <App />
    </IncomeExpenseProvider>
  </AuthProvider>,
);
