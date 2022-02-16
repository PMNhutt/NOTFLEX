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
        <Banner fetchBannerData={requests.fetchTVAnimation} />
        <Row
          title="TV Shows Original"
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row
          title="TV Shows Action"
          fetchUrl={requests.fetchTVAction}
        />
        <Row
          title="TV Shows Animation"
          fetchUrl={requests.fetchTVAnimation}
        />
        <Row
          title="TV Shows Comedy"
          fetchUrl={requests.fetchTVComedy}
        />

      </div>
    </AnimatedPage>
  )
}

export default TVShows