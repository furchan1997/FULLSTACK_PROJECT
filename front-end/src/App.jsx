import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ZodiacsSigns from "./pages/zodiacSigns";
import HomePage from "./pages/homePage";
// import Horoscops from "./pages/horoscops";
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
import HoroscopPage from "./pages/horoscopPage";
import HoroscopZodiac from "./pages/horoscopZodiac";
import MyServices from "./pages/myServices";
import OpeningCards from "./pages/serviceType/OpeningCards";
import Astrologicalmap from "./pages/serviceType/astrologicalMap";
import LeadCleaning from "./pages/serviceType/leadCleaning";
import Inbox from "./pages/admin/Inbox";
import Shop from "./pages/products/shop";
import AllProducts from "./pages/products/allProducts";
import SingleProduct from "./pages/products/singleProduct";
import NumerologicalCalculation from "./pages/numerology/numerologicalClculation";
import CategoryProduct from "./pages/products/categoryProduct";
import CreateProduct from "./pages/products/createProduct";
import UpdateProduct from "./pages/products/updateProduct";
import React from "react";
import { MarginalComponent } from "./components/common/lazyComponents";
// רכיב ראשי , כאן מוצגים כל הרכיבים של האפליקציה
function App() {
  const loction = useLocation();
  const mbForComponents =
    loction.pathname === "/" ||
    loction.pathname === "/zodiacs-signs" ||
    loction.pathname.startsWith("/horoscop-page/") ||
    loction.pathname === "/numerological-calculation";

  return (
    <>
      <div className={"app min-vh-100 d-flex flex-column"}>
        {" "}
        <header>
          <NavBar />
        </header>
        <main
          className={`${mbForComponents ? "flex-fill " : "flex-fill mb-2"}`}
        >
          <Routes>
            <Route path="/" element={<MarginalComponent name={"homePage"} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />

            <Route path="/horoscop-page" element={<HoroscopPage />} />

            <Route
              path="/horoscop-page/:sign"
              element={
                <ProtectedRouts>
                  <HoroscopZodiac />
                </ProtectedRouts>
              }
            />

            <Route
              path="/horoscops/:sign/:id"
              element={
                <ProtectedRouts>
                  <Horoscop />
                </ProtectedRouts>
              }
            />

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
                  <MarginalComponent name="adminPanel" />
                </ProtectedRouts>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRouts isAdmin>
                  <MarginalComponent name={"users"} />
                </ProtectedRouts>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRouts isAdmin>
                  <MarginalComponent name={"userDetalis"} />
                </ProtectedRouts>
              }
            />

            <Route
              path="/admin/create-horoscop"
              element={
                <ProtectedRouts isAdmin>
                  <MarginalComponent name={"createHoroscop"} />
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
              path="/admin/inbox"
              element={
                <ProtectedRouts isAdmin>
                  <Inbox />
                </ProtectedRouts>
              }
            ></Route>
            <Route
              path="/admin/create-product"
              element={
                <ProtectedRouts isAdmin>
                  <CreateProduct />
                </ProtectedRouts>
              }
            ></Route>
            <Route
              path="/admin/update-product/:id"
              element={
                <ProtectedRouts isAdmin>
                  <UpdateProduct />
                </ProtectedRouts>
              }
            ></Route>

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
            <Route path="/My-services" element={<MyServices />} />
            <Route
              path="/My-services/openin-cards"
              element={<OpeningCards />}
            />
            <Route
              path="/My-services/Astrological-map"
              element={<Astrologicalmap />}
            />
            <Route
              path="/My-services/Lead-cleaning"
              element={<LeadCleaning />}
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/products" element={<AllProducts />} />
            <Route
              path="/shop/products/category/:category"
              element={<CategoryProduct />}
            />
            <Route path="/shop/products/item/:id" element={<SingleProduct />} />

            <Route
              path="/numerological-calculation"
              element={
                <ProtectedRouts>
                  <NumerologicalCalculation />
                </ProtectedRouts>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
