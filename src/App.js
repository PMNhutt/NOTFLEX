import { ModalContext } from './Context/ModalContext'
import { useEffect, useContext } from 'react'
import './App.css';
import Main from './Components/Main'

function App() {
  const modal = useContext(ModalContext)

  useEffect(() => {
    modal.showModal === true ? document.body.style.overflow = "hidden hidden" : document.body.style.overflow = "hidden auto"
  }, [modal.showModal])

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
