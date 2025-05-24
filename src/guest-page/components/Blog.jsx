export default function Blog() {
  return (
    <div id="news-blog-container" className="p-6">
      <h2 className="text-2xl font-nunito-bold text-center mb-8">
        Our Latest News & Blogs
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Blog Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://static1.squarespace.com/static/5f64c5c0089e7a2b75f39878/6017b94b45eb9438ae60f0d2/60e595a8be1a8f5a7f8b82a0/1720204255570/shutterstock_1898898127.jpg?format=1500w"
            alt="Blog 1"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-3 text-sm text-gray-500 font-poppins-regular">
              <span className="bg-green-100 text-darkgreen px-2 py-1 rounded">
                Doctor
              </span>
              <span>24 Dec, 2023</span>
            </div>
            <h3 className="text-xl font-nunito-bold">
              In this section, we delve into various aspects of health
            </h3>
            <p className="text-gray-600 text-sm font-poppins-regular">
              Explore the world of medical specialties through our blog’s
              spotlight feature. From cardiology to pediatrics, we share
              in-depth articles written by our expert physicians.
            </p>
            <button className="font-poppins-regular bg-green hover:bg-darkgreen text-white text-sm px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Side Blog Cards */}
        <div className="space-y-4">
          {/* Blog Card */}
          {[
            {
              img: "https://www.woosterhospital.org/wp-content/uploads/sites/229/2023/11/iStock-1406691824-1.jpg",
              title:
                "Discover a treasure trove of practical tips for enhancing",
              excerpt:
                "From nutrition advice to exercise routines, we’re here to support your journey toward a healthier...",
            },
            {
              img: "https://aayush-hospitals.com/wp-content/uploads/2023/02/General-Medicine.png",
              title:
                "Our patients’ journeys are filled with courage, resilience, and triumph.",
              excerpt:
                "In this section, we share inspiring narratives of individuals who have overcome health challenges...",
            },
            {
              img: "https://arthritisaustralia.com.au/wordpress/wp-content/uploads/2021/02/shutterstock_1504130624.jpg",
              title:
                "From organizing health fairs to partnering with local organizations",
              excerpt:
                "Find out how you can participate in community events and contribute to the health...",
            },
          ].map((blog, index) => (
            <div
              key={index}
              className="flex bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="w-[100px] h-100px] overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={blog.img}
                  alt={`Blog ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div className="flex items-center space-x-3 text-sm text-gray-500 font-poppins-regular">
                  <span className="bg-green-100 text-dargreen px-2 py-1 rounded">
                    Doctor
                  </span>
                  <span>24 Dec, 2023</span>
                </div>
                <h4 className="font-nunito-bold text-sm mt-1">{blog.title}</h4>
                <p className="font-poppins-regular text-gray-600 text-xs mt-1">
                  {blog.excerpt}
                </p>
                <button className="font-poppins-regular bg-green hover:bg-darkgreen text-white text-xs px-3 py-1 rounded mt-2 self-start">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
