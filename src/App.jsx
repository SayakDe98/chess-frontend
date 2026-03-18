import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ChessBoard from "./pages/ChessBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import "./App.css";

const toastStyle = {
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  color: "#2e1065",
  border: "1px solid rgba(167, 139, 250, 0.35)",
  borderRadius: "14px",
  boxShadow: "0 8px 32px rgba(109, 40, 217, 0.18)",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "13px",
  fontWeight: "500",
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<ChessBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
          toastStyle={toastStyle}
          style={{ top: "24px" }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
