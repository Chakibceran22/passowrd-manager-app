import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PasswordHasher from './componenets/PasswordHahsing'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <PasswordHasher/>
   </>
  )
}

export default App
