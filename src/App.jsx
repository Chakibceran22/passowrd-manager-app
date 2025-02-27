
import './App.css'
import PasswordHasher from './componenets/PasswordHahsing'
import PasswordDecryptor from './pages/PasswordDecryption'
import PasswordEncryptor from './pages/passwordEncryptionPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SecurityLandingPage from './pages/LandingPage'
import NotFound from './componenets/NotFoundPage'
import CryptanalysisTools from './pages/FrequencyAnalysisPage'
function App() {

  return (
   <>

    <Router>
      <Routes>
        <Route path='/' element={<SecurityLandingPage/>}></Route>
        <Route path='/hash' element={<PasswordHasher/>}></Route>
        <Route path='/decrypt' element={<PasswordDecryptor/>}></Route>
        <Route path='/encrypt' element={<PasswordEncryptor/>}></Route>
        <Route path='/frequency' element={<CryptanalysisTools/>}/>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
   </>
  )
}

export default App
