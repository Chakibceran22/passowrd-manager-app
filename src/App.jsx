import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PasswordHasher from './componenets/PasswordHahsing'
import PasswordDecryptor from './componenets/PasswordDecryption'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SecurityLandingPage from './componenets/LandingPage'
import PasswordEncryptor from './componenets/passwordEncryptionPage'
import NotFound from './componenets/NotFoundPage'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>

    <Router>
      <Routes>
        <Route path='/' element={<SecurityLandingPage/>}></Route>
        <Route path='/hash' element={<PasswordHasher/>}></Route>
        <Route path='/decrypt' element={<PasswordDecryptor/>}></Route>
        <Route path='/encrypt' element={<PasswordEncryptor/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
   </>
  )
}

export default App
