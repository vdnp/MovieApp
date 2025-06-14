import { useState, useEffect } from "react";
import StarRating from "../../src/StarRating";
import Loading from "../Main/Loading";
import useMovieDetails from "../../src/hooks/useMovieDetails";

export default function MovieDetails({
  selectMovie,
  onHandleUnselectMovie,
  onAddToList,
  selectedMovies,
}) {
  const [userRating, setUserRating] = useState("");

  const { movie, loading } = useMovieDetails(selectMovie);

  const isAddedToList = selectedMovies.map((m) => m.id).includes(selectMovie);
  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectMovie
  )?.userRating;

  function handleAddToList(movie) {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddToList(newMovie);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border mb-3 p-2">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.poster_path
                    ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                      movie.poster_path
                    : "/img/no-image.jpg"
                }
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-8">
              <h6>{movie.title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1"></i>
                <span>{movie.release_date}</span>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}{" "}
                  </span>
                ))}
              </p>
              {!isAddedToList ? (
                <>
                  <div className="my-4">
                    <StarRating
                      maxRating={10}
                      size={20}
                      onRating={setUserRating}
                    />
                  </div>
                  <button
                    className="btn btn-primary me-1"
                    onClick={() => handleAddToList(movie)}
                  >
                    Listeye Ekle
                  </button>
                </>
              ) : (
                <p>
                  Film listenizde. Değerlendirme:{" "}
                  <i className="bi bi-stars text-warning me-1"></i>
                  {selectedMovieUserRating}
                </p>
              )}

              <button
                onClick={onHandleUnselectMovie}
                className="btn btn-danger"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
