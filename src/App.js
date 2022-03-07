import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Main from './Components/Main'
import { ModalContext } from './Context/ModalContext'
import { useEffect, useContext } from 'react'

function App() {
  const modal = useContext(ModalContext)

  useEffect(() => {
    modal.showModal === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  }, [modal.showModal])

  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
