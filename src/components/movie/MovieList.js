import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from './MovieCard'

import useSWR from 'swr'
import { fetcher } from '../../config'

// https://api.themoviedb.org/3/movie/now_playing?api_key=d2298ed8119a3da2a34b928d8b497bfa

const MovieList = ({ type = 'now_playing' }) => {
  //   const [movies, setMovies] = useState([])
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=d2298ed8119a3da2a34b928d8b497bfa`,
    fetcher
  )
  //   console.log('MovieList ~ data', data)

  //   useEffect(() => {
  //     if (data && data.results) setMovies(data.results)
  //   }, [data])
  //   console.log('MovieList ~ movie', movies)
  //! thay =
  const movies = data?.results || []

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default MovieList