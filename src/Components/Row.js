import React, { useState, useEffect, memo, useRef } from 'react';
import axios from '../axios';
import '../Component CSS/Row.css';
import SkeletonPoster from '../skeletons/SkeletonPoster';
import MoviePoster from './MoviePoster'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const baseUrl = process.env.REACT_APP_BASE_URL_SMALL;

function Row({ title, fetchUrl}) {
    const [movies, setMovies] = useState({
        loading: true,
        data: [],
    });

    const listRef = useRef()

    const [isMovedLeft, setIsMovedLeft] = useState(false)
    const [IsMovedRight, setIsMovedRight] = useState(false)
    const [slideNum, setSlideNum] = useState(0)

    //load movies when Row render
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // setMovies(request.data.results)
            console.log(request.data.results)
            setMovies({
                loading: false,
                data: request.data.results
            })
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 60
        if (direction == "left" && slideNum > 0) {
            setIsMovedRight(false)
            if (slideNum == 10) {
                listRef.current.style.transform = `translateX(${1140 + distance}px)`
                setSlideNum(slideNum - 5)
            } else {
                setIsMovedLeft(false)
                listRef.current.style.transform = `translateX(${1330 + distance}px)`
                setSlideNum(slideNum - 5)
            }
        }
        if (direction == "right" && slideNum < 10) {
            setIsMovedLeft(true)
            if (slideNum < 5) {
                listRef.current.style.transform = `translateX(${-1330 + distance}px)`
                setSlideNum(slideNum + 5)
            } else {
                setIsMovedRight(true)
                listRef.current.style.transform = `translateX(${-1140 + distance}px)`
                setSlideNum(slideNum + 5)
            }
        }
    }


    return (
        <div className="row">

            <h2 className="row_title">{title}</h2>
            <ArrowBackIosNewOutlinedIcon
                sx={{ fontSize: '3.5vw', height: '18.5vw' }}
                className="slider left"
                onClick={() => handleClick("left")}
                style={{ display: !isMovedLeft && "none" }}
            />
            <div className="row_posters" ref={listRef}>

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
                        <MoviePoster baseUrl={baseUrl} movie={movie} />
                        {/* <p className="movie_row_name">{movie.name || movie.original_title || movie.orginal_name}</p> */}
                        {/* <p className="movie-row-name">{movie.vote_everage}</p> */}
                    </React.Fragment>
                ))) : [1, 2, 3, 4, 5, 6].map((n) => (
                    <SkeletonPoster key={n} />
                ))}
            </div>
            <ArrowForwardIosOutlinedIcon
                sx={{ fontSize: '3.5vw', height: '18.5vw' }}
                className="slider right"
                onClick={() => handleClick("right")}
                style={{ display: IsMovedRight && "none" }}
            />
        </div>
    )
}

export default memo(Row);
