import { LockIcon } from './SecurityIcons';


const SaltInput = ({isDarkMode, salt, setSalt}) => {
    return(<div>
                <label className="block mb-2 flex items-center">
                  <LockIcon className="mr-2 w-5 h-5" />
                  Salt (Optional)
                </label>
                <input 
                  type="text"
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="Add extra security with a salt"
                  className={`w-full p-3 rounded-lg border-2 ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'}`}
                />
              </div>)
}
export default SaltInput;