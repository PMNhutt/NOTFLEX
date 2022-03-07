import { useEffect } from 'react'
import Row from '../Components/Row/Row'
import requests from '../request'
import Banner from '../Components/Banner/Banner'
import Categories from '../Components/Category/Categories'
import { motion } from 'framer-motion'


function Movies({ title, setShowModal }) {

  useEffect(() => {
    document.title = title
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
        fetchBannerData={requests.fetchActionMovies}
        setShowModal={setShowModal}
        type="movies"
      />
      <Categories
        fetchCategories={requests.fetchMoviesGenres}
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
    </motion.div>
  )
}

export default Movies