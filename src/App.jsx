import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChessBoard from "./components/ChessBoard";
import "./App.css";
function App() {
  return (
    <>
    <div className="app">
      <ChessBoard />
    </div>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
      />
    </>
  );
}

export default App;