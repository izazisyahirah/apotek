import { FaUsers, FaMedal, FaSmile, FaThumbsUp } from "react-icons/fa";

export default function Stats() {
    return (
        <div id="dashboard-container">
            <div id="dashboard-grid" className="p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* Orders Completed */}
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-softgreen rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaUsers />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-nunito-extrabold">14K+</span>
                        <span id="orders-text" className="text-darkgray font-nunito-bold">Orders Completed</span>
                    </div>
                </div>

                {/* Won Awards */}
                <div id="dashboard-awards" className="flex items-center space-x-5 bg-cream rounded-lg shadow-md p-4">
                    <div id="awards-icon" className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaMedal />
                    </div>
                    <div id="awards-info" className="flex flex-col">
                        <span id="awards-count" className="text-2xl font-nunito-extrabold">250+</span>
                        <span id="awards-text" className="text-darkgray font-nunito-bold">Won Awards</span>
                    </div>
                </div>

                {/* Happy Customers */}
                <div id="dashboard-customers" className="flex items-center space-x-5 bg-lime rounded-lg shadow-md p-4">
                    <div id="customers-icon" className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaSmile />
                    </div>
                    <div id="customers-info" className="flex flex-col">
                        <span id="customers-count" className="text-2xl font-nunito-extrabold">8K+</span>
                        <span id="customers-text" className="text-darkgray font-nunito-bold">Happy Customers</span>
                    </div>
                </div>

                {/* Positive Reviews */}
                <div id="dashboard-reviews" className="flex items-center space-x-5 bg-softpurple rounded-lg shadow-md p-4">
                    <div id="reviews-icon" className="bg-white rounded-full p-4 text-3xl text-black">
                        <FaThumbsUp />
                    </div>
                    <div id="reviews-info" className="flex flex-col">
                        <span id="reviews-count" className="text-2xl font-nunito-extrabold">12K+</span>
                        <span id="reviews-text" className="text-darkgray font-nunito-bold">Positive Reviews</span>
                    </div>
                </div>

            </div>
        </div>
    );
}