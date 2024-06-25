import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navBar/NavBar'
import Home from './paginas/home/Home'
import Login from './paginas/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />

        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        
        <Footer />

      </BrowserRouter>

    </>
  )
}


export default App
