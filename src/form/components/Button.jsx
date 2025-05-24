export default function Button({ lable, onClick }) {
    return (
      <button
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
        onClick={onClick}
        >
        {lable}
      </button>
    );
  }