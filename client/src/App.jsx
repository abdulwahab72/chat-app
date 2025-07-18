import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import HomePage from "./pages/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
