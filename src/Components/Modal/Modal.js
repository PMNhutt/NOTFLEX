import {useRef} from 'react'
import './Modal.css'
import { motion, AnimatePresence } from 'framer-motion'
import ModalContainer from './ModalContainer/ModalContainer'

function Modal({ showModal, setShowModal }) {

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    const modalRef = useRef()

    const closeModal = (e) => {
        if(modalRef.current === e.target) {
            setShowModal(false)
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {showModal && (
                <motion.div className="backdrop"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    ref = {modalRef}
                    onClick={(e) => closeModal(e)}
                >
                    <ModalContainer setShowModal={setShowModal}/>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal