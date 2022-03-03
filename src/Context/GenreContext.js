import { useState, createContext } from 'react';

const GenreContext = createContext()

function GenreProvider({ children }) {
    const [selectedGenre, setSelectedGenre] = useState()
    const [cateBannerChange, setCateBannerChange] = useState(false)
    const [cateName, setCateName] = useState()
    
    const [selectedMovieGenre, setSelectedMovieGenre] = useState()
    const [cateMoviesName, setCateMoviesName] = useState()
    const [cateBannerMoviesChange, setCateBannerMoviesChange] = useState(false)


    const values = {
        selectedGenre, setSelectedGenre,
        cateBannerChange, setCateBannerChange,
        cateName, setCateName,
        cateBannerMoviesChange, setCateBannerMoviesChange,
        cateMoviesName, setCateMoviesName,
        selectedMovieGenre, setSelectedMovieGenre
    }

    return (
        <GenreContext.Provider value={values}>
            {children}
        </GenreContext.Provider>
    )
}

export { GenreProvider, GenreContext }