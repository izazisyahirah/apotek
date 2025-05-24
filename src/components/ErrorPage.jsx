import { AiFillBackward } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage({ code, title, message }) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-4xl w-full flex flex-col md:flex-row items-center gap-10">
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="Error"
          className="w-72 md:w-80 drop-shadow-lg"
        />

        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl animate-pulse" />
          </div>

          <h1 className="text-6xl font-bold text-gray-800 mb-2">{code}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
          <p className="text-gray-500 mt-2 mb-6">{message}</p>

          <Link
            to="/"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
          >
            <AiFillBackward className="mr-2 text-xl" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
