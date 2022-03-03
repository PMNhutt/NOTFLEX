import React, { useEffect } from 'react'
import Row from '../Components/Row'
import requests from '../request'
import Banner from '../Components/Banner'
import AnimatedPage from '../Components/AnimatedPage'
import Categories from '../Components/Categories'

function TVShows({ title }) {

  useEffect(() => {
    document.title = title
  })


  return (
    <AnimatedPage>
      <div>
        <Banner
          fetchBannerData={requests.fetchTVMystery}
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