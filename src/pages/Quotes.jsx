import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

export default function Quotes() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setQuote(res.data.slip.advice);
        setAuthor("Quotes of The Day");
      })
      .catch((err) => {
        setError("Gagal mengambil quote");
      });
  }, []);

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold p-4">
        {error}
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-green-100 rounded-2xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto mt-16 text-center">
      <div className="flex justify-center mb-4 text-green-600 text-4xl">
        <FaQuoteLeft />
      </div>
      {quote ? (
        <>
          <p className="text-lg md:text-xl font-medium italic text-gray-700">
            “{quote}”
          </p>
          <p className="mt-4 text-sm text-gray-500 font-light">— {author}</p>
        </>
      ) : (
        <p className="text-gray-400 animate-pulse">Loading quote...</p>
      )}
    </div>
  );
};