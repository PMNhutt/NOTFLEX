import React, { useState, useEffect, memo } from 'react';
import axios from '../axios';
import '../Component CSS/Banner.css'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;

function Banner({ fetchBannerData, type, fetchCategories }) {

    const [movie, setMovie] = useState([]);
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        async function fetchData() {
            const requestCate = await axios.get(fetchCategories)
            setCategories(requestCate.data.genres)
            return requestCate;
        }
        fetchData();
    }, [fetchCategories])

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

            {type && (
                <div className="banner_categories">
                    <span>{type === "tvShows" ? "TV Shows" : "Movies"}</span>
                    <select name="genres" id="genres">
                        <option style={{display: "none"}}>Genres</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="banner_content">
                <h1 className="banner_title">
                    {/* check if api return has title or not and so on */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_description">
                    {truncate(movie?.overview, 150)}
                </div>

                <div className="banner_btns">
                    <button className="banner_btn play_btn">
                        <PlayArrowRoundedIcon sx={{marginRight: '10px', fontSize: '1.8em'}}/>
                        <span>Play</span>
                    </button>
                    <button className="banner_btn info_btn">
                        <InfoOutlinedIcon sx={{marginRight: '10px', fontSize: '1.5em'}}/>
                        <span>More Info</span>
                        </button>
                </div>

            </div>
        </header>
    )
}

export default memo(Banner)