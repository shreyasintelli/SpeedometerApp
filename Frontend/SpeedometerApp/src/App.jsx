import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Speedometer from './Speedometer'

function App() {
  const [count, setCount] = useState(0)

  return (
<Speedometer></Speedometer>
  )
}

export default App
