import { createRoot } from 'react-dom/client'
import ProdukForm from './ProdukForm';
import CustomerForm from './CustomerForm';
import "./tailwind.css";

createRoot(document.getElementById("root")).render (
    <div>
        <ProdukForm/>
        <CustomerForm/>
    </div>
)