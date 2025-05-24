import { createRoot } from "react-dom/client";
import ProductList from "./ProductList";
import "./tailwind.css";

createRoot(document.getElementById("root")).render (
    <div>
        <ProductList/>
    </div>
)