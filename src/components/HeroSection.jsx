export default function Hero() {
  return (
    <section className="bg-darkgreen text-white px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="w-full md:w-4/5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito-extrabold leading-snug mb-4">
            Your Prescription for Affordable Health Solutions!
          </h1>
          <p className="mb-6 text-gray-300 text-sm text-poppins-regular sm:text-base">
            Elevate your health journey with exclusive discounts and unparalleled convenience. Your path to well-being starts here.
          </p>
          <button className="bg-white text-darkgreen font-nunito-semibold px-5 py-3 rounded-lg hover:bg-green-100 transition">
            Start Shopping
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-a-girl-character-clip-art-in-doctor-s-coat-png-image_11388883.png"
            alt="Doctor"
            className="w-64 sm:w-80 md:w-full max-w-md h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
