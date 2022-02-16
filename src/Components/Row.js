import React, { useState, useEffect, memo } from 'react';
import axios from '../axios';
import '../Component CSS/Row.css';
import SkeletonPoster from '../skeletons/SkeletonPoster';

const baseUrl = process.env.REACT_APP_BASE_URL_SMALL;

function Row({ title, fetchUrl, isLarge }) {
    const [movies, setMovies] = useState({
        loading: true,
        data: [],
    });

    //load movies when Row render
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // console.log(request);
            // setMovies(request.data.results)
            setMovies({
                loading: false,
                data: request.data.results
            })
            return request;
        }
        fetchData();
    }, [fetchUrl]);



    return (
        <div className="row">
            <h2 className="row_title">{title}</h2>

            <div className="row_posters">

                {/* {movies && movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_poster ${isLarge && "row_posterLarge"}`}
                        src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))} */}


                {!movies.loading ? (movies.data.map(movie => (
                    <React.Fragment key={movie.id}>
                        <img
                            
                            className={`row_poster ${isLarge && "row_posterLarge"}`}
                            src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                        <p className="movie_row_name">{movie.name || movie.original_title || movie.orginal_name}</p>
                        {/* <p className="movie-row-name">{movie.vote_everage}</p> */}
                    </React.Fragment>
                ))) : [1, 2, 3, 4, 5, 6].map((n) => (
                    <SkeletonPoster key={n} />
                ))}
            </div>
        </div>
    )
}

export default memo(Row);
