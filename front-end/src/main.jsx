import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { ContentProvider } from "./context/contents.context.jsx";
import { ProductProvider } from "./context/products.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
