import { BeakerIcon } from "lucide-react";
import BackButton from "./BackButton";
const CryptanalysisToolsHeader = ({isDarkMode}) => {
    return (
        <div className="flex items-center mb-6">
          <BeakerIcon className={`mr-4 w-12 h-12 transform transition-all duration-300 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h1 className="text-3xl font-bold">Cryptanalysis Tool</h1>
          <BackButton isDarkMode={isDarkMode} />
        </div>
    )
}
export default CryptanalysisToolsHeader;