import { useEffect, memo } from 'react';
import Row from '../Components/Row/Row'
import requests from '../request'
import Banner from '../Components/Banner/Banner'
import { motion } from 'framer-motion'


function Home({ title, setShowModal, showModal }) {

  useEffect(() => {
    document.title = title;
  })

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }

  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Banner
        fetchBannerData={requests.fetchComedyMovies}
        setShowModal={setShowModal}
      />
      {/* <Row
        title="NOTFLEX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        fetchGenres={requests.fetchTVShowGenres}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      /> */}
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        fetchGenres={requests.fetchMoviesGenres}
        setShowModal={setShowModal}
        type="movies"
      />
    </motion.div>
  )
}

export default memo(Home);