export default function Card({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-cyan-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition duration-300 hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 border-b pb-2">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
