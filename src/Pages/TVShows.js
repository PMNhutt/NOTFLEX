import React, { useEffect } from 'react'
import Row from '../Components/Row/Row'
import requests from '../request'
import Banner from '../Components/Banner/Banner'
import Categories from '../Components/Category/Categories'
import { motion } from 'framer-motion'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function TVShows({ title, setShowModal }) {

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
      <Navbar />
      <Banner
        fetchBannerData={requests.fetchTVAction}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Categories
        fetchCategories={requests.fetchTVShowGenres}
        type="tvShows"
      />
      <Row
        title="TV Shows Mystery"
        fetchUrl={requests.fetchTVMystery}
        fetchGenres={requests.fetchTVShowGenres}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Row
        title="TV Shows Action"
        fetchUrl={requests.fetchTVAction}
        fetchGenres={requests.fetchTVShowGenres}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Row
        title="TV Shows Animation"
        fetchUrl={requests.fetchTVAnimation}
        fetchGenres={requests.fetchTVShowGenres}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Row
        title="TV Shows Comedy"
        fetchUrl={requests.fetchTVComedy}
        fetchGenres={requests.fetchTVShowGenres}
        setShowModal={setShowModal}
        type="tvShows"
      />
      <Footer />
    </motion.div>
  )
}

export default TVShows