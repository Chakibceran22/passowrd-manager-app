import { KeyIcon } from "./SecurityIcons";

const KeyInput = ({ isDarkMode, setKey, Key, notice }) => {
  return (
    <div>
      <label className=" mb-2 flex items-center transform transition-all duration-300">
        <KeyIcon className="mr-2 w-5 h-5 " />
        {notice}
      </label>
      <input
        type="text"
        value={Key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter encryption key"
        className={`w-full p-3 rounded-lg border-2 transform transition-all duration-300 ${isDarkMode
          ? 'bg-gray-700 border-gray-600 text-white'
          : 'bg-white border-gray-300 text-black'}`}
      />
    </div>
  )
}
export default KeyInput;