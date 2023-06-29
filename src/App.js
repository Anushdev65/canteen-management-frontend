import "./App.css";
import ConfirmPassword from "./pages/ConfirmPAssword";
import SignUp from "./pages/SignUp.jsx";
import LoginForm from "./pages/LoginForm";
import { Route, Routes } from "react-router-dom";
import MUINavbar from "./component/MUINavbar";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MyProfile from "./component/MyProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AllUsers from "./component/AllUsers";
import UpdatePasswordForm from "./component/UpdatePasswordForm";
import CreateUser from "./component/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<MUINavbar />}>
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route
            path="/auth/update-password"
            element={<UpdatePasswordForm />}
          />
          <Route path="/create-user" element={<CreateUser />} />
        </Route>
      </Route>
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/confirm-email" element={<ConfirmPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
