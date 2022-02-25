import { useEffect, memo } from 'react';
import Row from '../Components/Row'
import requests from '../request'
import Banner from '../Components/Banner'
import AnimatedPage from '../Components/AnimatedPage'



function Home({ title }) {

  useEffect(() => {
    document.title = title;
  })

  return (
    <AnimatedPage>
      <div>
        <Banner fetchBannerData={requests.fetchTrending} />
        <Row
          title="NOTFLEX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          fetchGenres={requests.fetchTVShowGenres}
        />
        <Row
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          fetchGenres={requests.fetchMoviesGenres}
        />
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          fetchGenres={requests.fetchMoviesGenres}
        />
      </div>
    </AnimatedPage>
  )
}

export default memo(Home);