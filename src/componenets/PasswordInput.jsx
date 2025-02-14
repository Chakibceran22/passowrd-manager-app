import { EyeIcon, EyeOffIcon, LockIcon } from "./SecurityIcons";

const PasswordInput = ({
  showPassword,
  isDarkMode,
  setPassword,
  password,
  setShowPassword,
}) => {
  return (
    <div className="relative">
      <label className=" mb-2 flex items-center transform transition-all duration-300">
        <LockIcon className="mr-2 w-5 h-5" />
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to hash"
          className={`w-full p-3 rounded-lg border-2 pr-10 transform transition-all duration-300 ${isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
            }`}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOffIcon className="w-6 h-6 text-gray-500" />
          ) : (
            <EyeIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};
export default PasswordInput;
