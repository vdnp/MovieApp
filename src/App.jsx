import { useEffect, useState } from "react";
import Nav from "../components/Header/Nav";
import Logo from "../components/Header/Logo";
import Search from "../components/Header/Search";
import SearchResultNav from "../components/Header/SearchResult";
import Main from "../components/Main/Main";
import ListContainer from "../components/MovieList/ListContainer";
import MovieList from "../components/MovieList/MovieList";
import MovieDetails from "../components/MovieList/MovieDetails";
import Loading from "../components/Main/Loading";
import ErrorMessage from "../components/Main/ErrorMessage";
import MyListSummary from "../components/MovieList/MyListSummary";
import MyMovieList from "../components/MovieList/MyMovieList";

const api_key = import.meta.env.VITE_API_KEY;

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

  function handleToAddList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
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
                {selectMovie ? (
                  <MovieDetails
                    selectMovie={selectMovie}
                    onHandleUnselectMovie={handleUnselectMovie}
                    onAddToList={handleToAddList}
                    selectedMovies={selectedMovies}
                  />
                ) : (
                  <>
                    <MyListSummary selectedMovieList={selectedMovies} />
                    <MyMovieList
                      selectedMovieList={selectedMovies}
                      onDeleteFromList={handleDeleteFromList}
                    />
                  </>
                )}
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
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
