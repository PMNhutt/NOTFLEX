import React, { useState, useEffect, memo } from 'react';
import axios from '../axios';
import '../Component CSS/Banner.css'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';
import Youtube from 'react-youtube';


function Banner({ fetchBannerData, type, fetchCategories }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;
    const API_KEY = process.env.REACT_APP_API_KEY
    const [trailerUrl, setTrailerUrl] = useState()

    const [movie, setMovie] = useState([]);
    const [categories, setCategories] = useState([]);

    //get movies
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchBannerData)
            //set random api movie to banner
            setMovie(request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
            ])
            return request;
        }
        fetchData();
    }, [fetchBannerData]);

    //get trailerUrl
    useEffect(() => {
        async function fetchData() {
            const movieDetail = `/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
            const tvDetail = `/tv/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`

            let fetchDateType;
            (type === "movies" || type === undefined) ? fetchDateType = movieDetail : fetchDateType = tvDetail

            var request = await axios.get(fetchDateType)
            let trailerIndex = request.data.videos.results.findIndex(v => v.type === "Trailer")
            setTrailerUrl(request.data.videos.results[trailerIndex])
            return request;
        }
        fetchData();
    }, [movie.id])

    //get genres list
    useEffect(() => {
        async function fetchData() {
            const requestCate = await axios.get(fetchCategories)
            setCategories(requestCate.data.genres)
            return requestCate;
        }
        fetchData();
    }, [fetchCategories])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
    }

    //trailer
    const opts = {
        height: "822",
        width: "1480",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            mute: 1,
            modestbranding: 1
        }
    };

    const checkReady = (e) => {
        var res = e.target.playerInfo.playerState
        if (res === -1) {
            setTrailerUrl("")
        }
    }

    const checkElapsedTime = (e) => {
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.8) {
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
            {trailerUrl && <Youtube
                videoId={`${trailerUrl.key}`}
                containerClassName="embed embed-youtube"
                onStateChange={(e) => checkElapsedTime(e)}
                onReady={(e) => checkReady(e)}
                opts={opts}
            />
            }
            <div className="banner_left_cover"></div>
            <div className="banner_right_cover"></div>
            <div className="banner_bottom_cover"></div>

            {type && (
                <motion.div className="banner_categories"
                    initial={{ y: -500 }}
                    animate={{ y: 0 }}
                >
                    <span>{type === "tvShows" ? "TV Shows" : "Movies"}</span>
                    <select name="genres" id="genres">
                        <option style={{ display: "none" }}>Genres</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </motion.div>
            )}

            <motion.div className="banner_content"
                initial={{ opacity: 0, x: -800 }}
                animate={{ opacity: 1, x: 0 }}
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
                    <button className="banner_btn info_btn">
                        <InfoOutlinedIcon sx={{ marginRight: '10px', fontSize: '1.5em' }} />
                        <span>More Info</span>
                    </button>
                </div>

            </motion.div>
        </header>
    )
}

export default memo(Banner)