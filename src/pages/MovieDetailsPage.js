import React from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import MovieCard from 'components/movie/MovieCard'
import { fetcher, tmdbAPI } from 'apiConfig/config'

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailsPage = () => {
  const { movieId } = useParams()

  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    //! Toi' uu
    tmdbAPI.getMovieDetaills(movieId),
    fetcher
  )
  // console.log('MovieDetailsPage ~ data', data)

  if (!data) return null
  const { backdrop_path, poster_path, title, genres, overview } = data

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover rounded-xl"
          style={{
            // backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`, //data.backdrop_path
            //! Toi uu
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          className="object-cover object-top w-full h-full rounded-xl"
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>

      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              className="px-4 py-2 border rounded-3xl border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm leading-relaxed text-center max-w-[600px] mx-auto mb-10">
        {overview}
      </p>

      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
      {/* <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar> */}
    </div>
  )
}

//! toi uu code
// props la object nen them {}
function MovieMeta({ type = 'videos' }) {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher)
  if (!data) return null

  if (type === 'credits') {
    const { cast } = data
    if (!cast || cast.length <= 0) return null
    return (
      <div className="py-10">
        <h2 className="mb-10 text-3xl text-center">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    const { results } = data
    if (!results || results.length <= 0) return null
    if (type === 'videos')
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 1).map((item) => (
              <div key={item.id}>
                <div className="text-center">
                  <h3 className="inline-block p-3 mb-5 text-xl font-medium text-center rounded-lg bg-secondary">
                    {item.name}
                  </h3>
                </div>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="985"
                    height="554"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill w-full h-full rounded-xl"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    if (type === 'similar')
      return (
        <div className="py-10">
          {/* <h2 className="mb-10 text-2xl font-medium">Similar movies</h2> */}
          <span className="flex items-center mb-10 space-x-2">
            <p className="text-2xl font-light">Similar</p>
            <p className="text-3xl font-bold text-primary">Movies</p>
          </span>
          <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )
  }
  return null
}

//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
function MovieCredits() {
  const { movieId } = useParams()

  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'credits'),
    fetcher
  )
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null

  return (
    <div className="py-10">
      <h2 className="mb-10 text-2xl text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt=""
            />
            <h3 className="text-xl font-medium text-center">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

//https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>
//<iframe width="985" height="554" src="https://www.youtube.com/embed/vSbNukYUiik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullscreen></iframe>
function MovieVideos() {
  const { movieId } = useParams()

  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'videos'),
    fetcher
  )
  // console.log('MovieVideos ~ data', data)
  if (!data) return null
  const { results } = data
  if (!results || results.length < 0) return null

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-secondary">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="985"
                height="554"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-fill w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

//https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>
function MovieSimilar() {
  const { movieId } = useParams()

  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'similar'),
    fetcher
  )
  // console.log('MovieSimilar ~ data', data)

  if (!data) return null
  const { results } = data
  if (!results || results.length < 0) return null

  return (
    <div className="py-10">
      <h2 className="mb-10 text-2xl font-medium">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MovieDetailsPage
