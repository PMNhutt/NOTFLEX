import { useState, createContext } from 'react';

const ModalContext = createContext()

function ModalProvider({ children }) {

    const [showModal, setShowModal] = useState(false)
    const [bannerMovie, setBannerM] = useState()
    const [rowMovie, setRowMovie] = useState()
    const [type, setType] = useState()
    

    const values = {
        showModal, setShowModal, 
        bannerMovie, setBannerM,
        rowMovie, setRowMovie,
        type, setType,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }