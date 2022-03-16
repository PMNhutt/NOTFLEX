import { ModalContext } from './Context/ModalContext'
import { useEffect, useContext } from 'react'
import './App.css';
import Main from './Components/Main'
import { BrowserView, MobileView } from 'react-device-detect';
import mobileSvg from './logo/relax.svg';

function App() {
  const modal = useContext(ModalContext)

  useEffect(() => {
    modal.showModal === true ? document.body.style.overflow = "hidden hidden" : document.body.style.overflow = "hidden auto"
  }, [modal.showModal])

  return (
    <>
      <BrowserView className="App">
        <Main />
      </BrowserView>
      <MobileView className="Mobile">
        <img src={mobileSvg} />
        <h2>Notflex mobile version in progress...</h2>
      </MobileView>
    </>
  );
}

export default App;
