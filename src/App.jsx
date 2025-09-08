import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import NavBar from './components/NavBar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <NavBar/>
      <AppRoutes/>
    </>
  )
}

export default App
