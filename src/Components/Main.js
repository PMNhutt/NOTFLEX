import { Routes, Route } from 'react-router-dom';
import { useState, useContext } from 'react'
import { useLocation } from "react-router"
import { AnimatePresence } from 'framer-motion'
import { ModalContext } from '../Context/ModalContext'
import Home from '../Pages/Home';
import TVShows from '../Pages/TVShows';
import Movies from '../Pages/Movies';
import ScrollToTop from '../Components/ScrollToTop'
import Modal from './Modal/Modal'
import VerifyPIN from '../Pages/Verify/VerifyPIN'

function Main() {
  const location = useLocation()

  const modal = useContext(ModalContext)

  // const [showModal, setShowModal] = useState(false)

  return (
    <ScrollToTop>
      <Modal showModal={modal.showModal} setShowModal={modal.setShowModal} />
      <AnimatePresence exitBeforeEnter onExitComplete={() => modal.setShowModal(false)}>
        <Routes location={location} key={location.key}>
          
          <Route path="/" element={
            <VerifyPIN />
          }
          />

          <Route path="/home" element={
            <Home
              title="Home - Notflex"
              setShowModal={modal.setShowModal}
              showModal={modal.showModal}
            />
          }
          />

          <Route path="/tvshows" element={
            <TVShows
              title="TVShows - Notflex"
              setShowModal={modal.setShowModal}
              showModal={modal.showModal}
            />
          }
          />

          <Route path="/movies" element={
            <Movies
              title="Movies - Notflex"
              setShowModal={modal.setShowModal}
              showModal={modal.showModal}
            />
          }
          />

        </Routes>
      </AnimatePresence>

    </ScrollToTop>
  )
}

export default Main