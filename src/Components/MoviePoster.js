import {forwardRef} from 'react'
import '../Component CSS/Row.css';


function MoviePoster({ baseUrl, isLarge, movie }) {

    return (
        <img
            className={`row_poster ${isLarge && "row_posterLarge"}`}
            src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
        />
    )
}

export default MoviePoster