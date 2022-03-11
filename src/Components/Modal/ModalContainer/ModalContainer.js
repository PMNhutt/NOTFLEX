import { useState, useEffect, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from '../../../Context/ModalContext';
import { TvEpisodes } from './TvEpisodes'
import { Recommend } from './Recommend'
import axios from '../../../axios';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

function ModalContainer({ setShowModal }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [movies, setMovies] = useState({
        details: [],
        trailerUrl: {},
        allCast: [],
        slicedCast: [],
        movieYear: '',
        seasons: [],
        creatorMovie: {},
        creatorTv: []
    })

    const bannerMId = useContext(ModalContext)


    //movie details
    useEffect(() => {
        async function fetchData() {
            const movieDetail = `/movie/${bannerMId.bannerMovie}?api_key=${API_KEY}&language=en-US&append_to_response=videos%2Ccredits`
            const tvDetail = `/tv/${bannerMId.bannerMovie}?api_key=${API_KEY}&language=en-US&append_to_response=videos%2Ccredits`
            let fetchDateType;
            (bannerMId.type === "movies" || bannerMId.type === undefined) ? fetchDateType = movieDetail : fetchDateType = tvDetail

            var request = await axios.get(fetchDateType)
            let trailerIndex = request.data.videos.results.findIndex(v => v.type === "Trailer")
            let creatorIndex = request.data.credits.crew.findIndex(v => v.known_for_department === "Directing") === -1 ?
                request.data.credits.crew.findIndex(v => v.known_for_department === "Writing") : 
                request.data.credits.crew.findIndex(v => v.known_for_department === "Directing")
            // console.log(bannerMId.bannerMovie)

            setMovies({
                    details: request.data,
                    trailerUrl: request.data.videos.results[trailerIndex],
                    allCast: request.data.credits.cast,
                    slicedCast: request.data.credits.cast.slice(0, 3),
                    seasons: (bannerMId.type === "movies" || bannerMId.type === undefined) ?
                        request.data.seasons : (request.data.seasons.length > request.data.number_of_seasons) ?
                            request.data.seasons.slice(1) : request.data.seasons,
                    movieYear: (bannerMId.type === "movies" || bannerMId.type === undefined) ?
                        request.data.release_date.slice(0, 4) : request.data.first_air_date.slice(0, 4),
                    creatorMovie: (bannerMId.type === "movies" || bannerMId.type === undefined) ?
                        request.data.credits.crew[creatorIndex] : {},
                    creatorTv: bannerMId.type === "tvShows" ? request.data.created_by : []
                })

            return request;
        }
        fetchData();
    }, [bannerMId.bannerMovie, bannerMId.type])




    const contain = {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
        exit: { opacity: 0, scale: 0 }
    }

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

    return (
        <motion.div className="modal-container"
            variants={contain}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="cancel-btn" onClick={() => setShowModal(false)}>
                <CancelRoundedIcon sx={{ fontSize: '40px' }} />
            </div>

            <div className="modal-backdrop"
                style={{
                    backgroundImage: `url(
                        "${baseUrl}${movies.details.backdrop_path}"
                    )`,
                }}
            >
                <div className="modal-name-icons">
                    <h1>{movies.details.title || movies.details.name || movies.details.original_name}</h1>
                    <div className="modal-btn-icons">
                        <button className="modal-playbtn">
                            <PlayArrowRoundedIcon sx={{ marginRight: '10px', fontSize: '1.8em' }} />
                            <span>Play</span>
                        </button>

                        <AddOutlinedIcon sx={{ fontSize: '2.5vw' }} className="modal-icon-add" />
                        <ThumbUpOutlinedIcon sx={{ fontSize: '1.9vw' }} className="modal-icon-like" />
                        <ThumbDownAltOutlinedIcon sx={{ fontSize: '1.9vw' }} className="modal-icon-like" />
                    </div>

                </div>

            </div>

            <div className="modal-info">
                <div className="modal-info-fst">
                    <div className="info-left">
                        {/* release year, description,... */}
                        <span className="info-vote">{movies.details.vote_average} Rate</span>
                        <span className="info-year">
                            {movies.movieYear}
                        </span>
                        <span className="info-season">{bannerMId.type === "tvShows" ?
                            (countSeason(movies.details.number_of_seasons))
                            : (countRuntime(movies.details.runtime))}
                        </span>
                        <span className="info-HD">HD</span>
                        <div className="info-des">{movies.details.overview}</div>
                    </div>

                    <div className="info-right" style={{ fontSize: '1vw' }}>
                        {/* cast, genres */}
                        <div className="info-casts" style={{ marginBottom: '10px' }}>
                            <span className="preview-cast" style={{ color: 'grey' }}>Cast: </span>
                            {movies.slicedCast && movies.slicedCast.map((cast, index) => (
                                <span key={index} className="cast"><a>{(index ? ', ' : '') + `${cast.name}`}</a></span>
                            ))}
                            <span className="cast" style={{ fontStyle: 'italic' }}><a>, more</a></span>
                        </div>
                        <div className="info-genres">
                            <span className="preview-genre" style={{ color: 'grey' }}>Genres: </span>
                            {movies.details.genres && movies.details.genres.map((genre, index) => (
                                <span key={genre.id} className="genre"><a>{(index ? ', ' : '') + `${genre.name}`}</a></span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* div Episodes if tv show */}
                {bannerMId.type === "tvShows" && <TvEpisodes
                    movies={movies}
                    tvId={bannerMId.bannerMovie}
                    apiKey={API_KEY}
                />}

                {/* div More Like this */}
                <Recommend
                    id={bannerMId.bannerMovie}
                    apiKey={API_KEY}
                    type={bannerMId.type}
                />

                {/* div about this movie */}
                <div className="modal-info-last">
                    {/* header */}
                    <div className="about-header">
                        <h2 className="about-label" style={{ fontWeight: '400' }}>About  <strong>{movies.details.title || movies.details.name}</strong></h2>
                    </div>
                    {/* container */}
                    <div className="about-container">
                        <div className="about-creator about">
                            <span style={{ color: 'grey' }}>Creators: </span>
                            {(bannerMId.type === "movies" || bannerMId.type === undefined) &&
                                <span className="cast">{movies.creatorMovie.name}</span>
                            }
                            {bannerMId.type === "tvShows" && movies.creatorTv.map((cre, index) => (
                                <span key={index} className="cast"><a>{(index ? ', ' : '') + `${cre.name}`}</a></span>
                            ))}
                        </div>
                        <div className="about-cast about">
                            <span style={{ color: 'grey' }}>Cast: </span>
                            {movies.allCast && movies.allCast.map((cast, index) => (
                                <span key={index} className="cast"><a>{(index ? ', ' : '') + `${cast.name}`}</a></span>
                            ))}
                        </div>
                        <div className="about-genre about">
                            <span style={{ color: 'grey' }}>Genres: </span>
                            {movies.details.genres && movies.details.genres.map((genre, index) => (
                                <span key={genre.id} className="genre"><a>{(index ? ', ' : '') + `${genre.name}`}</a></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-bot-cover"></div>
        </motion.div >
    )
}

export default ModalContainer