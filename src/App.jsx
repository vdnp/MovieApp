import { useState } from "react";
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
import Pagination from "../components/Main/Pagination";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";

// const query = "father";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "SelectedMovies"
  );
  const [selectMovie, setSelectMovie] = useState(null);

  const {
    movies,
    loading,
    errors,
    currentPage,
    totalPages,
    totalResults,
    nextPage,
    previousPage,
  } = useMovies(query);

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

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchResultNav totalResults={totalResults} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            {" "}
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !errors && (
                <>
                  {movies.length > 0 && (
                    <>
                      {" "}
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectMovie}
                        selectMovie={selectMovie}
                      />
                      <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </>
                  )}
                </>
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
