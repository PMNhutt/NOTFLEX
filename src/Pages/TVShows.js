import React, { useEffect } from 'react'
import Row from '../Components/Row'
import requests from '../request'
import Banner from '../Components/Banner'
import AnimatedPage from '../Components/AnimatedPage'


function TVShows({ title }) {

  useEffect(() => {
    document.title = title
  })

  return (
    <AnimatedPage>
      <div>
        <Banner
          fetchBannerData={requests.fetchTVAnimation}
          fetchCategories={requests.fetchTVShowGenres}
          type="tvShows"
        />
        <Row
          title="TV Shows Original"
          fetchUrl={requests.fetchNetflixOriginals}
          fetchGenres={requests.fetchTVShowGenres}
          type="tvShows"
        />
        <Row
          title="TV Shows Action"
          fetchUrl={requests.fetchTVAction}
          fetchGenres={requests.fetchTVShowGenres}
          type="tvShows"
        />
        <Row
          title="TV Shows Animation"
          fetchUrl={requests.fetchTVAnimation}
          fetchGenres={requests.fetchTVShowGenres}
          type="tvShows"
        />
        <Row
          title="TV Shows Comedy"
          fetchUrl={requests.fetchTVComedy}
          fetchGenres={requests.fetchTVShowGenres}
          type="tvShows"
        />

      </div>
    </AnimatedPage>
  )
}

export default TVShows