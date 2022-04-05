import React from 'react'
import Banner from '../components/banner/Banner'
import MovieList from '../components/movie/MovieList'

const HomePage = () => {
  return (
    <>
      <Banner />
      <section className="pb-20 movie-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Now Playing
        </h2>
        {/* className="grid grid-cols-4 gap-10 movie-list" */}
        <MovieList></MovieList>
      </section>

      <section className="pb-20 movie-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>

      <section className="pb-20 movie-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  )
}

export default HomePage
