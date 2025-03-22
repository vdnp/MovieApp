import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_API_KEY;

const getAvarage = (array) =>
  array.reduce((sum, value) => sum + value, array.length, 0);

// const query = "father";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);

  function handleSelectMovie(id) {
    setSelectMovie((selectMovie) => (id === selectMovie ? null : id));
  }

  function handleUnselectMovie() {
    setSelectMovie(null);
  }

  useEffect(
    function () {
      async function getMovies() {
        try {
          setLoading(true);
          setErrors("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
          );

          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu.");
          }

          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Film bulunamadı!");
          }

          setMovies(data.results);
        } catch (e) {
          setErrors(e.message);
        }
        setLoading(false);
        if (query.length < 1) {
          setMovies([]);
          setErrors("");
          return;
        }
      }
      getMovies();
      //First render(mount)
      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => setMovies(data.results));
    },
    [query]
  );
  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchResultNav movies={movies} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            {" "}
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !errors && (
                <MovieList
                  movies={movies}
                  onSelectMovie={handleSelectMovie}
                  selectMovie={selectMovie}
                />
              )}
              {errors && <ErrorMessage eMessage={errors} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                <MyListSummary selectedMovieList={selectedMovies} />
                <MyMovieList selectedMovieList={selectedMovies} />
                {selectMovie && (
                  <MovieDetails
                    selectMovie={selectMovie}
                    onHandleUnselectMovie={handleUnselectMovie}
                  />
                )}
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}

function ErrorMessage({ eMessage }) {
  return <div className="alert alert-danger">{eMessage}</div>;
}

function Loading() {
  return (
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="col-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control"
        placeholder="Film Arayın."
      />
    </div>
  );
}

function SearchResultNav({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> Kayıt bulundu.
    </div>
  );
}

function Main({ children }) {
  return <main className="container">{children}</main>;
}

function ListContainer({ children }) {
  const [isOpenM, setIsOpenM] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpenM((val) => !val)}
      >
        {isOpenM ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpenM && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie, selectMovie }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          onSelectMovie={onSelectMovie}
          selectMovie={selectMovie}
        />
      ))}
    </div>
  );
}

function MovieDetails({ selectMovie, onHandleUnselectMovie }) {
  const [movie, setMovie] = useState({});
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectMovie}?api_key=${api_key}`
        );
        const data = await res.json();
        setMovie(data);
      }

      getMovieDetails();
    },
    [selectMovie]
  );
  return (
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
          <button onClick={onHandleUnselectMovie} className="btn btn-danger">
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, onSelectMovie, selectMovie }) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectMovie === movie.id ? "selectedMovie" : ""
        }`}
        onClick={() => onSelectMovie(movie.id)}
      >
        <img
          src={
            movie.poster_path
              ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                movie.poster_path
              : "/img/no-image.jpg"
          }
          alt={movie.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/*function MyMovieListContainer() {
  const [selectedMovies, setSelectedMovies] = useState(movieList);
  const [isOpenS, setIsOpenS] = useState(true);

  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpenS((val) => !val)}
      >
        {isOpenS ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpenS && (
        <>
          <MyListSummary selectedMovieList={selectedMovieList} />
          <MyMovieList selectedMovieList={selectedMovieList} />
        </>
      )}
    </div>
  );
}
*/
function MyListSummary({ selectedMovieList }) {
  const averageRating = getAvarage(selectedMovieList.map((m) => m.Rating));
  const averageDuration = getAvarage(selectedMovieList.map((m) => m.Duration));
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listem [{selectedMovieList.length}] Film Eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{averageRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass-split text-warning me-1"></i>
            <span>{averageDuration} dk</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovieList }) {
  return selectedMovieList.map((seleceted) => (
    <MyListMovie seleceted={seleceted} key={seleceted.Id} />
  ));
}

function MyListMovie({ seleceted }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={seleceted.Poster}
            alt={seleceted.Title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{seleceted.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{seleceted.Rating}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{seleceted.Duration} dk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
