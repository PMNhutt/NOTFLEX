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
          isLarge
        />
        <Row
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
        />
        <Row
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
        />
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
        />
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
        />
      </div>
    </AnimatedPage>
  )
}

export default memo(Home);