import { tmdbAPI } from 'apiConfig/config'
import Button from 'components/button/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'
import LoadingSkeleton from 'components/loading/LoadingSkeleton'

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item
  // console.log('MovieCard ~ item', item)

  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        // src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        src={tmdbAPI.imageOriginal(item.poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary"
        >
          Watch now
        </button> */}
      </div>
    </div>
  )
}

// trong item co nhieu props nen la .shape
MovieCard.propsTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    id: PropTypes.number,
  }),
}

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Some thing went wrong with this component
    </p>
  )
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent, //FallbackComponent = FallbackComponent
})

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      {/* <img
        // src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        src={tmdbAPI.imageOriginal(item.poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      /> */}
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>

      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>

        {/* <Button bgColor="primary">Watch now</Button> */}
        <LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
      </div>
    </div>
  )
}
