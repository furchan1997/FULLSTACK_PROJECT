import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ZodiacsSigns from "./pages/zodiacSigns";
import HomePage from "./pages/homePage";
import Horoscops from "./pages/horoscops";
import UserMe from "./pages/userMe";
import UserUpdate from "./pages/userUpdate";
import ChangeUserPassword from "./pages/userUpdatePassword";
import Users from "./pages/admin/users";
import AdminPanel from "./pages/admin/adminPanel";
import ProtectedRouts from "./components/common/prodectedRouts";
import UserDetalis from "./pages/admin/userDetalis";
import Horoscop from "./pages/horoscop";
import CreateHoroscop from "./pages/admin/createHoroscop";
import UpdateHoroscop from "./pages/admin/updateHoroscop";
import Favorite from "./pages/favorite";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import About from "./components/about";
import Regulations from "./components/regulations";

// רכיב ראשי , כאן מוצגים כל הרכיבים של האפליקציה
function App() {
  return (
    <>
      <div className={"app min-vh-100 d-flex flex-column"}>
        {" "}
        <header>
          <NavBar />
        </header>
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/horoscops" element={<Horoscops />} />
            <Route path="/zodiacs-signs" element={<ZodiacsSigns />} />

            <Route
              path="/update-user/:id"
              element={
                <ProtectedRouts>
                  <UserUpdate />
                </ProtectedRouts>
              }
            />

            <Route
              path="/my-account/:id"
              element={
                <ProtectedRouts>
                  <UserMe />
                </ProtectedRouts>
              }
            />

            <Route
              path="/change-password/:id"
              element={
                <ProtectedRouts>
                  <ChangeUserPassword />
                </ProtectedRouts>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRouts isAdmin>
                  <AdminPanel />
                </ProtectedRouts>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRouts isAdmin>
                  <Users />
                </ProtectedRouts>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRouts isAdmin>
                  <UserDetalis />
                </ProtectedRouts>
              }
            />

            <Route
              path="/horoscops/:id"
              element={
                <ProtectedRouts>
                  <Horoscop />
                </ProtectedRouts>
              }
            />
            <Route
              path="/admin/create-horoscop"
              element={
                <ProtectedRouts isAdmin>
                  <CreateHoroscop />
                </ProtectedRouts>
              }
            />
            <Route
              path="/admin/update-horoscop/:id"
              element={
                <ProtectedRouts isAdmin>
                  <UpdateHoroscop />
                </ProtectedRouts>
              }
            />
            <Route
              path="/favorite/:id"
              element={
                <ProtectedRouts>
                  <Favorite />
                </ProtectedRouts>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/regulations" element={<Regulations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
