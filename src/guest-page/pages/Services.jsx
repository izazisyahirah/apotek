import { FaTag, FaTruck, FaUserMd, FaStethoscope, FaChevronRight } from "react-icons/fa";

export default function Services() {
    return (
        <div id="service-highlights-container">
            <div id="service-highlights-grid" className="p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Get 25% OFF */}
                <div className="flex justify-between items-center bg-softgreen rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center space-x-2">
                        <FaTag className="text-xl" />
                        <div className="text-xl font-nunito-bold">Get 25%<br />OFF</div>
                    </div>
                    <FaChevronRight className="text-darkgray text-sm" />
                </div>

                {/* Free Home Delivery */}
                <div className="flex justify-between items-center bg-cream rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center space-x-2">
                        <FaTruck className="text-xl" />
                        <div className="text-xl font-nunito-bold">Free Home<br />Delivery</div>
                    </div>
                    <FaChevronRight className="text-darkgray text-sm" />
                </div>

                {/* Doctor's Appointment */}
                <div className="flex justify-between items-center bg-lime rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center space-x-2">
                        <FaUserMd className="text-xl" />
                        <div className="text-xl font-nunito-bold">Doctor's<br />Appointment</div>
                    </div>
                    <FaChevronRight className="text-darkgray text-sm" />
                </div>

                {/* Health Advice */}
                <div className="flex justify-between items-center bg-softpurple rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center space-x-2">
                        <FaStethoscope className="text-xl" />
                        <div className="text-xl font-nunito-bold">Health<br />Advice</div>
                    </div>
                    <FaChevronRight className="text-darkgray text-sm" />
                </div>

            </div>
        </div>
    );
}
