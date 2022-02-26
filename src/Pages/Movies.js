import { useEffect } from 'react'
import Row from '../Components/Row'
import requests from '../request'
import Banner from '../Components/Banner'
import AnimatedPage from '../Components/AnimatedPage'



function Movies({ title }) {

  useEffect(() => {
    document.title = title
  })

  return (
    <AnimatedPage>
      <div>
        <Banner
          fetchBannerData={requests.fetchActionMovies}
          fetchCategories={requests.fetchMoviesGenres}
          type="movies"
        />
        <Row
          title="Top Rated Movies"
          fetchUrl={requests.fetchTopRated}
          fetchGenres={requests.fetchMoviesGenres}
          type="movies"
        />
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          fetchGenres={requests.fetchMoviesGenres}
          type="movies"
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          fetchGenres={requests.fetchMoviesGenres}
          type="movies"
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          fetchGenres={requests.fetchMoviesGenres}
          type="movies"
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          fetchGenres={requests.fetchMoviesGenres}
          type="movies"
        />
      </div>
    </AnimatedPage>
  )
}

export default Movies