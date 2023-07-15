import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllUsers from "./component/AllUsers";
import CreateUser from "./component/CreateUser";
import MUINavbar from "./component/MUINavbar";
import MyProfile from "./component/MyProfile";
import UpdatePasswordForm from "./component/UpdatePasswordForm";
import FoodCategory from "./component/canteen/foodCategory/table/FoodCategory";
import ConfirmPassword from "./pages/ConfirmPAssword";
import ForgotPassword from "./pages/ForgotPassword";
import LoginForm from "./pages/LoginForm";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp.jsx";
import AdminsRoute from "./utils/AdminsRoute";
import CanteenRoute from "./utils/CanteenRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateFoodItem from "./component/canteen/foodItem/foodItem/CreateFoodItem";
import GenerateMenu from "./component/canteen/generateMenu/GenerateMenu";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MUINavbar />}>
          <Route path="/myprofile" element={<MyProfile />} />
          <Route element={<AdminsRoute />}>
            <Route path="/allusers" element={<AllUsers />} />
            <Route
              path="/auth/update-password"
              element={<UpdatePasswordForm />}
            />
            <Route path="/create-user" element={<CreateUser />} />

            <Route path="/view-user/:id" element={<MyProfile />} />
          </Route>
          <Route element={<CanteenRoute />}>
            <Route path="/food-category" element={<FoodCategory />} />
            <Route path="/food-item" element={<CreateFoodItem />} />
            <Route path="/generate-menu" element={<GenerateMenu />} />
          </Route>
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
