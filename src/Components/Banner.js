import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../Component CSS/Banner.css'

const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;

function Banner({fetchBannerData}) {

    const [movie, setMovie] = useState([]);

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
    }, []);


    // console.log(movie);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
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
            <div className="banner_left_cover"></div>
            <div className="banner_bottom_cover"></div>
            <div className="banner_content">
                <h1 className="banner_title">
                    {/* check if api return has title or not and so on */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_description">
                    {truncate(movie?.overview, 150)}
                </div>
                <div className="banner_btns">
                    <button className="banner_btn play_btn"><i className="fas fa-play"></i>Play</button>
                    <button className="banner_btn info_btn"><i className="fas fa-info-circle"></i>More Info</button>
                </div>
            </div>
        </header>
    )
}

export default Banner