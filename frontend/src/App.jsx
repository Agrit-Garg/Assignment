import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import PostList from "./pages/PostList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Navbar from "./components/Navbar";
import EmailVerified from "./pages/EmailVerified";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emailverified/:id" element={<EmailVerified />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/updatepassword/:id" element={<UpdatePassword />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
