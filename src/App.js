import { ModalContext } from './Context/ModalContext'
import { useEffect, useContext } from 'react'
import './App.css';
import Main from './Components/Main'
import { BrowserView, MobileView } from 'react-device-detect';
import lottie from "lottie-web/build/player/lottie_light";
import responsiveLogo from "./logo/responsive.json";

function App() {
  const modal = useContext(ModalContext)

  useEffect(() => {
    modal.showModal === true ? document.body.style.overflow = "hidden hidden" : document.body.style.overflow = "hidden auto"
  }, [modal.showModal])

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#res-logo"),
      animationData: responsiveLogo,
    });
  }, [])

  return (
    <>
      <BrowserView className="App">
        <Main />
      </BrowserView>
      <MobileView className="Mobile">
        <div id="res-logo" />
        <h2>Notflex mobile version in progress...</h2>
      </MobileView>
    </>
  );
}

export default App;
