import { useState, useEffect, useRef } from 'react'
import '../Component CSS/MoviePoster.css'
import axios from '../axios';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

function MoviePoster({ baseUrl, movie, genres, movieId, type }) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [isHover, setIsHover] = useState(false)
    const [delayHandler, setDelayHandler] = useState()
    const [movieDetails, setMovieDetails] = useState([])
    const [trailerUrl, setTrailerUrl] = useState()


    //movie details
    useEffect(() => {
        async function fetchData() {
            const movieDetail = `/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
            const tvDetail = `/tv/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
            let fetchDateType = ``
            type === "movies" ? fetchDateType = movieDetail : fetchDateType = tvDetail

            var request = await axios.get(fetchDateType)
            setTrailerUrl(request.data.videos.results[1])
            setMovieDetails(request.data)
            return request;
        }
        fetchData();
    }, [movieId])

    // console.log(movieDetails)

    function countSeason(n) {
        if (n > 1) {
            return `${n} seasons`
        } else {
            return "1 season"
        }
    }

    function countRuntime(n) {
        return `${Math.floor(n / 60)}h ${n % 60}m`
    }

    //hover
    const handleMouseEnter = () => {
        setDelayHandler(setTimeout(() => {
            setIsHover(true)
        }, 800))
    }

    const handleMouseLeave = () => {
        clearTimeout(delayHandler)
        setIsHover(false)
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    //genres
    let objectGenres = useRef([{}])

    useEffect(() => {
        if (movie.genre_ids != null) {
            objectGenres.current = genres.filter(genre => movie.genre_ids.includes(genre.id))
        }
    }, [genres])

    return (
        <div className="movie-posters"
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
        >
            <div className={isHover ? "movie-backdrop" : "movie-img"}
                style={{ backgroundImage: `url(${baseUrl}${isHover ? movie.backdrop_path : movie.poster_path})` }}
            >
                {(trailerUrl && isHover) && (<iframe width="319" height="180" src={`https://www.youtube.com/embed/${trailerUrl.key}?rel=0&modestbranding=1&autohide=1&mute=1&controls=0&autoplay=1&loop=1?playlist=${trailerUrl.key}`} frameborder="0"></iframe>
                )}
            </div>
            <div className="poster-info">
                <div className="poster-title">
                    {truncate(movie.title || movie.name || movie.original_name, 25)}
                </div>
                <div className="poster-icons">
                    <PlayCircleIcon className="poster-icon" />
                    <AddCircleOutlineIcon className="poster-icon" />
                    <RecommendOutlinedIcon className="poster-icon" />
                    <RecommendOutlinedIcon sx={{ transform: 'scale(-1, -1)' }} className="poster-icon" />

                    <ArrowDropDownCircleOutlinedIcon className="poster-icon" sx={{ transform: 'translateX(100%)' }} />
                </div>
                <div className="poster-info-top">
                    <span className="poster-vote">{movie.vote_average} Rate</span>
                    <span className="poster-season">{type === "tvShows" ?
                        (countSeason(movieDetails.number_of_seasons))
                        : (countRuntime(movieDetails.runtime))}</span>
                </div>

                <div className="poster-genres">
                    <ul>
                        {(objectGenres.current).map(genre => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MoviePoster