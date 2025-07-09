import { useEffect, useState } from "react";
import { supabase } from "../services/supabase"; 
import { FaUsers, FaSmile, FaThumbsUp } from "react-icons/fa";

export default function Stats() {
    const [ordersCount, setOrdersCount] = useState(0);
    const [happyCustomers, setHappyCustomers] = useState(0);
    const [positiveReviews, setPositiveReviews] = useState(0);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        // Orders Completed
        const { count: orders, error: orderError } = await supabase
            .from("riwayat_pembelian")
            .select("*", { count: "exact", head: true });
        if (!orderError) setOrdersCount(orders);

        // Happy Customers (jumlah testimoni)
        const { count: customers, error: customerError } = await supabase
            .from("testimoni")
            .select("*", { count: "exact", head: true });
        if (!customerError) setHappyCustomers(customers);

        // Positive Reviews (rating = 5)
        const { count: positive, error: reviewError } = await supabase
            .from("testimoni")
            .select("*", { count: "exact", head: true })
            .eq("rating", 5);
        if (!reviewError) setPositiveReviews(positive);
    };

    const formatCount = (num) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
        return `${num}`;
    };

    return (
        <div id="dashboard-container">
            <div className="max-w-7xl mx-auto">
            <div className="p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">

                {/* Orders Completed */}
                <div className="flex items-center space-x-5 bg-softgreen rounded-lg shadow-md p-4">
                    <div className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaUsers />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-nunito-extrabold">{formatCount(ordersCount)}</span>
                        <span className="text-darkgray font-nunito-bold">Orders Completed</span>
                    </div>
                </div>

                {/* Happy Customers */}
                <div className="flex items-center space-x-5 bg-lime rounded-lg shadow-md p-4">
                    <div className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaSmile />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-nunito-extrabold">{formatCount(happyCustomers)}</span>
                        <span className="text-darkgray font-nunito-bold">Happy Customers</span>
                    </div>
                </div>

                {/* Positive Reviews */}
                <div className="flex items-center space-x-5 bg-cream rounded-lg shadow-md p-4">
                    <div className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaThumbsUp />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-nunito-extrabold">{formatCount(positiveReviews)}</span>
                        <span className="text-darkgray font-nunito-bold">Positive Reviews</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}