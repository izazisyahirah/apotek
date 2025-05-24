export default function Input({lable, type, placeholder, onChange}) {
    return (
        <div className="mb-3">
            <lable className="block text-gray-700 font-medium mb-1">{lable}</lable>
            <input 
            type={type} 
            placeholder={placeholder} 
            onChange={onChange} 
            className="w-full p-2 border border-gray-300 rounded"/>
        </div>
    )
}