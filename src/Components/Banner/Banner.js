import './Banner.css'
import { useState, useEffect, memo, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { GenreContext } from '../../Context/GenreContext'
import { ModalContext } from '../../Context/ModalContext'
import axios from '../../axios';
import Youtube from 'react-youtube';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

function Banner({ fetchBannerData, type, setShowModal }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;
    const API_KEY = process.env.REACT_APP_API_KEY
    const [trailerUrl, setTrailerUrl] = useState()
    const [delayUrl, setDelayUrl] = useState()

    const [movie, setMovie] = useState([]);

    const genreIds = useContext(GenreContext)

    //get modal movie id
    const bannerMId = useContext(ModalContext)

    //get type for modal
    useEffect(() => {
        bannerMId.setType(type)
    }, [type])

    //handle modal
    function handleModalOpen(id) {
        setShowModal(true)
        bannerMId.setBannerM(id)
    }

    //get movies
    useEffect(() => {
        async function fetchData() {

            //handle filter genre--> take data from banner
            var url
            if (type === "movies" || type === undefined) {
                if (fetchBannerData.includes("%2C")) {
                    url = fetchBannerData.replace(`%2C${genreIds.selectedMovieGenre}`, "")
                } else {
                    url = fetchBannerData.concat(`%2C${genreIds.selectedMovieGenre}`)
                }
            } else {
                if (fetchBannerData.includes("%2C")) {
                    url = fetchBannerData.replace(`%2C${genreIds.selectedGenre}`, "")
                } else {
                    url = fetchBannerData.concat(`%2C${genreIds.selectedGenre}`)
                }

            }

            const request = await axios.get(url)
            //set random api movie to banner
            setMovie(request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
            ])
            return request;
        }
        fetchData();
    }, [fetchBannerData, genreIds.selectedGenre, genreIds.selectedMovieGenre]);

    //get trailerUrl
    useEffect(() => {
        async function fetchData() {
            const movieDetail = `/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
            const tvDetail = `/tv/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`

            let fetchDateType;
            (type === "movies" || type === undefined) ? fetchDateType = movieDetail : fetchDateType = tvDetail

            var request = await axios.get(fetchDateType)
            let trailerIndex = request.data.videos.results.findIndex(v => v.type === "Trailer")

            setDelayUrl(request.data.videos.results[trailerIndex])
            return request;
        }
        fetchData();
    }, [movie.id])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTrailerUrl(delayUrl)
        }, 1500);

        return () => clearTimeout(timer);
    }, [delayUrl])

    useEffect(() => {
        setTrailerUrl("")
    }, [genreIds.selectedGenre, genreIds.selectedMovieGenre])



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    //trailer
    const trailerRef = useRef()

    //handle video 
    const handleVolumeClick = () => {
        bannerMId.setBannerVolumeClicked(prev => !prev)
        bannerMId.bannerVolumeClicked ? trailerRef.current.internalPlayer.unMute() : trailerRef.current.internalPlayer.mute()
    }

    const opts = {
        height: "822",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
            controls: 0,
            // mute: bannerMId.bannerVolumeClicked ? 1 : 0,
            modestbranding: 1
        }
    };

    const checkReady = (e) => {
        bannerMId.bannerVolumeClicked ? trailerRef.current.internalPlayer.mute() : trailerRef.current.internalPlayer.unMute()
        e.target.setVolume(50);
        e.target.playVideo();
        var res = e.target.playerInfo.playerState
        if (res === -1) {
            setTrailerUrl("")
        }
    }

    const checkElapsedTime = (e) => {
        // clearTimeout(timerId)
        const duration = e.target.getDuration();
        var currentTime = e.target.getCurrentTime();
        if (currentTime / duration >= 0.3) {
            setTrailerUrl("")
        }
    }

    return (

        <header
            className="banner"
            style={{
                backgroundImage: `url(
                    "${baseUrl}${movie.backdrop_path}"
                )`,
            }}
        >
            {trailerUrl && <div className="banner-youtube">
                <Youtube
                    ref={trailerRef}
                    videoId={`${trailerUrl.key}`}
                    containerClassName="embed-youtube"
                    onReady={(e) => checkReady(e)}
                    onStateChange={(e) => checkElapsedTime(e)}
                    opts={opts}
                /></div>
            }
            <div className="banner_left_cover"></div>
            <div className="banner_right_cover"></div>
            <div className="banner_bottom_cover"></div>

            <motion.div className="banner_content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h1 className="banner_title">
                    {/* check if api return has title or not and so on */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_description">
                    {truncate(movie?.overview, 150)}
                </div>

                <div className="banner_btns">
                    <button className="banner_btn play_btn">
                        <PlayArrowRoundedIcon sx={{ marginRight: '10px', fontSize: '1.8em' }} />
                        <span>Play</span>
                    </button>
                    <button className="banner_btn info_btn" onClick={() => handleModalOpen(movie.id)}>
                        <InfoOutlinedIcon sx={{ marginRight: '10px', fontSize: '1.5em' }} />
                        <span>More Info</span>
                    </button>
                </div>


            </motion.div>

            <div className="banner_btns-right" onClick={() => handleVolumeClick()}>
                {bannerMId.bannerVolumeClicked ? <VolumeOffOutlinedIcon sx={{ fontSize: '1.8em' }} /> :
                    <VolumeUpOutlinedIcon sx={{ fontSize: '1.8em' }} />}
            </div>

        </header>
    )
}

export default memo(Banner)