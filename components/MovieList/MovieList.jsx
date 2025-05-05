import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie, selectMovie }) {
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
