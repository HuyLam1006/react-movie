import { fetcher, tmdbAPI } from 'apiConfig/config'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import MovieCard, { MovieCardSkeleton } from './MovieCard'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'

// https://api.themoviedb.org/3/movie/now_playing?api_key=d2298ed8119a3da2a34b928d8b497bfa

const MovieList = ({ type }) => {
  //   const [movies, setMovies] = useState([])
  // const { data } = useSWR(
  //   `https://api.themoviedb.org/3/movie/${type}?api_key=d2298ed8119a3da2a34b928d8b497bfa`,
  //   fetcher
  // )
  //! Toi uu
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher)
  //   console.log('MovieList ~ data', data)

  const isLoading = !data && !error

  //! cu~
  //   useEffect(() => {
  //     if (data && data.results) setMovies(data.results)
  //   }, [data])
  //   console.log('MovieList ~ movie', movies)
  //! thay =
  const movies = data?.results || []

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
            {/* {Array(6)
              .fill()
              .map((item) => (
                <SwiperSlide key={item}>
                  <MovieCardSkeleton></MovieCardSkeleton>
                </SwiperSlide>
              ))} */}
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
}

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Some thing went wrong with this component
    </p>
  )
}

export default withErrorBoundary(MovieList, {
  FallbackComponent, //FallbackComponent = FallbackComponent
})
