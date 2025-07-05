import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { faq } from "../services/faq";

export default function FAQ() {
  const [faqList, setFaqList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await faq.fetchFAQ();
        setFaqList(data);
      } catch (err) {
        console.error("Gagal mengambil data FAQ:", err);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(faqList.length / itemsPerPage);
  const paginatedFaq = faqList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="via-white to-emerald-100 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Gambar */}
        <div className="flex justify-center">
          <div className="w-100 h-112 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://i.pinimg.com/736x/70/e2/a2/70e2a2894bd5773390ab3a73071c60bf.jpg"
              alt="FAQ Apotek"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center md:text-left mb-6">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">
              Pertanyaan Umum
            </h2>
            <p className="text-sm text-gray-600 font-poppins-regular mt-1">
              Temukan jawaban atas pertanyaan umum pelanggan kami.
            </p>
          </div>

          <div className="space-y-5">
            {paginatedFaq.map((item, index) => (
              <div
                key={item.id}
                className={`relative bg-white group p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden`}
                onClick={() => handleToggle(index)}
              >
                {/* Background Icon */}
                <div className="absolute -top-4 -left-4 opacity-10 text-emerald-200 text-6xl pointer-events-none select-none">
                  <FiHelpCircle />
                </div>

                {/* Pertanyaan */}
                <div className="flex justify-between items-center z-10 relative">
                  <h4 className="text-emerald-800 font-semibold text-base group-hover:text-emerald-600 transition-colors duration-300">
                    {item.pertanyaan}
                  </h4>
                  <MdOutlineKeyboardArrowDown
                    className={`transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-emerald-600"
                        : "text-gray-400"
                    }`}
                    size={22}
                  />
                </div>

                {/* Jawaban */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-screen mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-gray-700 font-poppins-regular leading-relaxed">
                    {item.jawaban}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap text-sm">
            {/* Tombol Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full flex items-center gap-1 transition-all duration-200 font-medium shadow-sm ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              <span className="text-base">&larr;</span> <span>Sebelumnya</span>
            </button>

            {/* Nomor Halaman */}
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 font-semibold shadow-sm ${
                    currentPage === i + 1
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Tombol Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full flex items-center gap-1 transition-all duration-200 font-medium shadow-sm ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              <span>Selanjutnya</span> <span className="text-base">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
