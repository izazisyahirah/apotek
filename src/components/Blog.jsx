import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("artikel")
        .select("judul, link_url, gambar")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Gagal mengambil artikel:", error.message);
        return;
      }

      setArticles(data);
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
    <div
      id="news-blog-container"
      className="px-6 py-10 bg-gradient-to-r from-green-100 to-white p-8 rounded-lg shadow-md"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-nunito-bold text-center mb-8 text-gray-800">
          Artikel & Info Kesehatan
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Blog Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={mainArticle.gambar}
              alt={mainArticle.judul}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-nunito-bold text-gray-900">
                {mainArticle.judul}
              </h3>
            </div>
          </div>

          {/* Side Blog Cards */}
          <div className="space-y-4">
            {sideArticles.map((article, index) => (
              <div
                key={index}
                className="flex bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-[100px] h-[100px] overflow-hidden rounded-md flex-shrink-0">
                  <img
                    src={article.gambar}
                    alt={article.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <h4 className="font-nunito-bold text-sm text-gray-800">{article.judul}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}