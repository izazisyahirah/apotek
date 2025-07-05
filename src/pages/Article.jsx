import { useEffect, useState } from "react";
import { article } from "../services/article";

export default function Article() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const result = await article.fetchArticles();
        setArticles(result);
      } catch (error) {
        console.error("Gagal mengambil artikel:", error);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
          Artikel Kesehatan
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Dapatkan informasi terkini seputar kesehatan dan gaya hidup sehat dari sumber terpercaya.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.judul}
                </h4>
                <div className="mt-auto">
                  <a
                    href={item.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium text-emerald-600 hover:text-emerald-800 transition"
                  >
                    Baca Selengkapnya →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}