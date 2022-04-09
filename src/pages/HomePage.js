import React from 'react'
import Banner from '../components/banner/Banner'
import MovieList from '../components/movie/MovieList'

const HomePage = () => {
  return (
    <>
      <Banner />
      <section className="pb-20 movie-layout page-container">
        <span className="flex items-center mb-10 space-x-3">
          <p className="text-3xl font-light">Now</p>
          <p className="text-4xl font-bold text-primary">Playing</p>
        </span>
        <MovieList type="now_playing"></MovieList>
      </section>

      <section className="pb-20 movie-layout page-container">
        {/* <h2 className="mb-10 text-white capitalize">       </h2>*/}
        <span className="flex items-center mb-10 space-x-3">
          <p className="text-3xl font-light">Top</p>
          <p className="text-4xl font-bold text-primary">Rated</p>
        </span>

        <MovieList type="top_rated"></MovieList>
      </section>

      <section className="pb-20 movie-layout page-container">
        <span className="flex items-center mb-10 space-x-3">
          <p className="text-3xl font-light"></p>
          <p className="text-4xl font-bold text-primary">Trending</p>
        </span>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  )
}

export default HomePage
