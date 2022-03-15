import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../../../axios';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function TvEpisodes({ movies, tvId, apiKey }) {
  const baseUrl = process.env.REACT_APP_BASE_URL_SMALL;
  const [episodes, setEpisodes] = useState([])
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isHover, setIsHover] = useState({
    isHovered: {}
  })

  const [tvSeason, setTvSeason] = useState(1)

  //get all episodes of 1 season
  useEffect(() => {
    async function fetchData() {
      const tvSeasonInfo = `/tv/${tvId}/season/${tvSeason}?api_key=${apiKey}&language=en-US`

      var request = await axios.get(tvSeasonInfo)
      // console.log(request.data.episodes.slice(0, 10));
      if (!collapsed && request.data.episodes.length > 10) {
        setEpisodes(request.data.episodes.slice(0, 10))
        setIsCollapsible(true)
      } else {
        setEpisodes(request.data.episodes)
      }
      return request;
    }
    fetchData();
  }, [tvId, tvSeason, collapsed])

  //hover
  function handleMouseEnter(index) {
    setIsHover(
      prevState => {
        return { isHovered: { ...prevState.isHovered, [index]: true } };
      }
    )
  }

  function handleMouseLeave(index) {
    setIsHover(
      prevState => {
        return { isHovered: { ...prevState.isHovered, [index]: false } };
      }
    )
  }

  //handle season changes
  const handleSeasonChange = ({
    target: {
      selectedOptions: [{
        dataset: { value }
      }]
    }
  }) => {
    setTvSeason(value)
    setCollapsed(false)
    setIsCollapsible(false)
  }

  return (
    <div className="modal-info-scnd">

      {/* header */}
      <div className="episodes-header">
        <h2 className="episodes-label">Episodes</h2>
        {movies.details.number_of_seasons > 1 ?
          <div className="episodes-dropdown">
            <select name="seasons" id="seasons" onChange={handleSeasonChange}>
              {movies.seasons && movies.seasons.map(ep => (
                <option key={ep.id} data-name={ep.name} data-value={ep.season_number}>{`${ep.name} (${ep.episode_count} Episodes)`}</option>
              ))}
            </select>
          </div> :
          <h2>1 season</h2>}
      </div>

      {/* container */}
      <div className="episodes-container">
        {/* 1 array div of 1 season (1 ep per div) */}
        <AnimatePresence>
          {episodes && episodes.map((ep, index) => (
            <div key={index} className="episodes-data"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {isHover.isHovered[index] &&
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="episode-playbtn"
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: '3vw' }} />
                </motion.span>}
              <div className="episodes-index">{ep.episode_number}</div>
              <div className="episodes-thumbnail"
                style={{ backgroundImage: `url(${baseUrl}${ep.still_path})` }}
              ></div>
              <div className="episodes-info">
                <div className="name">{ep.name}</div>
                <div className="description">{ep.overview}</div>
              </div>
            </div>
          ))}
        </AnimatePresence>

        {isCollapsible && <div className="episodes-collapsible">
          <div className="showAll-btn" onClick={() => setCollapsed(prev => !prev)}>
            {!collapsed ? <ExpandMoreIcon sx={{fontSize: '1.8em'}} /> : <ExpandLessIcon sx={{fontSize: '1.8em'}}/>}
            </div>
        </div>}

      </div>

    </div>
  )
}

export { TvEpisodes }