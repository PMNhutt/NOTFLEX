import { useState, createContext } from 'react';

const ModalContext = createContext()

function ModalProvider({ children }) {

    const [showModal, setShowModal] = useState(false)
    const [bannerMovie, setBannerM] = useState()
    const [type, setType] = useState()
    const [bannerVolumeClicked, setBannerVolumeClicked] = useState(false)
    

    const values = {
        showModal, setShowModal, 
        bannerMovie, setBannerM,
        type, setType,
        bannerVolumeClicked, setBannerVolumeClicked,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }