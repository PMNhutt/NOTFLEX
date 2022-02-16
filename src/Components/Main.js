import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import TVShows from '../Pages/TVShows';
import Movies from '../Pages/Movies';
import ScrollToTop from '../Components/ScrollToTop'

function Main() {
  return (
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home title="Home - Notflex" />} />
          <Route path="/tvshows" element={<TVShows title="TVShows - Notflex" />} />
          <Route path="/movies" element={<Movies title="Movies - Notflex" />} />
        </Routes>
      </ScrollToTop>
  )
}

export default Main