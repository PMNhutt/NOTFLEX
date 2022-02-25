import { useState, useEffect, useRef } from 'react'
import '../Component CSS/MoviePoster.css'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';


function MoviePoster({ baseUrl, movie, genres }) {

    const [isHover, setIsHover] = useState(false)
    const [delayHandler, setDelayHandler] = useState()

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
                    <span className="poster-season">1 Season</span>
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