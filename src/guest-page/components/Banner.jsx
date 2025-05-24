import { FaArrowRight } from "react-icons/fa";

export default function Banner() {
    return (
        <div id="promo-banner-container">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gray-50 p-8 rounded-lg shadow-md">
                {/* Left Text Side */}
                <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
                    <p className="text-sm font-nunito-bold text-gray-500">Todays Hot Offer</p>
                    <h2 className="text-3xl font-nunito-extrabold text-gray-900 leading-snug">
                        Unlock 50% Off on <br /> <span className="text-black">Essential Medicines!</span>
                    </h2>
                    <p className="text-gray-600 text-sm font-poppins-regular">
                        Embrace wellness without breaking the bank! Enjoy a generous 25% discount on a wide range of vital medicines at our online pharmacy. Your health matters, and so does your budget.
                    </p>
                    <button className="mt-3 inline-flex items-center space-x-2 bg-green hover:bg-darkgreen text-white font-nunito-bold px-5 py-3 rounded-lg text-sm transition">
                        <span>Place An Order Now</span>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Right Image Side */}
                <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/022/923/884/non_2x/pastel-color-medicine-pills-pills-flying-up-out-of-tablet-capsule-3d-rendering-pharmacy-concept-drugs-awareness-free-png.png"
                        alt="Promo Capsule"
                        className="max-w-xs lg:max-w-md bg-transparent"
                    />
                </div>
            </div>
        </div>
    );
}
