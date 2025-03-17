import { useState } from "react";
const movieList = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  },
];

const selectedMovieList = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    Duration: 120,
    Rating: 8.3,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    Duration: 150,
    Rating: 8.6,
  },
];

const getAvarage = (array) =>
  array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
  const [movies, setMovies] = useState(movieList);
  const [selectedMovies, setSelectedMovies] = useState(movieList);

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <SearchResultNav movies={movies} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            {" "}
            <ListContainer>
              <MovieList movies={movies} />
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                <MyListSummary selectedMovieList={selectedMovieList} />
                <MyMovieList selectedMovieList={selectedMovieList} />
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
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
function Search() {
  return (
    <div className="col-4">
      <input type="text" className="form-control" placeholder="Film Arayın." />
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
function MovieList({ movies }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.Id} />
      ))}
    </div>
  );
}
function Movie({ movie }) {
  return (
    <div className="col mb-2">
      <div className="card">
        <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{movie.Title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.Year}</span>
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
