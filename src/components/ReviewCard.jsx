import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { FaStar } from "react-icons/fa";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data: testimoniData, error } = await supabase
        .from("testimoni")
        .select("id, quote, rating, pelanggan_id")
        .eq("rating", 5)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Gagal ambil testimoni:", error.message);
        return;
      }

      const detailPromises = testimoniData.map(async (item) => {
        const { data: pelangganData, error: pelangganError } = await supabase
          .from("pelanggan")
          .select("nama, foto_profil")
          .eq("id", item.pelanggan_id)
          .single();

        if (pelangganError) {
          console.warn("Gagal ambil nama pelanggan:", pelangganError.message);
          return null;
        }

        return {
          nama: pelangganData.nama,
          foto_profil: pelangganData.foto_profil,
          quote: item.quote,
          rating: item.rating,
        };
      });

      const finalData = (await Promise.all(detailPromises)).filter((r) => r !== null);
      setReviews(finalData);
    };

    fetchTestimoni();
  }, []);

  if (reviews.length === 0) {
    return <div className="p-4 text-gray-500">Belum ada testimoni.</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-nunito-bold text-center mb-6">Apa Kata Mereka?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const profileImage = review.foto_profil || "/avatar-default.png";

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex gap-4 border border-green-500 hover:shadow-md transition">
      <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border border-gray-300">
        <img
          src={profileImage}
          alt={review.nama}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between min-w-0">
        <h4 className="text-lg font-nunito-bold text-black mb-1">{review.nama}</h4>
        <div className="flex items-center text-yellow-500 text-sm mb-2">
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p className="text-gray-700 text-sm font-poppins-regular">“{review.quote}”</p>
      </div>
    </div>
  );
}