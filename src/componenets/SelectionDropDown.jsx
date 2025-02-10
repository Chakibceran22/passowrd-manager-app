const SelectionDropDown = ({ encryptionType, encryptionMethods, isDarkMode, setEncryptionKey, setEncryptionType, setGeneratedPublicKey}) => {
    return (
        <div>
            <label className="block mb-2">Encryption Method</label>
            <select
                value={encryptionType}
                onChange={(e) => {
                    setEncryptionType(e.target.value);
                    setEncryptionKey('');
                    setGeneratedPublicKey('');
                }}
                className={`w-full p-3 rounded-lg border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-black'}`}
            >
                {encryptionMethods.map(method => (
                    <option key={method.value} value={method.value}>
                        {method.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default SelectionDropDown;