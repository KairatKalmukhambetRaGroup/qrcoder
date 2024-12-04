import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import ActivateAccount from "./components/ActivateAccount";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Security from "./components/Profile/Security";
import Settings from "./components/Profile/Settings";
import Create from "./components/QR/Create";
import Edit from "./components/QR/Edit";
import Item from "./components/QR/Item";
import Signup from "./components/Signup";
import WelcomePage from "./components/WelcomePage/index";

import './styles/index.scss';
import Restore from "./components/Restore";
import ResetPassword from "./components/ResetPassword";


import { UserProvider } from "./contexts/UserContext";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* <Route path="admin" element={
            <>
              <Outlet />
            </>
            } 
          >
            <Route path="dashboard/:page?" exact element={<AdminDashboard />} />
          </Route> */}
          <Route path="/" element={<>
            <Header />
            <main>          
              <Outlet />
            </main>
            <Footer />
          </>}>
            <Route path="" exact element={<WelcomePage />} />
            <Route path="qr" element={<Outlet />}>
              <Route path="edit/:link" element={<Edit/>} />
              <Route path="new" element={<Create />} />
              <Route path=":link" element={<Item/>} />
            </Route>
            <Route path="main/:page?" exact element={<Main />} />
            <Route path="profile" element={<Profile />} >
              <Route path="" exact element={<Settings />} />
              <Route path="security" exact element={<Security />} />
            </Route> 
            <Route path="login" exact element={<Outlet />} >
              <Route path="" exact element={<Login />} />
              <Route path="restore" exact element={<Restore />} />
            </Route> 
            <Route path="signup" exact element={<Signup />} /> 
            <Route path="activate/:link" element={<ActivateAccount />} />
            <Route path="reset/:id" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
