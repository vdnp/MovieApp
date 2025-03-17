import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={5} color="blue" />
    <StarRating maxRating={10} size={60} color="#ff2fa4" /> */}
  </StrictMode>
);
