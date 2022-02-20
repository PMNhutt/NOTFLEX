import React from 'react'

function MovieCard() {


    return (
        <div className="movie-card-popup">
            <img
                className={`row_poster ${isLarge && "row_posterLarge"}`}
                src={`${baseUrl}${movie.backdrop_path}`}
                alt={movie.name}
            />
            <p className="movie_row_name">{movie.name || movie.original_title || movie.orginal_name}</p>
            {/* <p className="movie-row-name">{movie.vote_everage}</p> */}
        </div>
    )
}

export default MovieCard